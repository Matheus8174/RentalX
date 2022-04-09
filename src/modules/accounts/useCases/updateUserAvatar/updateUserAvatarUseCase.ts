import FormData from 'form-data';
import axios, { AxiosResponse } from 'axios';

import { inject, injectable } from 'tsyringe';
import { Readable } from 'stream';

import AppError from '@errors/AppError';
import IUsersRepository from '@modules/accounts/repositories/interfaces/IUsersRepository';

type UploadResponse = {
  success: boolean;
  status: number;
  id: string;
  key: string;
  name: string;
  link: string;
  expires: string;
  expiry: string;
  downloads: number;
  maxDownloads: number;
  autoDelete: boolean;
  size: number;
  mimeType: string;
  created: string;
  modified: string;
};

type Params = {
  userId: string;
  file: Express.Multer.File;
};

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UserRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  private upload(
    file: Express.Multer.File
  ): Promise<AxiosResponse<UploadResponse>> {
    return new Promise((resolve, reject) => {
      const stream = Readable.from(file.buffer);

      const form = new FormData();
      form.append('file', stream, { filename: file.originalname });

      axios
        .post<UploadResponse>('https://file.io', form, {
          headers: form.getHeaders()
        })
        .then((response) => resolve(response))
        .catch((reason) => reject(reason));
    });
  }

  public async execute({ userId, file }: Params) {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new AppError('User does not exists', 401);

    const response = await this.upload(file);

    user.avatar = response.data.key;

    await this.usersRepository.create(user);
  }
}

export default UpdateUserAvatarUseCase;
