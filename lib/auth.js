module.exports = {
	isOwner : function(request,response) {
		if(request.session.is_logined){
			return true;
		} else {
			return false;
		}
	}, statusUI : function(request,response) {
		var authStatusUI = '<a href="/account/">로그인</a>';
		if(this.isOwner(request,response)){
			authStatusUI  = `
				<a href="/account/logout">로그아웃</a>
				<a href="/nickname/id/${request.session.nickname_id}">내서재</a>`;
		}
		return authStatusUI;
	}
}