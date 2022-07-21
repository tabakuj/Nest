import { Inject, Injectable,NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import {Product as ProductEntity} from "./product.entity"
import { Repository,Equal } from "typeorm";
import { ProductDTO } from "./product.model";


@Injectable()
export class ProductSerive {

    constructor(@InjectRepository(ProductEntity) private postRepository:Repository<ProductEntity>)
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

    async createProduct(prodTitle:string, prodDescription:string):Promise<Number>
    {
        var product= await this.postRepository.create({
            description:prodDescription,
            title:prodTitle
        });
        await this.postRepository.save(product);
        return product.id;
    }

    async updateProduct(productId:Number,prodTitle:string, prodDescription:string):Promise<void>
    {
      await   this.postRepository.update(productId.toString(),{title:prodTitle,description:prodDescription});
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