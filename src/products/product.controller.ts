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
      var resulsts=await this.productService.getProducts();
      return  resulsts;
    }

    @Get(":id")
    getProduct(@Param("id") productId:string)
    {
      return  this.productService.getProductById(Number(productId));
    }

    @Delete(":id")
    deleteProduct(@Param("id") productId:string)
    {
      return  this.productService.deleteProduct(Number(productId));
    }

    @Post()
    createProduct( 
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('quantity') prodQuantity: number,
    )
    {
      return this.productService.createProduct(prodTitle,prodDesc,prodPrice,prodQuantity);
    }

    @Put(":id")
    updateProduct(
    @Param("id") productId:string,    
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('quantity') prodQuantity: number,)
    {
      this.productService.updateProduct(Number(productId),prodTitle,prodDesc,prodPrice,prodQuantity);
    }
}