var express = require('express');
var router = express.Router();

var template = require('../lib/template');
var db = require('../lib/db.js');
var auth = require('../lib/auth.js');

router.get('/',function(request,response,next){
	var head = template.head(`<link rel="stylesheet" href="/css/login.css">`);
	var body = template.body(`
		<main>
			<form action="/account/login_process" method="post">
				<h2><a href="/"> 소설이트 로그인</a></h2>
				<div class="input">
					<p><input type="text" name="user_id" placehoder="아이디" placeholder="아이디" required></p>
					<p><input type="password" name="user_pw" placeholder="비밀번호" required></p>
				</div>
				<div class="button">
					<a href="/account/join">회원가입</a>
					<a href="/account/search">아이디/비밀번호찾기</a>
                    <button type="submit">로그인</button>
				</div>
			</form>
		</main>
		<footer>
		</footer>
	`);
	var html = template.html(head,body);
	response.send(html);
})

router.get('/login',function(request,response,next){
	var head = template.head(`<link rel="stylesheet" href="/css/login.css">`);
	var body = template.body(`
		<main>
			<form action="/account/login_process" method="post">
				<h2><a href="/"> 소설이트 로그인</a></h2>
				<div class="input">
					<p><input type="text" name="user_id" placehoder="아이디" placeholder="아이디" required></p>
					<p><input type="password" name="user_pw" placeholder="비밀번호" required></p>
					<p class="notLogin">비밀번호가 틀렸습니다.</p>
				</div>
				<div class="button">
					<a href="/account/join">회원가입</a>
					<a href="/account/search">아이디/비밀번호찾기</a>
                    <button type="submit">로그인</button>
				</div>
			</form>
		</main>
		<footer>
		</footer>
	`);
	var html = template.html(head,body);
	response.send(html);
})

router.get('/join',function(request,response,next){
	// 1. 띄어쓰기 금지 2. 중복확인기능
	var head = template.head(`<link rel="stylesheet" href="/css/join.css">`);
	var body = template.body(`
		<main>
			<form action="/account/join_process" method="post">
			<h2><a href="/">테스트 사이트 : 임시 회원가입 페이지</a></h2>
				<div class="id">
					<input type="text" name="user_id" placehoder="아이디" placeholder="아이디">
					<button type="button">중복확인</button>
				</div>
				<div class="pw">
					<input type="password" id="user_pw" name="user_pw" placeholder="비밀번호">
					<input type="password" id="user_pw_i" name="user_pw_i" placeholder="확인">
				</div>
				<div class="button">
					<a href="/account/">취소</a>
					<input type="submit" value="회원가입">
				</div>
			</form>
		</main>
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

router.get('/update/',function(request,response,next){
	var head = template.head('');
	var body = template.body('<p>준비중</p>');
	var html = template.html(head,body);
	response.send(html);
})

router.get('/logout',function(request,response){
	request.session.destroy(function(err){
		response.redirect(`/`);
	});
});

router.post('/login_process',function(request,response){
	var post = request.body;
	var user_id = post.user_id;
	var user_pw = post.user_pw;
		db.query(`SELECT * FROM account WHERE userId=? AND userPw=?`,[user_id,user_pw], function (err, user) {
		if(user.length != 0){
			db.query(`SELECT * FROM nickname WHERE account_id=? `,[user[0].id], function (err, nickname) {
				request.session.is_logined = true;
				request.session.acccount_id = user[0].id;
				if(nickname.length != 0){
					request.session.nickname_id = nickname[0].id;
				}
				request.session.save(function(){response.redirect(`/`);})
			})
		} else {
			response.redirect(`/account/login`);
		};
	})
})

router.post('/join_process',function(request,response,next){
	var post = request.body;
	var title = post.title;
	var user_id = post.user_id;
	var user_pw = post.user_pw;
	db.query(`INSERT INTO account (userId, userPw,created) VALUE (?,?,NOW())`,[user_id,user_pw],function(err,result){
		request.session.is_logined = true;
		request.session.acccount_id = result.insertId;
		request.session.save(function(){response.redirect(`/`);})
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