/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "PartDefinition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PartDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartInstance" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "partId" TEXT NOT NULL,
    "assemblyId" TEXT NOT NULL,
    "positionX" DOUBLE PRECISION NOT NULL,
    "positionY" DOUBLE PRECISION NOT NULL,
    "positionZ" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PartInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssemblyDefinition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AssemblyDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssemblyInstance" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "assemblyId" TEXT NOT NULL,
    "parentAssemblyId" TEXT,
    "positionX" DOUBLE PRECISION NOT NULL,
    "positionY" DOUBLE PRECISION NOT NULL,
    "positionZ" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AssemblyInstance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PartInstance" ADD CONSTRAINT "PartInstance_partId_fkey" FOREIGN KEY ("partId") REFERENCES "PartDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartInstance" ADD CONSTRAINT "PartInstance_assemblyId_fkey" FOREIGN KEY ("assemblyId") REFERENCES "AssemblyDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssemblyInstance" ADD CONSTRAINT "AssemblyInstance_assemblyId_fkey" FOREIGN KEY ("assemblyId") REFERENCES "AssemblyDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssemblyInstance" ADD CONSTRAINT "AssemblyInstance_parentAssemblyId_fkey" FOREIGN KEY ("parentAssemblyId") REFERENCES "AssemblyDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
