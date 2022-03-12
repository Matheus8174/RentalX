import { Request, Response } from 'express';

import ImportCategoryUseCase from './ImportCategoryUseCase';

class ImportCategoryController {
  constructor(private readonly importCategoryUseCase: ImportCategoryUseCase) {}

  public execute(request: Request, response: Response) {
    const { file } = request;

    this.importCategoryUseCase.execute(file);

    return response.end();
  }
}

export default ImportCategoryController;
