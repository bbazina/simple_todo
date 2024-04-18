import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from 'src/todos/todo.service';
import { Todo } from './entities/todo.entity';
import { TodoController } from './todo.controller';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), UtilsModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
