import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

class AlterUserDeleteUsernameField1647967296858 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'username');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'username',
        type: 'varchar'
      })
    );
  }
}

export default AlterUserDeleteUsernameField1647967296858;
