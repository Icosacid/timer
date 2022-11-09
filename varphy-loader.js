let Varphyloader = {}

Varphyloader.boot = function() {
	this.setup();
	
	// Animate
	Varphyloader.anim = null;
	Varphyloader.frame = function() {
		Varphyloader.update();
		Varphyloader.anim = window.requestAnimationFrame(Varphyloader.frame);
		if (Varphyloader.killGame) {
			window.cancelAnimationFrame(Varphyloader.anim);
			return false;
		}
	};
	
	document.addEventListener('keydown', function(event) {
		if (event.key == ' ') {
			Varphyloader.nextTime += 1000 * 60;
		} else if (event.key == 'b') {
			Varphyloader.nextTime -= 1000 * 60;
			if (Varphyloader.diff < 0) Varphyloader.nextTime = new Date().getTime();
		}
	});
	
	this.frame();
};
Varphyloader.setup = function() {
	this.nextTime = new Date().getTime();
	this.diff = 0;
};
Varphyloader.update = function() {
	var now = new Date().getTime();
	var diff = this.nextTime - now;
	this.diff = diff;
	if (this.diff < 0) {
		$('p.timer').html('00:00:00');
		return false;
	}
	var seconds = Math.floor(diff / 1000) % 60;
	diff -= seconds;
	diff /= 1000;
	var mins = Math.floor(diff / 60) % 60;
	diff -= mins;
	diff /= 60;
	var hours = Math.floor(diff / 60);
	
	if (seconds < 10) seconds = '0' + seconds;
	if (mins < 10) mins = '0' + mins;
	if (hours < 10) hours = '0' + hours;
	
	$('.timer').html(hours + ':' + mins + ':' + seconds);
};

jQuery(document).ready(function() {
	Varphyloader.boot();
});
