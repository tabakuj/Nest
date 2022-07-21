import { Controller, Delete, Get,Param, Post, Put,Body } from "@nestjs/common";
import { ProductSerive } from "./product.service";

@Controller("products")
export class  ProductController
{

    constructor(private readonly productService:ProductSerive) {  
    }

    @Get()
    async getProducts()
    {
      var resulsts= await this.productService.getProducts();
      return  resulsts;
    }

    @Get(":id")
    async getProduct(@Param("id") productId:string)
    {
      return await this.productService.getProductById(Number(productId));
    }

    @Delete(":id")
    async deleteProduct(@Param("id") productId:string)
    {
      return await this.productService.deleteProduct(Number(productId));
    }

    @Post()
    async createProduct( 
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('categoryId') categoryId: number
    )
    {
      return await this.productService.createProduct(prodTitle,prodDesc,categoryId);
    }

    @Put(":id")
   async updateProduct(
    @Param("id") productId:string,    
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('categoryId') categoryId: number)
    {
       await this.productService.updateProduct(Number(productId),prodTitle,prodDesc,categoryId);
    }
}