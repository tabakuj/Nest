import { Product } from "src/products/product.entity";
import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from "typeorm";

@Entity()
export class Category
{
    @PrimaryGeneratedColumn()
    public id:Number;

    @Column()
    public title:string;

    @OneToMany(type => Product, post => post.category)
    products: Product[]
}