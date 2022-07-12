import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class CreateSpecificationsCars1651157372984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          {
            name: 'car_id',
            type: 'uuid'
          },
          {
            name: 'specification_id',
            type: 'uuid'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FKCarSpecification',
            columnNames: ['car_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cars',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL '
          },
          {
            name: 'FKSpecificationCar',
            columnNames: ['specification_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'specifications',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL '
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'specifications_cars',
      'FKCarSpecification'
    );

    await queryRunner.dropForeignKey(
      'specifications_cars',
      'FKSpecificationCar'
    );

    await queryRunner.dropTable('specifications_cars');
  }
}

export default CreateSpecificationsCars1651157372984;
