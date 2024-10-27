/*
  Warnings:

  - Added the required column `goals` to the `Fixture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fixture" ADD COLUMN     "goals" TEXT NOT NULL;
