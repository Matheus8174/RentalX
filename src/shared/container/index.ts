import '@shared/container/providers';

import { container } from 'tsyringe';

import ICategoriesRepository from '@modules/cars/repositories/interfaces/ICategoriesRepository';
import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';

import ISpecificationsRepository from '@modules/cars/repositories/interfaces/ISpecificationsRepository';
import SpecificationsRepository from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';

import IUsersRepository from '@modules/accounts/repositories/interfaces/IUsersRepository';
import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

import ICarsRepository from '@modules/cars/repositories/interfaces/ICarsRepository';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';

import ICarImagesRepository from '@modules/cars/repositories/interfaces/ICarImagesRepository';
import CarsImageRepository from '@modules/cars/infra/typeorm/repositories/CarsImageRepository';

import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import RentalsRepository from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';

import IUsersTokensRepository from '@modules/accounts/repositories/interfaces/IUsersTokensRepository';
import UsersTokensRepository from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';

container.registerSingleton<ICarImagesRepository>(
  'CarsImagesRepository',
  CarsImageRepository
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UsersRepository
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
);
