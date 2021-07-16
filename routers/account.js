var express = require('express');
var router = express.Router();

var template = require('../lib/template');
var db = require('../lib/db.js');

router.get('/',function(request,response,next){
	var head = template.head('');
	var body = template.body(`
		${template.header()}
		<main>
			<form action="/account/login_process" method="post">
				<div>
					<span>아이디 : </span>
					<input type="text" name="user_id" placehoder="아이디">
				</div>
				<div>
					<span>비밀번호 : </span>
					<input type="password" name="user_pw">
				</div>
				<div>
					<input type="submit" value="로그인">
				</div>
			</form>
		</main>
		<footer>
			<a href="/account/join">회원가입</a>
			<a href="/account/search">아이디/비밀번호찾기</a>
		</footer>
	`);
	var html = template.html(head,body);
	response.send(html);
})

router.get('/join',function(request,response,next){
	var head = template.head('');
	var body = template.body(`
		${template.header()}
		<main>
			<form action="/account/join_process" method="post">
				<div>
					<span>아이디 : </span>
					<input type="text" name="user_id" placehoder="아이디">
					<button type="button">중복확인</button>
				</div>
				<div>
					<span>비밀번호 : </span>
					<input type="password" id="user_pw" name="user_pw">
				</div>
				<div>
					<span>비밀번호확인 : </span>
					<input type="password" id="user_pw_i" name="user_pw_i">
				</div>
				<div>
					<input type="submit" value="회원가입">
				</div>
			</form>
		</main>
		<footer>
			<a href="/account/">취소</a>
		</footer>
	`);
	var html = template.html(head,body);
	response.send(html);
})

router.get('/overlap',function(request,response,next){
	var head = template.head('');
	var body = template.body('<p>준비중</p>');
	var html = template.html(head,body);
	response.send(html);
})

router.get('/join',function(request,response,next){
	var head = template.head('');
	var body = template.body('<p>준비중</p>');
	var html = template.html(head,body);
	response.send(html);
})

router.get('/update/',function(request,response,next){
	var head = template.head('');
	var body = template.body('<p>준비중</p>');
	var html = template.html(head,body);
	response.send(html);
})

router.post('/login_process',function(request,response,next){
	var head = template.head('');
	var body = template.body('<p>준비중</p>');
	var html = template.html(head,body);
	response.send(html);
})

router.post('/join_process',function(request,response,next){
	var post = request.body;
	var title = post.title;
	var user_id = post.user_id;
	var user_pw = post.user_pw;
	db.query(`INSERT INTO account (userId, userPw,created) VALUE (?,?,NOW())`,[user_id,user_pw],function(err,result){
		response.redirect( `/account/`);
	})
})

router.post('/update_process',function(request,response,next){
	var head = template.head('');
	var body = template.body('<p>준비중</p>');
	var html = template.html(head,body);
	response.send(html);
})

router.post('/delete_process',function(request,response,next){
	var head = template.head('');
	var body = template.body('<p>준비중</p>');
	var html = template.html(head,body);
	response.send(html);
})


module.exports=router;