import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTodoDto } from 'src/todos/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/todos/dto/update-todo.dto';
import { Todo } from 'src/todos/entities/todo.entity';
import { TodoService } from 'src/todos/todo.service';

@ApiTags('Todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoService.createTodo(createTodoDto);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<void> {
    return await this.todoService.updateTodo(id, updateTodoDto);
  }

  @Get()
  async getAllTodos(@Query('sort') sort?: 'ASC' | 'DESC'): Promise<Todo[]> {
    return await this.todoService.getAllTodos(sort);
  }

  @Get(':id')
  async getTodoById(@Param('id') id: string): Promise<Todo> {
    return await this.todoService.getTodoById(id);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string): Promise<any> {
    return await this.todoService.deleteTodo(id);
  }
}
