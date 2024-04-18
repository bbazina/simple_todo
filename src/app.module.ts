import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TodoModule } from './todos/todo.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    TodoModule,
    UtilsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
