-- CreateTable
CREATE TABLE "GuildTrelloIntegration" (
    "id" BIGINT NOT NULL,
    "key" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchiveSettings" (
    "id" BIGINT NOT NULL,
    "enabled" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "ArchivedChannel" (
    "id" BIGINT NOT NULL,
    "guild_id" BIGINT NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "topic" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ArchivedMessage" (
    "id" BIGINT NOT NULL,
    "guild_id" BIGINT NOT NULL,
    "channel_id" BIGINT NOT NULL,
    "author_id" BIGINT NOT NULL,
    "content" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArchiveSettings.id_unique" ON "ArchiveSettings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ArchivedChannel.id_unique" ON "ArchivedChannel"("id");

-- AddForeignKey
ALTER TABLE "GuildTrelloIntegration" ADD FOREIGN KEY ("id") REFERENCES "GuildSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchiveSettings" ADD FOREIGN KEY ("id") REFERENCES "GuildSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchivedChannel" ADD FOREIGN KEY ("guild_id") REFERENCES "ArchiveSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchivedMessage" ADD FOREIGN KEY ("guild_id") REFERENCES "ArchiveSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchivedMessage" ADD FOREIGN KEY ("channel_id") REFERENCES "ArchivedChannel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
