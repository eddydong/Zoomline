var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d', { willReadFrequently: true });
control.init();
timeline.init();
view.animate();  