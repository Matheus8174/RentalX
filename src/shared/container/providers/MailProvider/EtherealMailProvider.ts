import fs from 'fs';
import handlebars from 'handlebars';

import { injectable } from 'tsyringe';
import nodemailer from 'nodemailer';
import { promisify } from 'util';

import IMailProvider from './interfaces/IMailProvider';

const readFileAsync = promisify(fs.readFile);

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: nodemailer.Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          }
        });

        this.client = transporter;
      })
      .catch((error) => console.error(error));
  }

  public async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ) {
    const templateFileContent = await readFileAsync(path, {
      encoding: 'utf-8'
    });

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: 'Rentx <noreplay@rentx.com.br>',
      subject,
      html: templateHTML
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Message sent: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMailProvider;
