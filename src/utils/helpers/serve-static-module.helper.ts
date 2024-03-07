import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DynamicModule } from '@nestjs/common';
import { UPLOAD_FOLDER } from '../constants/constants';

export const serveStaticModule: DynamicModule = ServeStaticModule.forRoot({
  rootPath: join(__dirname, '..', '..', '..', UPLOAD_FOLDER),
});
