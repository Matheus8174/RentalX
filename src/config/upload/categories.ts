import { Options, memoryStorage } from 'multer';

const uploadCategories: Options = {
  fileFilter: (_, file, callback) => {
    const mimetype = file.mimetype;

    if (mimetype !== 'text/csv')
      callback(new Error('Just csv files are allowed'));

    callback(null, true);
  },
  storage: memoryStorage()
};

export default uploadCategories;
