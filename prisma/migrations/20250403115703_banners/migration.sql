/*
  Warnings:

  - Added the required column `linkProduct` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "linkProduct" TEXT NOT NULL;
