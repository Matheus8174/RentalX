import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

class AlterUserUpdateEmailField1647968531720 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'email',
      new TableColumn({
        name: 'email',
        type: 'varchar',
        isUnique: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'email',
      new TableColumn({
        name: 'email',
        type: 'varchar',
        isUnique: false
      })
    );
  }
}

export default AlterUserUpdateEmailField1647968531720;
