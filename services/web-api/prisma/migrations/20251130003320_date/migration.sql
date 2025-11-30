/*
  Warnings:

  - You are about to drop the column `storageKey` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "storageKey",
ALTER COLUMN "sizeBytes" DROP NOT NULL;
