import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [ProductModule, ConfigModule.forRoot(
    {
    envFilePath:'environments.env',
    validationSchema: Joi.object({
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_PORT: Joi.number().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
      PORT: Joi.number(),
    })
  }),
  DatabaseModule,
  CategoryModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
