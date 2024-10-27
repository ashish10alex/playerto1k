/*
  Warnings:

  - Added the required column `season` to the `Fixture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fixture" ADD COLUMN     "season" INTEGER NOT NULL;
