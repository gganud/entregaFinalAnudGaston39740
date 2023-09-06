import { resolve } from 'path';
import multer from 'multer';

const storage = multer.diskStorage(
    {
        destination(req, file, cb)
            {
                 cb(null, resolve('src/public'));
            },
        filename(req, file, cb)
            {
                cb(null, file.originalname);
            }
    });
    const uploader = multer({ storage });
    export default uploader;
