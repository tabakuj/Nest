import { Inject, Injectable,NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import {Product as ProductEntity} from "./product.entity"
import { Repository,Equal } from "typeorm";
import { ProductDTO } from "./product.model";
import { Category } from "src/category/category.entity";


@Injectable()
export class ProductSerive {

    constructor(@InjectRepository(ProductEntity) private postRepository:Repository<ProductEntity>,@InjectRepository(Category) private categoryRepository:Repository<Category>)
    {}

    private data =  [new ProductDTO(1,"test","")];
    
    public async getProducts():Promise<ProductEntity[]>
    {
        var list= await this.postRepository.find();
        return [... list];
    }

    public async getProductById(productID:Number):Promise<ProductEntity>
    {
        const product=await this.findProduct(productID);
        return product;
    }
    
    async deleteProduct(prodId: Number):Promise<void> {
       await this.postRepository.delete(prodId.toString());
    }

    async createProduct(prodTitle:string, prodDescription:string,categoryId:Number):Promise<Number>
    {
        var categoryModel= await this.LoadCategory(categoryId);
        var product= await this.postRepository.create({
            description:prodDescription,
            title:prodTitle,
            category:categoryModel
        });
        await this.postRepository.save(product);
        return product.id;
    }

    async updateProduct(productId:Number,prodTitle:string, prodDescription:string,categoryId:Number):Promise<void>
    {
        var categoryModel= await this.LoadCategory(categoryId);
      await   this.postRepository.update(productId.toString(),{title:prodTitle,description:prodDescription,category:categoryModel});
    }
    private async LoadCategory(categoryId: Number): Promise<Category> {

        const category = await this.categoryRepository
            .createQueryBuilder("category")
            .where("category.id=:catid",{catid:categoryId})
            .getOne();
        if (!category) {
          throw new NotFoundException('Could not find category.');
        }
        return category;
      }
    private async findProduct(productId: Number): Promise<ProductEntity> {

        const product = await this.postRepository
            .createQueryBuilder("product")
            .where("product.id=:prid",{prid:productId})
            .getOne();
        if (!product) {
          throw new NotFoundException('Could not find product.');
        }
        return product;
      }
}