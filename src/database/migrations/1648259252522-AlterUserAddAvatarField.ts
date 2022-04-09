import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

class AlterUserAddAvatarField1648259252522 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar');
  }
}

export default AlterUserAddAvatarField1648259252522;
