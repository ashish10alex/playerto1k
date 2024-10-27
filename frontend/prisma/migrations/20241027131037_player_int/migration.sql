/*
  Warnings:

  - The `playerIds` column on the `Teams` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Teams" DROP COLUMN "playerIds",
ADD COLUMN     "playerIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
