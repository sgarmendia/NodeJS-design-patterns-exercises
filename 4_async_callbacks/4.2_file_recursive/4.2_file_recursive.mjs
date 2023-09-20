import { readdir } from "node:fs/promises";

const fileList = [];
function nestedFiles(dir, cb) {
	readdir(dir, { withFileTypes: true }).then((files) => {
		files.forEach((file) => {
			const { path, name } = file;
			if (file.isDirectory()) {
				nestedFiles(`${path}/${name}`, cb);
			} else {
				fileList.push(name);

				if (!files.some((file) => file.isDirectory())) {
					cb(null, fileList);
				}
			}
		});
	});
}

nestedFiles("dir1", (err, list) => {
	if (err) {
		return console.error(err);
	}
	console.log("FIle list -->", list);
});
