-- AlterTable
ALTER TABLE "Fixture" ADD COLUMN     "awayTeamLogo" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "awayTeamName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "homeTeamLogo" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "homeTeamName" TEXT NOT NULL DEFAULT '';
