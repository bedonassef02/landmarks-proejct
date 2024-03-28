// upload-image.service.ts
import { Injectable } from '@nestjs/common';
import * as B2 from 'backblaze-b2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadImageService {
  private b2: B2;

  constructor(private readonly configService: ConfigService) {
    this.b2 = new B2({
      applicationKeyId: this.configService.get(
        'BACKBLAZE_B2_APPLICATION_KEY_ID',
      ),
      applicationKey: this.configService.get('BACKBLAZE_B2_APPLICATION_KEY'),
    });
  }

  async upload(file: Express.Multer.File) {
    await this.b2.authorize();

    const response = await this.b2.getUploadUrl({
      bucketId: this.configService.get('BACKBLAZE_B2_BUCKET_ID'),
    });

    const uploadResponse = await this.b2.uploadFile({
      uploadUrl: response.data.uploadUrl,
      uploadAuthToken: response.data.authorizationToken,
      fileName: file.originalname,
      data: file.buffer,
    });

    return { url: uploadResponse.data.fileUrl };
  }
}
