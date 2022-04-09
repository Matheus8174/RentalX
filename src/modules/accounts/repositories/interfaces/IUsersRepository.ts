import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../entities/User';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(userId: string): Promise<User | undefined>;
}

export default IUsersRepository;
