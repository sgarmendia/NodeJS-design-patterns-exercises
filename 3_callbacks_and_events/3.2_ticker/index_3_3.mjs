import { EventEmitter } from "events";

function ticker(number, cb) {
	const emitter = new EventEmitter();
	let counter = 0;
	process.nextTick(() => emitter.emit("tick"));

	let timer;
	function timeout() {
		emitter.emit("tick", counter);
		counter++;
		timer = setTimeout(timeout, 50);
	}

	timeout();

	setTimeout(() => {
		clearTimeout(timer);
		cb(counter);
	}, number);

	return emitter;
}

ticker(1000, (c) => {
	console.log(c);
}).on("tick", (c) => console.log("tick", c));
