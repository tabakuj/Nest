import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductSerive } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Product as ProductEntity} from "./product.entity"
import { Category } from 'src/category/category.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]),TypeOrmModule.forFeature([Category])],
  controllers: [ProductController],
  providers: [ProductSerive],
})
export class ProductModule {}