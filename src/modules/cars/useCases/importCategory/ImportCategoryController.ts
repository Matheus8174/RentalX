import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ImportCategoryUseCase from './ImportCategoryUseCase';

class ImportCategoryController {
  public async execute(request: Request, response: Response) {
    const { file } = request;

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    await importCategoryUseCase.execute(file);

    return response.status(201).end();
  }
}

export default ImportCategoryController;
