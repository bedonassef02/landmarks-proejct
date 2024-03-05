import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uploadFileName } from '../../../utils/helpers/filename.helper';
import { UPLOAD_FOLDER } from '../../../utils/constants/constants';
import { DynamicModule } from '@nestjs/common';

export const multerModule: DynamicModule = MulterModule.register({
  dest: `./${UPLOAD_FOLDER}`,
  storage: diskStorage({
    destination: `./${UPLOAD_FOLDER}`,
    filename: uploadFileName,
  }),
});
