import { randomUUID as uuidV4 } from 'crypto';
import { inject, injectable } from 'tsyringe';
import { resolve } from 'path';

import IUsersRepository from '@modules/accounts/repositories/interfaces/IUsersRepository';
import IUsersTokensRepository from '@modules/accounts/repositories/interfaces/IUsersTokensRepository';
import AppError from '@shared/errors/AppError';
import IDateProvider from '@shared/container/providers/DateProvider/interfaces/IDateProvider';
import IMailProvider from '@shared/container/providers/MailProvider/interfaces/IMailProvider';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UserRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider
  ) {}

  public async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs'
    );

    if (!user) throw new AppError('User dows not exists');

    const token = uuidV4();

    const expiresDate = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refreshToken: token,
      userId: user.id,
      expiresDate
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    };

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      templatePath
    );
  }
}

export default SendForgotPasswordMailUseCase;
