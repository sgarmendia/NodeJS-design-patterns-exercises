import { EventEmitter } from "events";
import { nextTick } from "process";

function processTick(em, c, cb) {
	nextTick(() => {
		if (Date.now() % 5 === 0) {
			em.emit("error", "event error");
			cb("date %5 error");
		} else {
			em.emit("tick", c);
		}
	});
}

function ticker(number, cb) {
	const emitter = new EventEmitter();
	let counter = 0;

	processTick(emitter, 0, cb);

	let timer;
	function timeout() {
		processTick(emitter, counter, cb);
		counter++;
		timer = setTimeout(timeout, 10);
	}

	timeout();

	setTimeout(() => {
		clearTimeout(timer);
		cb(null, counter);
	}, number);

	return emitter;
}

ticker(100, (err, c) => {
	if (err) {
		console.error(err);
	} else {
		console.log(c);
	}
})
	.on("tick", (c) => console.log("tick", c))
	.on("error", (e) => console.log(e));
