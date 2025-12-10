-- CreateTable
CREATE TABLE "quiz" (
    "entityId" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "bgColor" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "imageSmall" TEXT NOT NULL,

    CONSTRAINT "quiz_pkey" PRIMARY KEY ("entityId")
);

-- CreateTable
CREATE TABLE "task" (
    "entityId" SERIAL NOT NULL,
    "quizId" INTEGER NOT NULL,
    "extId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("entityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "quiz_uuid_key" ON "quiz"("uuid");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quiz"("entityId") ON DELETE CASCADE ON UPDATE CASCADE;
