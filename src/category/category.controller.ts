import { Controller,Get,Param,Delete,Post,Put,Body } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller("category")
export class CategoryController
{
    constructor(private categoryService:CategoryService){}

    
    @Get()
    async getProducts()
    {
      var resulsts= await this.categoryService.GetAll();
      return  resulsts;
    }

    @Get(":id")
    async getProduct(@Param("id") categoryId:string)
    {
      return await this.categoryService.GetById(categoryId);
    }

    @Delete(":id")
    async deleteProduct(@Param("id") categoryId:string)
    {
      return await this.categoryService.DeleteCategory(categoryId);
    }

    @Post()
    async createProduct( 
    @Body('title') catTitle: string
    )
    {
      return await this.categoryService.CreateCategory(catTitle);
    }

    @Put(":id")
   async updateProduct(
    @Param("id") catId:string,    
    @Body('title') catTitle: string)
    {
       await this.categoryService.UpdateCategory(catId,catTitle);
    }

}