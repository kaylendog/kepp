/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "username" SET DATA TYPE VARCHAR(37),
ADD PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "ClientUser" (
    "id" BIGINT NOT NULL,
    "username" VARCHAR(37) NOT NULL
);

-- CreateTable
CREATE TABLE "AccessToken" (
    "id" SERIAL NOT NULL,
    "client_user_id" BIGINT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "valid_until" TIMESTAMP(3) NOT NULL,
    "access_token" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guild" (
    "id" BIGINT NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "is_joined" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuildSettings" (
    "id" BIGINT NOT NULL,
    "prefix" VARCHAR(4) NOT NULL
);

-- CreateTable
CREATE TABLE "_GuildToUser" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientUser.id_unique" ON "ClientUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AccessToken_client_user_id_unique" ON "AccessToken"("client_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "GuildSettings.id_unique" ON "GuildSettings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_GuildToUser_AB_unique" ON "_GuildToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GuildToUser_B_index" ON "_GuildToUser"("B");

-- AddForeignKey
ALTER TABLE "ClientUser" ADD FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessToken" ADD FOREIGN KEY ("client_user_id") REFERENCES "ClientUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildSettings" ADD FOREIGN KEY ("id") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuildToUser" ADD FOREIGN KEY ("A") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuildToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
