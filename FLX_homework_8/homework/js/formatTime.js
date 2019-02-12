function formatTime (time) {
	let days = Math.floor((time / (24 * 60)));
	let hours = Math.floor((time % (24 * 60)) / 60);
	let minutes = Math.floor((time % (24 * 60)) % 60);

	return `${days} day(s) ${hours} hour(s) ${minutes} minute(s)`;
}
formatTime(120);
formatTime(59);
formatTime(3601);
