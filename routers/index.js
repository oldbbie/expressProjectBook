var express = require('express');
var router = express.Router();

var template = require('../lib/template');
var db = require('../lib/db.js');
var auth = require('../lib/auth.js');

router.get('/',function(request,response,next){
	db.query(`SELECT * FROM book ORDER BY id DESC LIMIT 3`, function (err, books) {
		var hotBooks = template.hotBooks('인기소설',books);
		var tasteBooks = template.hotBooks('취향저격 소설',books);
		var increaseBooks = template.hotBooks('인기 상승중인 소설',books);
		var head = template.head(`
			<link rel="stylesheet" href="/css/header.css">
			<link rel="stylesheet" href="/css/index.css">
		`);
		var body = template.body(`
			${template.header(auth.statusUI(request,response))}
			<main>
				<nav class="category">
					<dl id="story_mark_frame">
						<dt><a>즐겨보는 책</a></dt>
					</dl>
					<dl id="genre_mark_frame">
						<dt><a>즐겨보는 장르</a></dt>
					</dl>
					<dl id="author_mark_frame">
						<dt><a>즐겨보는 작가</a></dt>
					</dl>
					<dl id="world_mark_frame">
						<dt><a>즐겨보는 세계관</a></dt>
					</dl>
				</nav>
				<div class="book">
					${hotBooks}
					${tasteBooks}
					${increaseBooks}
				</div>
			</main>
			<footer>
			</footer>  
			`
		);
		var html = template.html(head,body);
		response.send(html);
	})
})

module.exports=router;