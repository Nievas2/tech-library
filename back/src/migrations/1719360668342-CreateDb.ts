import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDb1719360668342 implements MigrationInterface {
    name = 'CreateDb1719360668342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tags\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(15) NOT NULL, \`color\` varchar(7) NOT NULL, UNIQUE INDEX \`IDX_d90243459a697eadb8ad56e909\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`likes\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`liked\` tinyint NOT NULL DEFAULT 0, \`user_id\` bigint NULL, \`library_id\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`librarys\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(25) NOT NULL, \`description\` varchar(255) NOT NULL, \`link\` varchar(300) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`state\` enum ('ACTIVE', 'PENDING', 'INACTIVE') NOT NULL DEFAULT 'PENDING', \`likes_count\` int NOT NULL DEFAULT '0', \`created_by_id\` bigint NOT NULL, UNIQUE INDEX \`IDX_1aa54403e37480de0c222c9a2f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`username\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(50) NOT NULL, \`role\` enum ('USER', 'ADMIN') NOT NULL DEFAULT 'USER', \`is_active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_772886e2f1f47b9ceb04a06e20\` (\`username\`, \`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`library_tags\` (\`library_id\` bigint NOT NULL, \`tag_id\` bigint NOT NULL, INDEX \`IDX_7909346747d002ee2406fb2aa8\` (\`library_id\`), INDEX \`IDX_d055ad00a9516587fdf20c2fed\` (\`tag_id\`), PRIMARY KEY (\`library_id\`, \`tag_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_3f519ed95f775c781a254089171\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_419f99c3d21c38600167d967ff1\` FOREIGN KEY (\`library_id\`) REFERENCES \`librarys\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`librarys\` ADD CONSTRAINT \`FK_39fb3032f413a95912a7ccb18b7\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`library_tags\` ADD CONSTRAINT \`FK_7909346747d002ee2406fb2aa8e\` FOREIGN KEY (\`library_id\`) REFERENCES \`librarys\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`library_tags\` ADD CONSTRAINT \`FK_d055ad00a9516587fdf20c2fed1\` FOREIGN KEY (\`tag_id\`) REFERENCES \`tags\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`library_tags\` DROP FOREIGN KEY \`FK_d055ad00a9516587fdf20c2fed1\``);
        await queryRunner.query(`ALTER TABLE \`library_tags\` DROP FOREIGN KEY \`FK_7909346747d002ee2406fb2aa8e\``);
        await queryRunner.query(`ALTER TABLE \`librarys\` DROP FOREIGN KEY \`FK_39fb3032f413a95912a7ccb18b7\``);
        await queryRunner.query(`ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_419f99c3d21c38600167d967ff1\``);
        await queryRunner.query(`ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_3f519ed95f775c781a254089171\``);
        await queryRunner.query(`DROP INDEX \`IDX_d055ad00a9516587fdf20c2fed\` ON \`library_tags\``);
        await queryRunner.query(`DROP INDEX \`IDX_7909346747d002ee2406fb2aa8\` ON \`library_tags\``);
        await queryRunner.query(`DROP TABLE \`library_tags\``);
        await queryRunner.query(`DROP INDEX \`IDX_772886e2f1f47b9ceb04a06e20\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_1aa54403e37480de0c222c9a2f\` ON \`librarys\``);
        await queryRunner.query(`DROP TABLE \`librarys\``);
        await queryRunner.query(`DROP TABLE \`likes\``);
        await queryRunner.query(`DROP INDEX \`IDX_d90243459a697eadb8ad56e909\` ON \`tags\``);
        await queryRunner.query(`DROP TABLE \`tags\``);
    }

}
