import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from '../todos/dto/create-todo.dto';
import { UpdateTodoDto } from '../todos/dto/update-todo.dto';
import { Todo } from '../todos/entities/todo.entity';
import { SmsService } from '../utils/sms.service';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly entityManager: EntityManager,
    private readonly smsService: SmsService,
  ) {}

  private logger = new Logger(TodoService.name);

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const entity: Todo = new Todo(createTodoDto);
      const todo = await this.entityManager.save(entity);
      return todo;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async getAllTodos(sort?: 'ASC' | 'DESC'): Promise<Todo[]> {
    try {
      const sortOption = sort ? sort : 'DESC';
      return await this.todoRepository.find({
        order: { createdAt: sortOption },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async getTodoById(id: string) {
    try {
      const todo = await this.todoRepository.findOne({ where: { id } });
      if (!todo) {
        throw new NotFoundException(`Todo with ID ${id} not found`);
      }
      return todo;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async updateTodo(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      await this.entityManager.transaction(async (entityManager) => {
        const todo = await this.todoRepository.findOne({ where: { id } });
        todo.text = updateTodoDto.text;
        todo.done = updateTodoDto.done;

        const updatedTodo = await entityManager.save(todo);

        if (updateTodoDto.done) {
          await this.smsService.sendSms(updateTodoDto.text);
        }

        return updatedTodo;
      });
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async deleteTodo(id: string): Promise<any> {
    return await this.todoRepository.delete({ id });
  }
}
