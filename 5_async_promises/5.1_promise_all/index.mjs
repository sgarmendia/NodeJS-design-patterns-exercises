async function myPromiseAll(promises) {
	return new Promise((resolve, reject) => {
		const results = [];
		let count = 0;
		promises.forEach((promise, i) => {
			promise
				.then((data) => {
					results[i] = data;
					count++;
					if (count === promises.length) {
						resolve(results);
					}
				})
				.catch((error) => {
					reject(error);
				});
		});
	});
}

const fakeArray = [
	fakePromise(100),
	fakePromise(160),
	fakePromise(80),
	fakePromise(140),
	// Promise.reject("myerror"),
];

try {
	const result = await myPromiseAll(fakeArray);
	console.log(result);
} catch (error) {
	console.log(error);
}

function fakePromise(time) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(`resolved in ${time}`);
		}, time);
	});
}
