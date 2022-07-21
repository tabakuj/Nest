import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductSerive } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Product as ProductEntity} from "./product.entity"
@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [ProductSerive],
})
export class ProductModule {}