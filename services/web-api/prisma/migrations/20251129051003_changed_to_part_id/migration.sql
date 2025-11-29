/*
  Warnings:

  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `File` table. All the data in the column will be lost.
  - The primary key for the `PartProperties` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PartProperties` table. All the data in the column will be lost.
  - Added the required column `partId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partId` to the `PartProperties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_id_fkey";

-- DropForeignKey
ALTER TABLE "PartProperties" DROP CONSTRAINT "PartProperties_id_fkey";

-- AlterTable
ALTER TABLE "File" DROP CONSTRAINT "File_pkey",
DROP COLUMN "id",
ADD COLUMN     "partId" TEXT NOT NULL,
ADD CONSTRAINT "File_pkey" PRIMARY KEY ("partId");

-- AlterTable
ALTER TABLE "PartProperties" DROP CONSTRAINT "PartProperties_pkey",
DROP COLUMN "id",
ADD COLUMN     "partId" TEXT NOT NULL,
ADD CONSTRAINT "PartProperties_pkey" PRIMARY KEY ("partId");

-- AddForeignKey
ALTER TABLE "PartProperties" ADD CONSTRAINT "PartProperties_partId_fkey" FOREIGN KEY ("partId") REFERENCES "PartDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_partId_fkey" FOREIGN KEY ("partId") REFERENCES "PartDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
