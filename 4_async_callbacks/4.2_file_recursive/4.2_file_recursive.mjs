import { readdir, stat } from "node:fs/promises";
import { join } from "path";

const fileList = [];
function nestedFiles(dir, cb) {
	try {
		readdir(dir).then((files) => {
			const promises = files.map((file) => {
				return stat(join(dir, file)).then((data) => {
					if (data.isDirectory()) {
						const currentPath = join(dir, file);
						return nestedFiles(currentPath, cb);
					} else {
						fileList.push(file);
					}
				});
			});
			Promise.all(promises).then(() => cb(null, fileList));
		});
	} catch (error) {
		cb(error);
	}
}

nestedFiles("dir1", (err, list) => {
	if (err) {
		return console.error(err);
	}
	console.log("FIle list -->", list);
});
