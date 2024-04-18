import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db_config } from './config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => db_config,
    }),
  ],
})
export class DatabaseModule {}
