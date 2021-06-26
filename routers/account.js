var express = require('express');
var router = express.Router();

var template = require('../lib/template');

router.get('/',function(request,response,next){
	var head = template.head('');
	var body = template.body('<p>준비중</p>');
	var html = template.html(head,body);
	response.send(html);
})

router.get('/index/:indexPage',function(request,response,next){
	var head = template.head('');
	var body = template.body('<p>준비중</p>');
	var html = template.html(head,body);
	response.send(html);
})

router.get('/id/:authorId',function(request,response,next){
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

router.get('/update/:pageId',function(request,response,next){
	var head = template.head('');
	var body = template.body('<p>준비중</p>');
	var html = template.html(head,body);
	response.send(html);
})

router.get('/join_process',function(request,response,next){
	var head = template.head('');
	var body = template.body('<p>준비중</p>');
	var html = template.html(head,body);
	response.send(html);
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