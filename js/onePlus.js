//some sweet JS

var height = window.innerHeight,
	element = document.getElementsByClassName('feature')[0];


if (height > 480) {
	element.setAttribute('style', 'height:' + height + 'px');
}