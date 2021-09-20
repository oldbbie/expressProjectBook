module.exports = {
	isOwner : function(request,response) {
		if(request.session.is_logined){
			return true;
		} else {
			return false;
		}
	}, isNickname : function(request,response) {
		if(request.session.nickname_id){
			return true;
		} else {
			return false;
		}
	}, statusUI : function(request,response) {
		var authStatusUI = '<a href="/account/">로그인</a>';
		if(this.isOwner(request,response)){
			authStatusUI  = `
				<button class="myBtn" onclick="showMy()">나</button>
				<div class="my">
					<div class="myMenu">
			`;
			if(this.isNickname(request,response)){
				authStatusUI  += `<a href="/nickname/id/${request.session.nickname_id}">내서재</a>`;
			} else {
				authStatusUI  += `<a href="/nickname/create">내서재</a>`;
			}	
			authStatusUI  += `
						<a href="/account/logout">로그아웃</a>
						<button onclick="showOtherNickname()">다른서재</button>
						<a href="#">개인정보변경</a>
					</div>
					<div class="otherNickname">
						<button onclick="hideOtherNickname()">뒤로</button>
						<ul>
							<li><a href="#">임시1</a></li>
							<li><a href="#">임시2</a></li>
							<li><a href="#">임시3</a></li>
							<li><a href="#">임시4</a></li>
						</ul>
					</div>
				</div>
			`;
		}
		return authStatusUI;
	}
}