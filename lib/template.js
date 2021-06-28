module.exports = {
	html:function(head,body){
        return `
            <!doctype html>
            <html lang="ko">
            <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, user-scalable=no">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>expressProjectBook</title>
			<link rel="stylesheet" href="/css/common.css">
			${head}
            </head>
            <body>
                <div class="wrap">
					${body}
                </div>
            </body>
            </html>
        `;
    }, head:function(option){
		 return `${option}`;
	}, body:function(commend){
		return `${commend}`;
   }, listEpisode:function(episodes){
		var list = '<ul>';
		var i = 0;
		while(i < episodes.length){
		  list = list + `<li><a href="/episode/id/${episodes[i].id}">${episodes[i].title}</a></li>`;
		  i = i + 1;
		}
		list = list+'</ul>';
		return list;
   }, listBook:function(books){
		var list = '<ul>';
		var i = 0;
		while(i < books.length){
		  list = list + `<li><a href="/book/id/${books[i].id}">${books[i].title}</a></li>`;
		  i = i + 1;
		}
		list = list+'</ul>';
		return list;
   }, listNickname:function(nicknames){
		var list = '<ul>';
		var i = 0;
		while(i < nicknames.length){
		  list = list + `<li><a href="/nickname/id/${nicknames[i].id}">${nicknames[i].nickname}</a></li>`;
		  i = i + 1;
		}
		list = list+'</ul>';
		return list;
	}
}