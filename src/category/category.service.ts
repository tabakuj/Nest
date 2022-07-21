import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./category.entity";

@Injectable()
export class CategoryService
{

    constructor(@InjectRepository(Category) private categoryRepository:Repository<Category> ) {
    }

    public async GetAll():Promise<Category[]>
    {
        return await this.categoryRepository.find();
    }
    public async GetById(categoryId:string)
    {
        return await this.GetCategory(categoryId);
    }

    public async CreateCategory(title:string):Promise<Number>
    {
        let createdCategory=this.categoryRepository.create({
            title:title
        });
        await this.categoryRepository.save(createdCategory)
        return createdCategory.id;
    }
    public async UpdateCategory(id:string,title:string)
    {
        await this.categoryRepository.update(id,{title:title});
    }
    public async DeleteCategory(id:string):Promise<void>
    {
     await this.categoryRepository.delete(id);
    }


    private async GetCategory(id:string):Promise<Category>
    {
        var category=await this.categoryRepository
            .createQueryBuilder("category")
            .where("category.id=:catid",{catid:id})
            .getOne();
        return category;
    }
}