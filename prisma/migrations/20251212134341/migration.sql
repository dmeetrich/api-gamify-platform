-- CreateTable
CREATE TABLE "task_progress" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "taskId" INTEGER NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "task_progress_phone_idx" ON "task_progress"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "task_progress_phone_taskId_key" ON "task_progress"("phone", "taskId");

-- AddForeignKey
ALTER TABLE "task_progress" ADD CONSTRAINT "task_progress_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task"("entityId") ON DELETE CASCADE ON UPDATE CASCADE;
