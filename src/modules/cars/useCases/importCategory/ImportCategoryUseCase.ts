import { Transform } from 'stream';
import csvParser from 'csv-parser';

import ICategoriesRepository from '../../repositories/interfaces/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  public async loadCategories(
    file: Express.Multer.File | undefined
  ): Promise<IImportCategory[]> {
    if (!file) throw new Error('file is missing');

    return new Promise((resolve, reject) => {
      const fileStream = Transform.from(file.buffer);

      const parseFile = csvParser({ headers: false });

      const categories: IImportCategory[] = [];

      fileStream.pipe(parseFile);

      parseFile.on('data', (line) => {
        const [name, description] = Object.values(line);

        categories.push({
          name,
          description
        });
      });

      parseFile.once('end', () => resolve(categories));

      parseFile.once('error', (error) => reject(error.message));
    });
  }

  public async execute(file: Express.Multer.File | undefined) {
    const categories = await this.loadCategories(file);

    categories.forEach(({ name, description }) => {
      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create({
          name,
          description
        });
      }
    });
  }
}

export default ImportCategoryUseCase;
