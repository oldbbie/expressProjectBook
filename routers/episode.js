var express = require('express');
var router = express.Router();

var template = require('../lib/template');
var db = require('../lib/db.js');

router.get('/',function(request,response,next){
	var pageCounting = 3;
	var showPageRange = 2;
	var nowPage = 1;
	db.query(`SELECT * FROM episode ORDER BY id DESC LIMIT ?`, [pageCounting] ,function (err, episodes) {
		db.query(`SELECT COUNT(*) as coun FROM episode`, function (err, totalCounting) {
		if(err){throw err}
			var list = template.listEpisode(episodes);
			var pageNum = Math.ceil(totalCounting[0].coun/pageCounting);
			var indexLink = template.pageLink(pageNum,showPageRange,nowPage,'/episode/index');
			var head = template.head(`
				<link rel="stylesheet" href="/css/header.css">
				<link rel="stylesheet" href="/css/indexEpisode.css">
			`);
			var body = template.body(`
				${template.header()}
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
						<p><a href="/episode/create">글쓰기</a></p>
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
	db.query(`SELECT * FROM episode ORDER BY id DESC LIMIT ?,? `,[(nowPage-1)*pageCounting,pageCounting], function (err, episodes) {
		db.query(`SELECT COUNT(*) as coun FROM episode`, function (err, totalCounting) {
		if(err){throw err}
			var list = template.listEpisode(episodes);
			var pageNum = Math.ceil(totalCounting[0].coun/pageCounting);
			var indexLink = template.pageLink(pageNum,showPageRange,nowPage,'/episode/index');
			var head = template.head(`
				<link rel="stylesheet" href="/css/header.css">
				<link rel="stylesheet" href="/css/indexEpisode.css">
			`);
			var body = template.body(`
				${template.header()}
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
						<p><a href="/episode/create">글쓰기</a></p>
					</div>
				<main>
			`);
			var html = template.html(head,body);
			response.send(html);
		})
	})
})

router.get('/id/:episodeId',function(request,response,next){
	db.query(`SELECT * FROM episode`, function (err, episodes) {
		db.query(`SELECT * FROM episode WHERE id=?`,[request.params.episodeId], function (err2, episode) {
		if(err){throw err}
			var list = template.listEpisode(episodes);
			var titleEpisode = template.titleEpisode(episode);
			var head = template.head(`
				<link rel="stylesheet" href="/css/header.css">
				<link rel="stylesheet" href="/css/pageEpisode.css">
			`);
			var body = template.body(`
				${template.header()}
				<main>
					<div class="content">
						${titleEpisode}
						<p>${episode[0].description}</p>
					</div>
					<div class="ect">
						<div class="update">
							<p><a href="/episode/update/${request.params.episodeId}">수정하기</a></p>
							<form action="/episode/delete_process" method="post">
								<input type="hidden" name="id" value="${request.params.episodeId}">
								<input type="submit" value="삭제하기">
							</form>
							<p><a href="/episode/create/${episode[0].book_id}">글쓰기</a></p>
						</div>
						<div class="indexLink">
							<p><a href="/episode">목록보기</a></p>
							<p><a href="/book/id/${episode[0].book_id}">책목차보기</a></p>
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
	var head = template.head(`
		<link rel="stylesheet" href="/css/header.css">
		<link rel="stylesheet" href="/css/formEpisode.css">
	`);
	var body = template.body(`
		${template.header()}
		<main>
			<form action = "/episode/create_process" method="post">
				<p><input type = "hidden" id="book" name="book" value="5"></p>
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

router.get('/create/:bookId',function(request,response,next){
	var head = template.head(`
		<link rel="stylesheet" href="/css/header.css">
		<link rel="stylesheet" href="/css/formEpisode.css">
	`);
	var body = template.body(`
		${template.header()}
		<main>
			<form action = "/episode/create_process" method="post">
				<p><input type = "hidden" id="book" name="book" value="${request.params.bookId}"></p>
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

router.get('/update/:episodeId',function(request,response,next){
	db.query(`SELECT * FROM episode WHERE id=?`,[request.params.episodeId], function (err, episode) {
		var head = template.head(`
		<link rel="stylesheet" href="/css/header.css">
		<link rel="stylesheet" href="/css/formEpisode.css">
		`);
		var body = template.body(`
			${template.header()}
			<main>
				<form action = "/episode/update_process" method="post">
					<p><input type = "hidden" id="id" name="id" value="${episode[0].id}"></p>
					<p><input type = "text" id="title" name="title" value="${episode[0].title}" placeholder="제목"></p>
					<p><textarea id="description" name="description" placeholder="내용">${episode[0].description}</textarea></p>
					<p>
						<input type = "submit" value = "작성완료">
						<a href="/episode/id/${request.params.episodeId}">작성취소</a>
					</p>
				</from>
			</main>
			`);
		var html = template.html(head,body);
		response.send(html);
	})
})

router.post('/create_process',function(request,response,next){
	var post = request.body;
	var title = post.title;
	var description = post.description;
	var book = post.book;
	db.query(`INSERT INTO episode (title, description,created,book_id) VALUE (?,?,NOW(),?)`,[title,description,book],function(err,result){
		response.redirect( `/episode/id/${result.insertId}`);
	})
})

router.post('/update_process',function(request,response,next){
	var post = request.body;
	var title = post.title;
	var description = post.description;
	var id = post.id;
	db.query(`
		UPDATE  episode
			SET
				title = ?, 
				description = ?
			WHERE
				id = ?
		`,[title,description,id],function(err,result){
		response.redirect( `/episode/id/${id}`);
	})
})


router.post('/delete_process',function(request,response,next){
	var post = request.body;
	var id = post.id;
	db.query(`
		DELETE  
			FROM episode
			WHERE id = ?
		`,[id],function(err,result){
		response.redirect( `/episode/`);
	})
})


module.exports=router;