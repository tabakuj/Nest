import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {Product as ProductEntity} from "./../products/product.entity"
 
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',//configService.get('POSTGRES_HOST'),
        port: 5432, //configService.get('POSTGRES_PORT'),
        username: 'sa',//configService.get('POSTGRES_USER'),
        password: 'Yeswecan2015',//configService.get('POSTGRES_PASSWORD'),
        database: 'nestjs',//configService.get('POSTGRES_DB'),
        entities: [
         // __dirname + './../**/*.entity.ts',
         ProductEntity
        ],
        synchronize: true,
      })
    }),
  ],
})
export class DatabaseModule{}