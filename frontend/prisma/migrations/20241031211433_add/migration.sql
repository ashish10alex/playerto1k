-- AlterTable
ALTER TABLE "PlayerFixtureStatistic" ALTER COLUMN "games_minutes" DROP NOT NULL,
ALTER COLUMN "games_number" DROP NOT NULL,
ALTER COLUMN "games_substitute" DROP NOT NULL;
