import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const folderUpload = path.resolve(__dirname, '..', '..', 'uploads');

export default {
	folderUpload,
	storage: multer.diskStorage({
		destination: folderUpload,
		filename(request, file, callback) {
			const filenameHash = crypto.randomBytes(6).toString('hex');
			const filename = `${filenameHash}-${file.originalname}`;

			return callback(null, filename);
		}
	})
};
