let Timer = {
	anim: undefined,
	stoooop: false,
	nextTime: 0
}
let timerNode = undefined

Timer.boot = function() {
	this.setup()
	
	// Animate
	Timer.frame = function() {
		Timer.update()
		Timer.anim = window.requestAnimationFrame(Timer.frame)
		if (Timer.stoooop) {
			window.cancelAnimationFrame(Timer.anim)
			return false
		}
	}
	
	document.addEventListener('keydown', (event) => {
		if (event.key == ' ') {
			Timer.nextTime += 1000 * 60
		} else if (event.key == 'b') {
			Timer.nextTime -= 1000 * 60
			if (Timer.diff < 0) Timer.nextTime = new Date().getTime()
		}
	})
	
	this.frame()
}
Timer.setup = function() {
	this.nextTime = new Date().getTime()
	this.diff = 0
}
Timer.update = function() {
	let now = new Date().getTime()
	let diff = this.nextTime - now
	this.diff = diff
	if (this.diff < 0) {
		timerNode.innerHTML = '00:00:00'
		return false
	}
	let seconds = Math.floor(diff / 1000) % 60
	diff -= seconds
	diff /= 1000
	let mins = Math.floor(diff / 60) % 60
	diff -= mins
	diff /= 60
	let hours = Math.floor(diff / 60)
	
	if (seconds < 10) seconds = '0' + seconds
	if (mins < 10) mins = '0' + mins
	if (hours < 10) hours = '0' + hours
	
	timerNode.innerHTML = (hours + ':' + mins + ':' + seconds)
};

document.addEventListener('DOMContentLoaded', () => {
	timerNode = document.getElementsByClassName('timer')[0]
	
	Timer.boot()
	
	document.querySelector('p.text-1').addEventListener('click', (ev) => {
		let result = window.prompt('Enter Text 1', "The event")
		ev.target.innerHTML = result.length > 0 ? result : "---"
	})
	
	document.querySelector('p.text-2').addEventListener('click', (ev) => {
		let result = window.prompt('Enter Text 2', "ends in")
		ev.target.innerHTML = result.length > 0 ? result : "---"
	})
})
