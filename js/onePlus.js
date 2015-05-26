//some sweet JS

function getHttpObject() {
	var xhr;

	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		xhr = new ActiveXObject('Mxslm12.XMLHTTP');
	}

	return xhr;

}


function ajaxCall(url, params) {
	var request = getHttpObject();


	request.onreadystatechange = function(){

		if (request.readyState === 4 && request.status === 200) {
				el = document.getElementById('mainForm');
				el.innerHTML = "<h4 class='formThanks'>Thanks! We'll be in touch soon.</h4>";	
		}
	}


	request.open('POST', url, true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(params);

}


function submitForm(evt){
	evt.preventDefault();
	var name = encodeURIComponent(document.getElementById("name").value),
		email = encodeURIComponent(document.getElementById('email').value),
		phone = encodeURIComponent(document.getElementById('phone').value),
		budget = encodeURIComponent(document.getElementById('budget').value),
		desc = encodeURIComponent(document.getElementById('desc').value),
		params = "name=" + name + "&email=" + email + "&phone=" + phone + "&budget=" + budget + "&desc=" + desc;


		if ( name !== "" && budget !== "" && desc !== "") {
			ajaxCall('contact.php', params);
		}
}


document.getElementById('formSubmit').addEventListener('click', submitForm, false);


function setFeatureHeight () {

	var height = window.innerHeight,
		element = document.getElementsByClassName('feature')[0];


	if ( height > element.offsetHeight ) {
		element.setAttribute('style', 'height:' + height + 'px');
	}
}


setFeatureHeight();