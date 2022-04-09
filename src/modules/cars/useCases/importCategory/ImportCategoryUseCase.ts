import { Transform, pipeline } from 'stream';
import csvParser from 'csv-parser';
import { inject, injectable } from 'tsyringe';

import ICategoriesRepository from '@modules/cars/repositories/interfaces/ICategoriesRepository';
import AppError from '@errors/AppError';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository
  ) {}

  private async loadCategories(
    file: Express.Multer.File | undefined
  ): Promise<IImportCategory[]> {
    if (!file) throw new AppError('file is missing');

    return new Promise((resolve, reject) => {
      const fileStream = Transform.from(file.buffer);

      const parseFile = csvParser({ headers: false });

      const categories: IImportCategory[] = [];

      const handleData = new Transform({
        objectMode: true,
        transform(chunk, _, done) {
          const [name, description] = Object.values(chunk);

          categories.push({
            name,
            description
          });

          done(null);
        }
      });

      pipeline(fileStream, parseFile, handleData, (error) => {
        if (error) reject(error);

        resolve(categories);
      });
    });
  }

  public async execute(file: Express.Multer.File | undefined) {
    try {
      const categories = await this.loadCategories(file);

      categories.forEach(async ({ name, description }) => {
        const existCategory = await this.categoriesRepository.findByName(name);

        if (!existCategory) {
          await this.categoriesRepository.create({
            name,
            description
          });
        }
      });
    } catch (error) {
      throw new AppError((error as Error).message);
    }
  }
}

export default ImportCategoryUseCase;
