import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCategoriesUseCases from './ListCategoriesUseCases';

class ListCategoriesController {
  public async execute(_: Request, response: Response) {
    const listCategoriesUseCases = container.resolve(ListCategoriesUseCases);

    const allCategories = await listCategoriesUseCases.execute();

    return response.status(200).json(allCategories);
  }
}

export default ListCategoriesController;
