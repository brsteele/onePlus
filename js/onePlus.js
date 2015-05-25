//some sweet JS

function setFeatureHeight () {

	var height = window.innerHeight,
		element = document.getElementsByClassName('feature')[0];


	if (height > 400) {
		element.setAttribute('style', 'height:' + height + 'px');
	}
}


	setFeatureHeight();