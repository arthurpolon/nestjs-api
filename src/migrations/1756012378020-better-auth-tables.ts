import { MigrationInterface, QueryRunner } from 'typeorm';

export class BetterAuthTables1756012378020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table "user" ("id" text not null primary key, "name" text not null, "email" text not null unique, "emailVerified" boolean not null, "image" text, "createdAt" timestamp default CURRENT_TIMESTAMP not null, "updatedAt" timestamp default CURRENT_TIMESTAMP not null);`,
    );
    await queryRunner.query(
      `create table "session" ("id" text not null primary key, "expiresAt" timestamp not null, "token" text not null unique, "createdAt" timestamp not null, "updatedAt" timestamp not null, "ipAddress" text, "userAgent" text, "userId" text not null references "user" ("id") on delete cascade);`,
    );
    await queryRunner.query(
      `create table "account" ("id" text not null primary key, "accountId" text not null, "providerId" text not null, "userId" text not null references "user" ("id") on delete cascade, "accessToken" text, "refreshToken" text, "idToken" text, "accessTokenExpiresAt" timestamp, "refreshTokenExpiresAt" timestamp, "scope" text, "password" text, "createdAt" timestamp not null, "updatedAt" timestamp not null);`,
    );
    await queryRunner.query(
      `create table "verification" ("id" text not null primary key, "identifier" text not null, "value" text not null, "expiresAt" timestamp not null, "createdAt" timestamp default CURRENT_TIMESTAMP, "updatedAt" timestamp default CURRENT_TIMESTAMP);`,
    );

    await queryRunner.query(
      `create index if not exists "ix_user_email" on "user" ("email");`,
    );
    await queryRunner.query(
      `create index if not exists "ix_account_userId" on "account" ("userId");`,
    );
    await queryRunner.query(
      `create index if not exists "ix_session_userId_token" on "session" ("userId", "token");`,
    );
    await queryRunner.query(
      `create index if not exists "ix_verification_identifier" on "verification" ("identifier");`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop index if exists "ix_user_email";`);
    await queryRunner.query(`drop index if exists "ix_account_userId";`);
    await queryRunner.query(`drop index if exists "ix_session_userId_token";`);
    await queryRunner.query(
      `drop index if exists "ix_verification_identifier";`,
    );

    await queryRunner.query(`drop table if exists "verification";`);
    await queryRunner.query(`drop table if exists "account";`);
    await queryRunner.query(`drop table if exists "session";`);
    await queryRunner.query(`drop table if exists "user";`);
  }
}
