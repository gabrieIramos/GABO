import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 as Cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { CLOUDINARY } from './cloudinary.provider';

@Injectable()
export class CloudinaryService {
  constructor(@Inject(CLOUDINARY) private readonly cloudinary: typeof Cloudinary) {}

  private uploadStream(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = this.cloudinary.uploader.upload_stream(
        { folder: 'hubbra/products', resource_type: 'image' },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) {
            return reject(new InternalServerErrorException('Falha ao enviar imagem para o Cloudinary'));
          }
          return resolve(result);
        },
      );

      Readable.from(file.buffer).pipe(upload);
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const result = await this.uploadStream(file);
    return result.secure_url;
  }

  async uploadMany(files: Express.Multer.File[]): Promise<string[]> {
    if (!files?.length) {
      return [];
    }
    const uploads = files.map(file => this.uploadImage(file));
    return Promise.all(uploads);
  }
}
