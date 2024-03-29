import { Request, Response } from 'express';
import { container } from 'tsyringe';
import RefreshTokenUseCase from './RefreshTokenUseCase';

class RefreshTokenController {
  async execute(request: Request, response: Response) {
    const token =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const refreshToken = await refreshTokenUseCase.execute(token);

    return response.json(refreshToken);
  }
}

export default RefreshTokenController;
