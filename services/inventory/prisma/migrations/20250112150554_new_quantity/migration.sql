/*
  Warnings:

  - Added the required column `newQuantity` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" ADD COLUMN     "newQuantity" INTEGER NOT NULL;
