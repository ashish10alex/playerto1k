/*
  Warnings:

  - You are about to drop the column `awayTeamLogo` on the `Fixture` table. All the data in the column will be lost.
  - You are about to drop the column `awayTeamName` on the `Fixture` table. All the data in the column will be lost.
  - You are about to drop the column `homeTeamLogo` on the `Fixture` table. All the data in the column will be lost.
  - You are about to drop the column `homeTeamName` on the `Fixture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fixture" DROP COLUMN "awayTeamLogo",
DROP COLUMN "awayTeamName",
DROP COLUMN "homeTeamLogo",
DROP COLUMN "homeTeamName";
