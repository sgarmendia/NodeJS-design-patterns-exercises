import { readFile, writeFile } from "fs/promises";

async function concatFiles(...args) {
	const cb = args.pop();
	const dest = args.pop();

	const files = Promise.all(args.map((src) => readFile(src)))
		.then((files) => {
			writeFile(dest, files.join(" "));
		})
		.then(() => {
			cb();
		});
}

concatFiles("file1.txt", "file2.txt", "dest.txt", () => console.log("finish"));
