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

var formActions = {
	ajaxCall : function(url, params) {
		var request = getHttpObject();
		request.onreadystatechange = function(){
			if (request.readyState === 4 && request.status === 200) {
					el = document.getElementById('mainForm');
					el.innerHTML = "<h4 class='formThanks'>Thanks! We'll be in touch soon.</h4>";
			}
		};
		request.open('POST', url, true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.send(params);
	},
	submitForm : function(evt){
		evt.preventDefault();
		var name = encodeURIComponent(document.getElementById("name").value),
			email = encodeURIComponent(document.getElementById('email').value),
			phone = encodeURIComponent(document.getElementById('phone').value),
			budget = encodeURIComponent(document.getElementById('budget').value),
			desc = encodeURIComponent(document.getElementById('desc').value),
			nameTest = document.getElementById('name').value,
			emailTest = document.getElementById('email').value,
			budgetTest = document.getElementById('budget').value;
		var re = /^\s*$/;
			if ( !re.test(nameTest) && !re.test(emailTest) && !re.test(budgetTest) ) {
				var params = "name=" + name + "&email=" + email + "&phone=" + phone + "&budget=" + budget + "&desc=" + desc;
				this.ajaxCall('contact.php', params);
			}
	},
	activateButton : function(){
			var re = /^\s*$/,
				nameTest = document.getElementById('name').value,
				emailTest = document.getElementById('email').value,
				budgetTest = document.getElementById('budget').value;
			if ( !re.test(nameTest) && !re.test(emailTest) && !re.test(budgetTest) ) {
				var formButton = document.getElementById('formSubmit');
				formButton.removeAttribute('disabled');
				formButton.className = "";
			}
	},
	init : function() {
		var formButton = document.getElementById('formSubmit'),
			formInputs = document.getElementsByTagName('input'), i;
		formButton.setAttribute('disabled', 'disabled');
		formButton.className = "disabled";
		formButton.addEventListener('click', this.submitForm.bind(formActions), false);
		for (var i = 0; i < formInputs.length; i++) {
			formInputs[i].addEventListener('keyup', this.activateButton.bind(formActions), false);
		};
	}
};

var layoutHeight = {
	featureEl : document.querySelector('.feature'),
	getFeatureHeight : function(featEl) {
		el = featEl.offsetHeight;
		return el;
	},
	setFeature : function() {
		var height = window.innerHeight,
			feature = document.querySelector('.feature');
		if ( height > layoutHeight.getFeatureHeight(feature) ) {
			feature.setAttribute('style', 'height:' + height + 'px');
		}
	},
	runScroll : function() {
		var featureHeight = this.getFeatureHeight(this.featureEl);
	  	this.scrollTo(document.body, featureHeight, 300);
	},
	scrollTo : function(element, to, duration) {
		if (duration < 0) return; //this would be stupid and should kill the function
	    var difference = to-element.scrollTop; //what is the scrollTop value of the el? Now make it negative
	    var perTick = difference / duration * 10; //value of increment will generall be small negative value say -.25
		var that = this;
		setTimeout(function() {
	      element.scrollTop = element.scrollTop + perTick;
	      if (element.scrollTop === to) return;
	      that.scrollTo(element, to, duration - 10);
	    }, 10);
	}
}
formActions.init();
layoutHeight.setFeature();
document.querySelector(".downArrow").addEventListener("click",layoutHeight.runScroll.bind(layoutHeight),false);
