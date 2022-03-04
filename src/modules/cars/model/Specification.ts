import { randomUUID as uuidV4 } from 'crypto';

class Specification {
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

export default Specification;
