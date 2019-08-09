import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';

@Module({
  imports: [TasksModule],
  controllers: [TasksController],
})
export class TasksModule { }
