var express = require('express');
var router = express.Router();

var template = require('../lib/template');
var db = require('../lib/db.js');

router.get('/',function(request,response,next){
	db.query(`SELECT * FROM nickname`, function (err, nicknames) {
	if(err){throw err}
		var list = template.listNickname(nicknames);
		var head = template.head(`<link rel="stylesheet" href="/css/indexNickname.css">`);
		var body = template.body(
			list + 
			`<footer>
				<p><a href="/nickname/create">작가페이지만들기</a></p>
				<p><a href="/">홈가기</a></p>
			</footer>
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

router.get('/id/:nicknameId',function(request,response,next){
	db.query(`SELECT * FROM nickname WHERE id=?`, [request.params.nicknameId], function (err, nickname) {
		db.query(`SELECT * FROM book WHERE nickname_id=?`,[request.params.nicknameId], function (err2, books) {
		if(err){throw err}
			var list = template.listBook(books);
			var head = template.head('');
			var body = template.body(
				`<p>${nickname[0].nickname}</p>
				<p>${nickname[0].pr}</p>
				<p><a href="/book/update/${request.params.nicknameId}">작가 페이지 관리하기</a></p>
				<form action="/book/delete_process" method="post">
					<input type="hidden" name="id" value="${request.params.nicknameId}">
					<input type="submit" value="작가 탈퇴하기">
				</form>
				<p><a href="/nickname">다른 작가 보기</a></p>`
				+ list
				+ `<p><a href="/book/create/${request.params.nicknameId}">책쓰기</a></p>`
			);
			var html = template.html(head,body);
			response.send(html);
		})
	})
})

router.get('/create',function(request,response,next){
	var head = template.head('');
	var body = template.body(`
		<form action = "/nickname/create_process" method="post">
			<p><input type = "hidden" id="account" name="account" value="1"></p>
			<p><input type = "text" id="nickname" name="nickname" placeholder="닉네임"></p>
			<p><textarea id="description" name="pr" placeholder="pr"></textarea></p>
			<p><input type = "submit" value = "작성완료"></p>
		</from>
		<p><a href="/nickname/">작성취소</a></p>
		`);
	var html = template.html(head,body);
	response.send(html);
})

router.get('/update/:pageId',function(request,response,next){
	var head = template.head('');
	var body = template.body('<p>준비중</p>');
	var html = template.html(head,body);
	response.send(html);
})

router.post('/create_process',function(request,response,next){
	var post = request.body;
	var nickname = post.nickname;
	var pr = post.pr;
	var account = post.account;
	db.query(`INSERT INTO nickname	(nickname,pr,created,account_id) VALUE (?,?,NOW(),?)`,[nickname,pr,account],function(err,result){
		response.redirect( `/nickname/id/${result.insertId}`);
	})
})

router.get('/update_process',function(request,response,next){
	var head = template.head('');
	var body = template.body('<p>준비중</p>');
	var html = template.html(head,body);
	response.send(html);
})


router.get('/delete_process',function(request,response,next){
	var head = template.head('');
	var body = template.body('<p>준비중</p>');
	var html = template.html(head,body);
	response.send(html);
})


module.exports=router;