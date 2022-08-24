import { getRepository, Repository } from 'typeorm';

import IUsersTokensRepository from '@modules/accounts/repositories/interfaces/IUsersTokensRepository';
import UserTokens from '../entities/UserTokens';
import ICreateUserTokenDTO from '@modules/accounts/dtos/ICreateUserTokenDTO';

class UsersTokensRepository implements IUsersTokensRepository {
  private readonly repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  public async create({
    userId,
    expiresDate,
    refreshToken
  }: ICreateUserTokenDTO) {
    const usersToken = this.repository.create({
      user_id: userId,
      expires_date: expiresDate,
      refresh_token: refreshToken
    });

    return await this.repository.save(usersToken);
  }

  public async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ) {
    const usersToken = await this.repository.findOne({
      user_id: userId,
      refresh_token: refreshToken
    });

    return usersToken;
  }

  public async deleteById(userToken: string) {
    await this.repository.delete(userToken);
  }

  public async findByRefreshToken(refreshToken: string) {
    const userToken = await this.repository.findOne({
      refresh_token: refreshToken
    });

    return userToken;
  }
}

export default UsersTokensRepository;
