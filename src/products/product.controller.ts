import { Controller, Get } from "@nestjs/common";

@Controller("products")
export class  ProductController
{

    @Get()
    getProducts():any
    {
        return "Test";
    }

}