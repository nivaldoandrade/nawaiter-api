import { resolve } from 'path';
import fs from 'fs';
import multerConfig from '../config/multer';


export async function deleteFile(file: string) {
	const filePath = resolve(multerConfig.folderUpload, file);

	try {
		await fs.promises.stat(filePath);
	} catch {
		return;
	}

	await fs.promises.unlink(filePath);
}
