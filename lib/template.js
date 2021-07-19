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
		  list = list + `<li><a href="/episode/id/${episodes[i].id}">${i+1}.${episodes[i].title}</a></li>`;
		  i = i + 1;
		}
		list = list+'</ul>';
		return list;
   }, listBook:function(books){
		var list = '<ul>';
		var i = 0;
		while(i < books.length){
		  list = list + `<li><a href="/book/id/${books[i].id}">${i+1}.${books[i].title}</a></li>`;
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
	}, titleEpisode:function(episode){
		var title = `<h2><a href="/episode/id/${episode[0].id}">${episode[0].title}</a></h2>`;
		return title;
	}, header:function(authStatusUI = '<a href="/account/">로그인</a>'){
		var header = `
			<header>
				<div class="left">
					<button class="hamenu" onclick="alert('기능 준비중입니다.');">메뉴</button>
					<h1><a href="/">소설이트</a></h1>
					<nav>
						<p><a href="/episode/">에피소드</a></p>
						<p><a href="/book/">책</a></p>
						<p><a href="/nickname/">작가</a></p>
					</nav>
				</div>
				<div class="middle">
						<input type="text" placeholder="책제목 or 작가명 or 장르를 검색해주세요.">
						<button  onclick="alert('기능 준비중입니다.');">검색</button>
					</div>
				<div class="right">
					${authStatusUI}
				</div>
			</header>
		`;
		return header;
	}, pageLink:function(countPage,showPageRange,nowPage,link){
		var i;
		var provPage = nowPage-showPageRange;
		var nextPage = nowPage+showPageRange;
		var nextLink = '';
		if(countPage > nextPage) {
			countPage = nextPage;
			var nextLink = `<li><a href="${link}/${nextPage+1}">다음</a></li>` ;
		}
		var listPage = '<ol>';
		if(nowPage>showPageRange){
			listPage += `<li><a class="checked" href="${link}/${provPage-1}">이전</a></li>` ;
			for(i = provPage; i <= countPage; i++) {
				if(i===nowPage) {
					listPage += `<li><a class="checked" href="${link}/${i}">${i}</a></li>` ;
				} else {
					listPage += `<li><a href="${link}/${i}">${i}</a></li>` ;
				}
			}
		} else {
			for(i = 1; i <= countPage; i++) {
				if(i===nowPage) {
					listPage += `<li><a class="checked" href="${link}/${i}">${i}</a></li>` ;
				} else {
					listPage += `<li><a href="${link}/${i}">${i}</a></li>` ;
				}
			}
		}
		listPage += nextLink;
		listPage += '</ol>';
		return listPage;
	}, hotBooks:function(title,books){
		var listHotBook = `
			<section>
				<div class="title">
					<h2>${title}</h2>
				</div>
				<ol class="contents">
		`;
		for(var i=0; i < books.length; i++){
			listHotBook += `
		  		<li>
					<a href="/book/id/${books[i].id}">
						<div class="sumbnail">
							<img src="/img/${books[i].img}">
						</div>
						<div class="description">
							<h3>${books[i].title}</h3>
							<p>${books[i].description}</p>
						</div>
					</a>
				</li>
			`;
		}
		 listHotBook += `
		 		</ol>
			</section>
		 `;
		
		return listHotBook;
	}
}