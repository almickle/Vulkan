/*
  Warnings:

  - Added the required column `quaternionW` to the `AssemblyInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quaternionX` to the `AssemblyInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quaternionY` to the `AssemblyInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quaternionZ` to the `AssemblyInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quaternionW` to the `PartInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quaternionX` to the `PartInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quaternionY` to the `PartInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quaternionZ` to the `PartInstance` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ManufacturingProcess" AS ENUM ('SHEET_METAL', 'CNC', 'INJECTION_MOLDING', 'PCB');

-- CreateEnum
CREATE TYPE "Finish" AS ENUM ('PAINT', 'ANODIZING', 'POWDER_COATING', 'PLATING');

-- CreateEnum
CREATE TYPE "Material" AS ENUM ('ALUMINUM', 'STEEL');

-- AlterTable
ALTER TABLE "AssemblyInstance" ADD COLUMN     "quaternionW" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quaternionX" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quaternionY" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quaternionZ" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "PartInstance" ADD COLUMN     "quaternionW" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quaternionX" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quaternionY" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quaternionZ" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "PartProperties" (
    "id" TEXT NOT NULL,
    "manufacturingProcess" "ManufacturingProcess" NOT NULL,
    "material" "Material" NOT NULL,
    "finish" "Finish" NOT NULL,
    "thickness" DOUBLE PRECISION,

    CONSTRAINT "PartProperties_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PartProperties" ADD CONSTRAINT "PartProperties_id_fkey" FOREIGN KEY ("id") REFERENCES "PartDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
