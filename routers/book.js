var express = require('express');
var router = express.Router();

var template = require('../lib/template');
var db = require('../lib/db.js');
var auth = require('../lib/auth.js');

router.get('/',function(request,response,next){
	var pageCounting = 3;
	var showPageRange = 2;
	var nowPage = 1;
	db.query(`SELECT * FROM book ORDER BY id DESC LIMIT ?`, [pageCounting], function (err, books) {
		db.query(`SELECT COUNT(*) as coun FROM book`, function (err, totalCounting) {
		if(err){throw err}
			var list = template.listBook(books);
			var pageNum = Math.ceil(totalCounting[0].coun/pageCounting);
			var indexLink = template.pageLink(pageNum,showPageRange,nowPage,'/book/index');
			var head = template.head(`
				<link rel="stylesheet" href="/css/header.css">
				<link rel="stylesheet" href="/css/indexBook.css">
			`);
			var body = template.body(`
				${template.header(auth.statusUI(request,response),2)}
				<main>
					<nav>
						<div class="list">
							${list}
						</div>
						<div class="page">
							${indexLink}
						</div>
					</nav>
					<div class="create">
						<p><a href="/book/create">책쓰기</a></p>
					</div>
				<main>
			`);
			var html = template.html(head,body);
			response.send(html);
		})
	})
})

router.get('/index/:indexPage',function(request,response,next){
	var pageCounting = 3;
	var showPageRange = 2;
	var nowPage = Number(request.params.indexPage);
	db.query(`SELECT * FROM book ORDER BY id DESC LIMIT ?,? `,[(nowPage-1)*pageCounting,pageCounting], function (err, books) {
		db.query(`SELECT COUNT(*) as coun FROM book`, function (err, totalCounting) {
		if(err){throw err}
			var list = template.listBook(books);
			var pageNum = Math.ceil(totalCounting[0].coun/pageCounting);
			var indexLink = template.pageLink(pageNum,showPageRange,nowPage,'/book/index');
			var head = template.head(`
				<link rel="stylesheet" href="/css/header.css">
				<link rel="stylesheet" href="/css/indexBook.css">
			`);
			var body = template.body(`
				${template.header(auth.statusUI(request,response),2)}
				<main>
					<nav>
						<div class="list">
							${list}
						</div>
						<div class="page">
							${indexLink}
						</div>
					</nav>
					<div class="create">
						<p><a href="/book/create">책쓰기</a></p>
					</div>
				<main>
			`);
			var html = template.html(head,body);
			var html = template.html(head,body);
			response.send(html);
		})
	})
})

router.get('/id/:bookId',function(request,response,next){
	db.query(`SELECT * FROM book WHERE id=?`, [request.params.bookId], function (err, book) {
		db.query(`SELECT * FROM episode WHERE book_id=?`,[request.params.bookId], function (err2, episodes) {
		if(err){throw err}
			var list = template.listEpisode(episodes);
			var head = template.head(`
				<link rel="stylesheet" href="/css/header.css">
				<link rel="stylesheet" href="/css/pageBook.css">
			`);
			var body = template.body(`
				${template.header(auth.statusUI(request,response),2)}
				<main>
					<div class="content">
						<h2>${book[0].title}</h2>
						<p>${book[0].description}</p>
					</div>
					<div class="ect">
						<div class="update">
							<p><a href="/book/update/${request.params.bookId}">책 수정하기</a></p>
							<form action="/book/delete_process" method="post">
								<input type="hidden" name="id" value="${request.params.bookId}">
								<input type="submit" value="책 삭제하기">
							</form>
							<p><a href="/episode/create/${request.params.bookId}">글쓰기</a></p>
						</div>
						<div class="indexLink">
							<p><a href="/book">다른 책 보기</a></p>
							<p><a href="/nickname/id/${book[0].nickname_id}">이 작가가 쓴 책보기</a></p>
						</div>
						<div class="episodeList">
							<h3>에피소드 리스트</h3>
							${list}
						</div>
					</div>
				</main>
			`);
			var html = template.html(head,body);
			response.send(html);
		})
	})
})

router.get('/create',function(request,response,next){
	if(!auth.isOwner(request,response)){
		response.redirect(`/`);
		return false;
	}
	if(!auth.isNickname(request,response)){
		response.redirect(`/`);
		return false;
	}
	var head = template.head(`
		<link rel="stylesheet" href="/css/header.css">
		<link rel="stylesheet" href="/css/formBook.css">
	`);
	var body = template.body(`
		${template.header(auth.statusUI(request,response),2)}
		<main>
			<form action = "/book/create_process" method="post">
				<p><input type = "hidden" id="nickname" name="nickname" value="${request.session.nickname_id}"></p>
				<p><input type = "text" id="title" name="title" placeholder="제목"></p>
				<p><textarea id="description" name="description" placeholder="내용"></textarea></p>
				<p>
					<input type = "submit" value = "작성완료">
					<a href="/book/">작성취소</a>
				</p>
			</from>
		</main>
		`);
	var html = template.html(head,body);
	response.send(html);
})

router.get('/create/:nicknameId',function(request,response,next){
	if(!auth.isOwner(request,response)){
		response.redirect(`/`);
		return false;
	}
	if(!auth.isNickname(request,response)){
		response.redirect(`/`);
		return false;
	}
	var head = template.head(`
		<link rel="stylesheet" href="/css/header.css">
		<link rel="stylesheet" href="/css/formBook.css">
	`);
	var body = template.body(`
		${template.header(auth.statusUI(request,response),2)}
		<main>
			<form action = "/book/create_process" method="post">
				<p><input type = "hidden" id="nickname" name="nickname" value="${request.params.nicknameId}"></p>
				<p><input type = "text" id="title" name="title" placeholder="제목"></p>
				<p><textarea id="description" name="description" placeholder="내용"></textarea></p>
				<p>
					<input type = "submit" value = "작성완료">
					<a href="/episode/">작성취소</a>
				</p>
			</from>
		</main>
		`);
	var html = template.html(head,body);
	response.send(html);
})

router.get('/update/:bookId',function(request,response,next){
	if(!auth.isOwner(request,response)){
		response.redirect(`/`);
		return false;
	}
	if(!auth.isNickname(request,response)){
		response.redirect(`/`);
		return false;
	}
	db.query(`SELECT * FROM book WHERE id=?`,[request.params.bookId], function (err, book) {
		var head = template.head(`
			<link rel="stylesheet" href="/css/header.css">
			<link rel="stylesheet" href="/css/formBook.css">
		`);
		var body = template.body(`
			${template.header(auth.statusUI(request,response),2)}
			<main>
				<form action = "/book/update_process" method="post">
					<p><input type = "hidden" id="id" name="id" value="${book[0].id}"></p>
					<p><input type = "text" id="title" name="title" value="${book[0].title}" placeholder="제목"></p>
					<p><textarea id="description" name="description" placeholder="내용">${book[0].description}</textarea></p>
					<p>
						<input type = "submit" value = "작성완료">
						<a href="/book/id/${request.params.bookId}">작성취소</a>
					</p>
				</from>
			</main>
			`);
		var html = template.html(head,body);
		response.send(html);
	})
})

router.post('/create_process',function(request,response,next){
	if(!auth.isOwner(request,response)){
		response.redirect(`/`);
		return false;
	}
	if(!auth.isNickname(request,response)){
		response.redirect(`/`);
		return false;
	}
	var post = request.body;
	var title = post.title;
	var description = post.description;
	var nickname = post.nickname;
	db.query(`INSERT INTO book (title, description, img,created,nickname_id) VALUE (?,?,'nosign.jpg',NOW(),?)`,[title,description,nickname],function(err,result){
		response.redirect( `/book/id/${result.insertId}`);
	})
})

router.post('/update_process',function(request,response,next){
	if(!auth.isOwner(request,response)){
		response.redirect(`/`);
		return false;
	}
	if(!auth.isNickname(request,response)){
		response.redirect(`/`);
		return false;
	}
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
	if(!auth.isOwner(request,response)){
		response.redirect(`/`);
		return false;
	}
	if(!auth.isNickname(request,response)){
		response.redirect(`/`);
		return false;
	}
	var post = request.body;
	var id = post.id;
	db.query(`DELETE  FROM episode WHERE book_id = ?`,[id],function(err,result){
		db.query(`DELETE  FROM book WHERE id = ?`,[id],function(err,result){
			response.redirect( `/book/`);
		})
	})
})


module.exports=router;