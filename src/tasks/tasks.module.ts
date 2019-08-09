import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TasksModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule { }
