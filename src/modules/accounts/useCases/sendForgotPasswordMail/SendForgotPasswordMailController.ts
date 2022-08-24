import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordMailUseCase from './SendForgotPasswordMailUseCase';

type RequestBody = {
  email: string;
};

class SendForgotPasswordMailController {
  public execute(request: Request, response: Response) {
    const { email }: RequestBody = request.body;

    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPasswordMailUseCase
    );

    sendForgotPasswordMailUseCase.execute(email);

    return response.end();
  }
}

export default SendForgotPasswordMailController;
