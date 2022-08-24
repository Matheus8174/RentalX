import ICreateUserTokenDTO from '@modules/accounts/dtos/ICreateUserTokenDTO';
import UserTokens from '@modules/accounts/infra/typeorm/entities/UserTokens';

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens | undefined>;
  deleteById(userToken: string): Promise<void>;
  findByRefreshToken(refreshToken: string): Promise<UserTokens | undefined>;
}

export default IUsersTokensRepository;
