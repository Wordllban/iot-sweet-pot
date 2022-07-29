/*
  Warnings:

  - You are about to drop the `pots` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Humidity" DROP CONSTRAINT "Humidity_potId_fkey";

-- DropForeignKey
ALTER TABLE "Moisture" DROP CONSTRAINT "Moisture_potId_fkey";

-- DropForeignKey
ALTER TABLE "Temperature" DROP CONSTRAINT "Temperature_potId_fkey";

-- DropForeignKey
ALTER TABLE "pots" DROP CONSTRAINT "pots_ownerId_fkey";

-- DropTable
DROP TABLE "pots";

-- CreateTable
CREATE TABLE "Pot" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Pot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pot" ADD CONSTRAINT "Pot_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Temperature" ADD CONSTRAINT "Temperature_potId_fkey" FOREIGN KEY ("potId") REFERENCES "Pot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Humidity" ADD CONSTRAINT "Humidity_potId_fkey" FOREIGN KEY ("potId") REFERENCES "Pot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moisture" ADD CONSTRAINT "Moisture_potId_fkey" FOREIGN KEY ("potId") REFERENCES "Pot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
