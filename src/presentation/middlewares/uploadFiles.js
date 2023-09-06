import multer from 'multer';
import fs from 'fs';
import { resolve } from 'path';

const createFolders = () =>
{
  if (!fs.existsSync('./src/public/uploads'))
    {
    fs.mkdirSync('./src/public/uploads');
    }
  if (!fs.existsSync('./src/public/uploads/products'))
    {
    fs.mkdirSync('./src/public/uploads/products');
    }
  if (!fs.existsSync('./src/public/uploads/documents'))
    {
    fs.mkdirSync('./src/public/uploads/documents');
    }
  if (!fs.existsSync('./src/public/uploads/profiles'))
    {
    fs.mkdirSync('./src/public/uploads/profiles');
    }
};

const getDestination = (req, file, cb) =>
{
  createFolders();
  let folder = '';
  if (file.fieldname === 'profiles')
  {
    folder = 'profiles';
  }
  else if (file.fieldname === 'products')
  {
    folder = 'products';
  }
  else
  {
    folder = 'documents';
  }
  cb(null, resolve(`./src/public//uploads/${folder}`));
};

const storage = multer.diskStorage(
{
  destination: getDestination,
  filename: (req, file, cb) =>
  {
    const uniqueFileName = `${req.params.id}-${file.fieldname}`;
    cb(null, uniqueFileName);
  }
});

const uploadFiles = multer({ storage });

export default uploadFiles;
