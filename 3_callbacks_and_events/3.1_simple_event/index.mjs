import { EventEmitter } from "events";
import { readFile } from "fs";

class FindRegex extends EventEmitter {
	constructor(regex) {
		super();
		this.regex = regex;
		this.files = [];
	}

	addFile(file) {
		this.files.push(file);
		return this;
	}

	find() {
		process.nextTick(() => this.emit("findstart", this.files));

		for (const file of this.files) {
			readFile(file, "utf8", (err, content) => {
				if (err) {
					return this.emit("error", err);
				}

				this.emit("fileread", file);

				const match = content.match(this.regex);

				if (match) {
					match.forEach((el) => this.emit("found", file, el));
				}
			});
		}
		return this;
	}
}

const find = new FindRegex(/test1/);

find
	.addFile("file1.txt")
	.addFile("file2.txt")
	.find()
	.on("findstart", () => {
		console.log("find start");
	})
	.on("found", (file, match) => console.log(`Matched ${match} in file ${file}`))
	.on("fileread", () => console.log("file read "));
