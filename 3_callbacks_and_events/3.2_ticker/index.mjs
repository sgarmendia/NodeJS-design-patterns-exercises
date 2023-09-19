import { EventEmitter } from "events";

function ticker(number, cb) {
	let counter = 0;
	const emitter = new EventEmitter();

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

ticker(5000, (c) => {
	console.log(c);
}).on("tick", (c) => console.log("tick", c));
