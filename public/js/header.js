function showMy() {
	document.querySelector('.wrap header>.right .my .otherNickname').style.display = 'none';
	document.querySelector('.wrap header>.right .my .myMenu').style.display = 'block';
	document.querySelector('.wrap header>.right .my').style.display = 'block';
}

function showOtherNickname() {
	document.querySelector('.wrap header>.right .my .myMenu').style.display = 'none';
	document.querySelector('.wrap header>.right .my .otherNickname').style.display = 'block';
}

function hideOtherNickname() {
	document.querySelector('.wrap header>.right .my .otherNickname').style.display = 'none'
	document.querySelector('.wrap header>.right .my .myMenu').style.display = 'block';
}