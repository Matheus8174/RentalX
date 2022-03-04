import { Request, Response } from 'express';

import ListCategoriesUseCases from './ListCategoriesUseCases';

class ListCategoriesController {
  constructor(
    private readonly listCategoriesUseCases: ListCategoriesUseCases
  ) {}

  public execute(_: Request, response: Response) {
    const allCategories = this.listCategoriesUseCases.execute();

    return response.status(200).json(allCategories);
  }
}

export default ListCategoriesController;
