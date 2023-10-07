import { createReadStream, createWriteStream } from "fs";
import { createHash } from "crypto";
import path from "path";

const filename = process.argv[2];
const absolutePath = path.resolve(filename);

try {
	if (!filename) {
		throw new Error("Please provide a filename as an argument.");
	}

	const sha1Stream = createHash("sha1").setEncoding("hex");
	const md5Stream = createHash("md5").setEncoding("hex");
	const inputStream = createReadStream(absolutePath);

	inputStream.pipe(sha1Stream).pipe(createWriteStream(`${filename}.sha1`));
	inputStream.pipe(md5Stream).pipe(createWriteStream(`${filename}.md5`));
} catch (error) {
	console.error(`Error: `);
}
