import { Options, memoryStorage } from 'multer';

const mimetypesSupporteds = ['image/jpeg', 'image/png', 'image/ief'];

const uploadAvatar: Options = {
  fileFilter: (_, file, callback) => {
    const isMimetypeMatch = mimetypesSupporteds.find(
      (extension) => extension === file.mimetype
    );

    if (!isMimetypeMatch) callback(new Error('Just images files are allowed'));

    callback(null, true);
  },
  storage: memoryStorage()
};

export default uploadAvatar;
