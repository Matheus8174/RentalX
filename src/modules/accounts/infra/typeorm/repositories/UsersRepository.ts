import { Repository, getRepository } from 'typeorm';

import User from '../entities/User';

import IUsersRepository from '../../../repositories/interfaces/IUsersRepository';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const newUser = this.repository.create(data);

    await this.repository.save(newUser);
  }

  async findByEmail(email: string) {
    const userFinded = await this.repository.findOne({
      where: { email }
    });

    return userFinded;
  }

  async findById(userId: string) {
    const userFinded = await this.repository.findOne({
      where: { id: userId }
    });

    return userFinded;
  }
}

export default UsersRepository;
