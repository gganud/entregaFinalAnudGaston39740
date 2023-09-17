import multer from 'multer';
import fs from 'fs';
import path from 'path';

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
  cb(null, path.resolve(`./src/public//uploads/${folder}`));
};

const storage = multer.diskStorage(
{
  destination: getDestination,
  filename: (req, file, cb) =>
  {
    let extension = ''; // set default extension (if any)
    if (file.originalname.split('.').length > 1)
    {
      extension = path.extname(file.originalname);
    }
    const uniqueFileName = `User_${req.params.id}-Subject_${file.fieldname}-Name_${file.originalname.split('.')[0]}${extension}`;
    cb(null, uniqueFileName);
  }
});

const uploadFiles = multer({ storage });

export default uploadFiles;
