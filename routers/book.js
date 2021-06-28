var express = require('express');
var router = express.Router();

var template = require('../lib/template');
var db = require('../lib/db.js');

router.get('/',function(request,response,next){
	db.query(`SELECT * FROM book`, function (err, books) {
	if(err){throw err}
		var list = template.listBook(books);
		var head = template.head('');
		var body = template.body(
			list + 
			`<p><a href="/book/create">책쓰기</a></p>
			<p><a href="/">홈가기</a></p>
		`);
		var html = template.html(head,body);
		response.send(html);
	})
})

router.get('/index/:indexPage',function(request,response,next){
	var head = template.head('');
	var body = template.body('<p>나중에</p>');
	var html = template.html(head,body);
	response.send(html);
})

router.get('/id/:bookId',function(request,response,next){
	db.query(`SELECT * FROM book WHERE id=?`, [request.params.bookId], function (err, book) {
		db.query(`SELECT * FROM episode WHERE book_id=?`,[request.params.bookId], function (err2, episodes) {
		if(err){throw err}
			var list = template.listEpisode(episodes);
			var head = template.head('');
			var body = template.body(
				`<p>${book[0].title}</p>
				<p>${book[0].description}</p>
				<p><a href="/book/update/${request.params.bookId}">책 수정하기</a></p>
				<form action="/book/delete_process" method="post">
					<input type="hidden" name="id" value="${request.params.bookId}">
					<input type="submit" value="책 삭제하기">
				</form>
				<p><a href="/book">다른 책 보기</a></p>`
				+ list
				+ `<p><a href="/episode/create/${request.params.bookId}">글쓰기</a></p>`
			);
			var html = template.html(head,body);
			response.send(html);
		})
	})
})

router.get('/create',function(request,response,next){
	var head = template.head('');
	var body = template.body(`
		<form action = "/book/create_process" method="post">
			<p><input type = "hidden" id="nickname" name="nickname" value="1"></p>
			<p><input type = "text" id="title" name="title" placeholder="제목"></p>
			<p><textarea id="description" name="description" placeholder="내용"></textarea></p>
			<p><input type = "submit" value = "작성완료"></p>
		</from>
		<p><a href="/book/">작성취소</a></p>
		`);
	var html = template.html(head,body);
	response.send(html);
})

router.get('/create/:nicknameId',function(request,response,next){
	var head = template.head('');
	var body = template.body(`
		<form action = "/book/create_process" method="post">
			<p><input type = "hidden" id="nickname" name="nickname" value="${request.params.nicknameId}"></p>
			<p><input type = "text" id="title" name="title" placeholder="제목"></p>
			<p><textarea id="description" name="description" placeholder="내용"></textarea></p>
			<p><input type = "submit" value = "작성완료"></p>
		</from>
		<p><a href="/episode/">작성취소</a></p>
		`);
	var html = template.html(head,body);
	response.send(html);
})

router.get('/update/:bookId',function(request,response,next){
	db.query(`SELECT * FROM book WHERE id=?`,[request.params.bookId], function (err, book) {
		var head = template.head('');
		var body = template.body(`
			<form action = "/book/update_process" method="post">
				<p><input type = "hidden" id="book" name="book" value="1"></p>
				<p><input type = "hidden" id="id" name="id" value="${book[0].id}"></p>
				<p><input type = "text" id="title" name="title" value="${book[0].title}" placeholder="제목"></p>
				<p><textarea id="description" name="description" placeholder="내용">${book[0].description}</textarea></p>
				<p><input type = "submit" value = "작성완료"></p>
			</from>
				<p><a href="/episode/id/${request.params.bookId}">작성취소</a></p>
			`);
		var html = template.html(head,body);
		response.send(html);
	})
})

router.post('/create_process',function(request,response,next){
	var post = request.body;
	var title = post.title;
	var description = post.description;
	var nickname = post.nickname;
	db.query(`INSERT INTO book (title, description,created,nickname_id) VALUE (?,?,NOW(),?)`,[title,description,nickname],function(err,result){
		response.redirect( `/book/id/${result.insertId}`);
	})
})

router.post('/update_process',function(request,response,next){
	var post = request.body;
	var title = post.title;
	var description = post.description;
	var id = post.id;
	db.query(`
		UPDATE  book
			SET
				title = ?, 
				description = ?
			WHERE
				id = ?
		`,[title,description,id],function(err,result){
		response.redirect( `/book/id/${id}`);
	})
})


router.post('/delete_process',function(request,response,next){
	var post = request.body;
	var id = post.id;
	db.query(`DELETE  FROM episode WHERE book_id = ?`,[id],function(err,result){
		db.query(`DELETE  FROM book WHERE id = ?`,[id],function(err,result){
			response.redirect( `/book/`);
		})
	})
})


module.exports=router;