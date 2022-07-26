/*
  Warnings:

  - Added the required column `name` to the `pots` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Humidity" ADD COLUMN     "description" TEXT,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Moisture" ADD COLUMN     "description" TEXT,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Temperature" ADD COLUMN     "description" TEXT,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "pots" ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;
