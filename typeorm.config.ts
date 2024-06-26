import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'todo_db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // Change to 'false' in production for migrations
};
