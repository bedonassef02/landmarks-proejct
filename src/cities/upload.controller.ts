import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as B2 from 'backblaze-b2';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const b2 = new B2({
      applicationKeyId: process.env.BACKBLAZE_B2_APPLICATION_KEY_ID,
      applicationKey: process.env.BACKBLAZE_B2_APPLICATION_KEY,
    });

    await b2.authorize();

    const response = await b2.getUploadUrl({
      bucketId: process.env.BACKBLAZE_B2_BUCKET_ID,
    });

    const uploadResponse = await b2.uploadFile({
      uploadUrl: response.data.uploadUrl,
      uploadAuthToken: response.data.authorizationToken,
      fileName: file.originalname,
      data: file.buffer,
    });

    return { path: file.originalname };
  }
}
