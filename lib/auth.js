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
				<button>나</button>
				<div class="my">
			`;
			if(this.isNickname(request,response)){
				authStatusUI  += `<a href="/nickname/id/${request.session.nickname_id}">내서재</a>`;
			} else {
				authStatusUI  += `<a href="/nickname/create">내서재</a>`;
			}	
			authStatusUI  += `
					<a href="/account/logout">로그아웃</a>
					<h4>다른서재</h4>
					<ul>
						<li></li>
					</ul>
					<a href="#">개인정보변경</a>
				</div>
			`;
		}
		return authStatusUI;
	}
}