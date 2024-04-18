import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Todo } from 'src/todos/entities/todo.entity';
import { DataSourceOptions } from 'typeorm';

config();

const configService = new ConfigService();
export const db_config: DataSourceOptions = {
  type: 'postgres',
  host: configService.getOrThrow('DB_HOST'),
  port: parseInt(configService.getOrThrow('DB_PORT'), 10),
  username: configService.getOrThrow('DB_USERNAME'),
  password: configService.getOrThrow('DB_PASSWORD'),
  database: configService.getOrThrow('DB_DATABASE'),
  synchronize: true, // change in prod to false
  entities: [Todo],
};
