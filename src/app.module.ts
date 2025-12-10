import { Module } from '@nestjs/common';

import { HealthCheckModule } from './health-check/health-check.module';
import { PrismaModule } from './prisma/prisma.module';
import { QuizModule } from './quiz/quiz.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [HealthCheckModule, PrismaModule, QuizModule, TaskModule],
})
export class AppModule {}
