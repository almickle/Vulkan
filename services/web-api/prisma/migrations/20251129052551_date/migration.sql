/*
  Warnings:

  - The values [PAINT,ANODIZING,POWDER_COATING,PLATING] on the enum `Finish` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Finish_new" AS ENUM ('POWDER_COAT');
ALTER TABLE "PartProperties" ALTER COLUMN "finish" TYPE "Finish_new" USING ("finish"::text::"Finish_new");
ALTER TYPE "Finish" RENAME TO "Finish_old";
ALTER TYPE "Finish_new" RENAME TO "Finish";
DROP TYPE "public"."Finish_old";
COMMIT;
