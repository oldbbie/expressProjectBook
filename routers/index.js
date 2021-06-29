var express = require('express');
var router = express.Router();

var template = require('../lib/template');

router.get('/',function(request,response,next){
	var head = template.head(`<link rel="stylesheet" href="/css/index.css">`);
	var body = template.body(
		`
		<header>
			<p><a href="/episode/">에피소드별페이지</a></p>
			<p><a href="/book/">책별페이지</a></p>
			<p><a href="/nickname/">작가별페이지</a></p>
		</header>
		`
	);
	var html = template.html(head,body);
	response.send(html);
})

module.exports=router;