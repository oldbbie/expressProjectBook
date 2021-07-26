var express = require('express');
var router = express.Router();

var template = require('../lib/template');
var db = require('../lib/db.js');
var auth = require('../lib/auth.js');

router.get('/',function(request,response,next){
	var pageCounting = 3;
	var showPageRange = 2;
	var nowPage = 1;
	db.query(`SELECT * FROM nickname ORDER BY id DESC LIMIT ?`, [pageCounting], function (err, nicknames) {
		db.query(`SELECT COUNT(*) as coun FROM book`, function (err, totalCounting) {
		if(err){throw err}
			var list = template.listNickname(nicknames);
			var pageNum = Math.ceil(totalCounting[0].coun/pageCounting);
			var indexLink = template.pageLink(pageNum,showPageRange,nowPage,'/nickname/index');
			var head = template.head(`
				<link rel="stylesheet" href="/css/header.css">
				<link rel="stylesheet" href="/css/indexNickname.css">
			`);
			var body = template.body(`
				${template.header(auth.statusUI(request,response),3)}
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
						<p><a href="/nickname/create">새서재만들기</a></p>
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
	db.query(`SELECT * FROM nickname ORDER BY id DESC LIMIT ?,? `,[(nowPage-1)*pageCounting,pageCounting], function (err, nicknames) {
		db.query(`SELECT COUNT(*) as coun FROM book`, function (err, totalCounting) {
		if(err){throw err}
			var list = template.listNickname(nicknames);
			var pageNum = Math.ceil(totalCounting[0].coun/pageCounting);
			var indexLink = template.pageLink(pageNum,showPageRange,nowPage,'/nickname/index');
			var head = template.head(`
				<link rel="stylesheet" href="/css/header.css">
				<link rel="stylesheet" href="/css/indexNickname.css">
			`);
			var body = template.body(`
				${template.header(auth.statusUI(request,response),3)}
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
						<p><a href="/nickname/create">새서재만들기</a></p>
					</div>
				<main>
			`);
			var html = template.html(head,body);
			response.send(html);
		})
	})
})

router.get('/id/:nicknameId',function(request,response,next){
	db.query(`SELECT * FROM nickname WHERE id=?`, [request.params.nicknameId], function (err, nickname) {
		db.query(`SELECT * FROM book WHERE nickname_id=?`,[request.params.nicknameId], function (err2, books) {
		if(err){throw err}
			var list = template.listBook(books);
			var head = template.head(`
				<link rel="stylesheet" href="/css/header.css">
				<link rel="stylesheet" href="/css/pageNickname.css">
			`);
			var body = template.body(`
				${template.header(auth.statusUI(request,response),3)}
				<main>
					<div class="content">
						<h2>${nickname[0].nickname}</h2>
						<p>${nickname[0].pr}</p>
					</div>
					<div class="ect">
						<div class="update">
							<p><a href="/nickname/update/${request.params.nicknameId}">작가 페이지 관리하기</a></p>
							<form action="/nickname/delete_process" method="post">
								<input type="hidden" name="id" value="${request.params.nicknameId}">
								<input type="submit" value="작가 탈퇴하기">
							</form>
							<p><a href="/book/create/${request.params.nicknameId}">책쓰기</a></p>
						</div>
						<div class="indexLink">
						<p><a href="/nickname">다른 작가 보기</a></p>
						</div>
						<div class="bookList">
							<h3>책 리스트</h3>
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
		response.redirect( `/`);
		return false;
	}
	var head = template.head(`
		<link rel="stylesheet" href="/css/header.css">
		<link rel="stylesheet" href="/css/formNickname.css">
	`);
	var body = template.body(`
		${template.header(auth.statusUI(request,response),3)}
		<main>
			<form action = "/nickname/create_process" method="post">
				<p><input type = "hidden" id="account" name="account" value="1"></p>
				<p><input type = "text" id="nickname" name="nickname" placeholder="닉네임"></p>
				<p><textarea id="description" name="pr" placeholder="pr"></textarea></p>
				<p>
					<input type = "submit" value = "작성완료">
					<a href="/nickname/">작성취소</a>
				</p>
			</from>
		</main>
		`);
	var html = template.html(head,body);
	response.send(html);
})

router.get('/update/:nicknameId',function(request,response,next){
	if(!auth.isOwner(request,response)){
		response.redirect( `/`);
		return false;
	}
	db.query(`SELECT * FROM nickname WHERE id=?`,[request.params.nicknameId], function (err, nickname) {
		var head = template.head(`
			<link rel="stylesheet" href="/css/header.css">
			<link rel="stylesheet" href="/css/formNickname.css">
		`);
		var body = template.body(`
			${template.header(auth.statusUI(request,response),3)}
			<main>
				<form action = "/nickname/update_process" method="post">
					<p><input type = "hidden" id="id" name="id" value="${nickname[0].id}"></p>
					<p><input type = "text" id="nickname" name="nickname" value="${nickname[0].nickname}" placeholder="제목"></p>
					<p><textarea id="pr" name="pr" placeholder="내용">${nickname[0].pr}</textarea></p>
					<p>
						<input type = "submit" value = "작성완료">
						<a href="/nickname/id/${request.params.nicknameId}">작성취소</a>
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
		response.redirect( `/`);
		return false;
	}
	var post = request.body;
	var nickname = post.nickname;
	var pr = post.pr;
	var account = post.account;
	db.query(`INSERT INTO nickname	(nickname,pr,created,account_id) VALUE (?,?,NOW(),?)`,[nickname,pr,account],function(err,result){
		response.redirect( `/nickname/id/${result.insertId}`);
	})
})

router.post('/update_process',function(request,response,next){
	if(!auth.isOwner(request,response)){
		response.redirect( `/`);
		return false;
	}
	var post = request.body;
	var nickname = post.nickname;
	var pr = post.pr;
	var id = post.id;
	db.query(`
		UPDATE nickname
			SET
				nickname = ?, 
				pr = ?
			WHERE
				id = ?
		`,[nickname,pr,id],function(err,result){
		response.redirect( `/nickname/id/${id}`);
	})
})


router.post('/delete_process',function(request,response,next){
	if(!auth.isOwner(request,response)){
		response.redirect( `/`);
		return false;
	}
	var post = request.body;
	var id = post.id;
	db.query(`DELETE e  FROM episode as e JOIN book as b ON e.book_id = b.id WHERE b.nickname_id = ?`,[id],function(err,result){
		db.query(`DELETE  FROM book WHERE nickname_id = ?`,[id],function(err,result){
			db.query(`DELETE  FROM nickname WHERE id = ?`,[id],function(err,result){
				response.redirect( `/nickname/`);
			})
		})
	})
})


module.exports=router;