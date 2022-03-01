import { randomUUID as uuidV4 } from 'crypto';

class Category {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly created_at: Date,
    public readonly id?: string
  ) {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export default Category;
