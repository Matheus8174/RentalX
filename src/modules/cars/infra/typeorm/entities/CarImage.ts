import { randomUUID as uuidV4 } from 'crypto';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm';

@Entity('cars_image')
class CreateCarImages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  car_id: string;

  @Column()
  image_name: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export default CreateCarImages;
