import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { EntityManager } from 'typeorm';
import { SmsService } from '../utils/sms.service';
import { Todo } from './entities/todo.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodoService', () => {
  let service: TodoService;
  let todoRepository: Repository<Todo>;
  let entityManager: EntityManager;
  let smsService: SmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useClass: Repository,
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: EntityManager,
          useClass: EntityManager,
          useValue: {
            find: jest.fn(),
            transaction: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: SmsService,
          useValue: {
            sendSms: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    todoRepository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
    entityManager = module.get<EntityManager>(EntityManager);
    smsService = module.get<SmsService>(SmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should return a todo with the specified ID', async () => {
      const expectedTodo: Todo = {
        id: '1',
        text: 'Test Todo',
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(todoRepository, 'findOne').mockResolvedValueOnce(expectedTodo);

      const result = await service.getTodoById('1');

      expect(result).toEqual(expectedTodo);
    });

    it('should throw NotFoundException when todo with specified ID is not found', async () => {
      jest.spyOn(todoRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.getTodoById('1')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('getAllTodos', () => {
    it('should return an array of todos', async () => {
      const expectedTodos: Todo[] = [
        {
          id: '1',
          text: 'Test Todo 1',
          done: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          text: 'Test Todo 2',
          done: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(todoRepository, 'find').mockResolvedValueOnce(expectedTodos);

      const result = await service.getAllTodos();

      expect(result).toEqual(expectedTodos);
    });

    it('should return an empty array when no todos are found', async () => {
      jest.spyOn(todoRepository, 'find').mockResolvedValueOnce([]);

      const result = await service.getAllTodos();

      expect(result).toEqual([]);
    });
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const createTodoDto: CreateTodoDto = { text: 'Test Todo' };
      const expectedTodo: Todo = {
        id: '1',
        text: createTodoDto.text,
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(entityManager, 'save').mockResolvedValueOnce(expectedTodo);

      const result = await service.createTodo(createTodoDto);

      expect(result).toEqual(expectedTodo);
    });

    it('should throw error when creating todo fails', async () => {
      const createTodoDto: CreateTodoDto = { text: 'Test Todo' };
      jest
        .spyOn(entityManager, 'save')
        .mockRejectedValueOnce(new Error('Database error'));

      await expect(service.createTodo(createTodoDto)).rejects.toThrowError(
        'Database error',
      );
    });
  });

  // describe('updateTodo', () => {
  //   it('should update a todo with the specified ID', async () => {
  //     const id = '1';
  //     const updateTodoDto = { text: 'Updated Todo', done: true };
  //     const existingTodo: Todo = {
  //       id: '1',
  //       text: 'Test Todo',
  //       done: false,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     };

  //     jest.spyOn(todoRepository, 'findOne').mockResolvedValueOnce(existingTodo);

  //     jest
  //       .spyOn(entityManager, 'transaction')
  //       .mockImplementation(
  //         async (fn: (entityManager: EntityManager) => Promise<void>) => {
  //           await fn(entityManager); // Pass entityManager to the transaction function
  //         },
  //       );

  //     const updatedTodo: Todo = { ...existingTodo, ...updateTodoDto };
  //     jest.spyOn(entityManager, 'save').mockResolvedValueOnce(updatedTodo);

  //     await expect(service.updateTodo(id, updateTodoDto)).resolves.toEqual(
  //       updatedTodo,
  //     );
  //   });

  //   it('should throw NotFoundException when todo with specified ID is not found', async () => {
  //     const id = '1';
  //     const updateTodoDto = { text: 'Updated Todo', done: true };

  //     jest.spyOn(todoRepository, 'findOne').mockResolvedValueOnce(undefined);

  //     await expect(service.updateTodo(id, updateTodoDto)).rejects.toThrowError(
  //       NotFoundException,
  //     );
  //   });
  // });
});
