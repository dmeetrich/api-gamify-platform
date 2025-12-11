-- AlterTable
ALTER TABLE "quiz" ADD COLUMN "bannerBgColor" TEXT;

UPDATE "quiz" SET "bannerBgColor" = "bgColor";

ALTER TABLE "quiz" ALTER COLUMN "bannerBgColor" SET NOT NULL;
