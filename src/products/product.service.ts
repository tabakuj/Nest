import { Inject, Injectable,NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import {Product as ProductEntity} from "./product.entity"
import { Repository } from "typeorm";
import { Product } from "./product.model";


@Injectable()
export class ProductSerive {

    constructor(@InjectRepository(ProductEntity) private postRepository:Repository<ProductEntity>)
    {}

    private data =  [new Product(1,"test","",15,20)];
    
    public async getProducts():Promise<ProductEntity[]>
    {
        var list= (await this.postRepository.find());

        const list2=this.postRepository.find().then(a=>
            {
                console.log(a);
            }).catch(err=>console.log(err));
        return [... list];
    }

    public getProductById(productID:Number):Product
    {
        const product=this.findProduct(productID)[0];
        return product;
    }
    
    deleteProduct(prodId: Number) {
        const index = this.findProduct(prodId)[1];
        this.data.splice(index, 1);
    }

    createProduct(title:string, description:string,price:Number,quantity:Number):Number
    {
        var products=this.data.map(a=>a.id);

        const maxId=Math.max.apply(null,products)+1;

        const product= new Product(maxId,title,description,price,quantity);
        this.data.push(product);
        return product.id;
    }

    updateProduct(productId:Number,title:string, description:string,price:Number,quantity:Number)
    {
        const productData=this.findProduct(productId);

        
        const product= new Product(productId,title,description,price,quantity);
        
        this.data[productData[1]]=product;
    }

    private findProduct(id: Number): [Product, number] {
        const productIndex = this.data.findIndex(prod => prod.id === id);
        const product = this.data[productIndex];
        if (!product) {
          throw new NotFoundException('Could not find product.');
        }
        return [product, productIndex];
      }
}