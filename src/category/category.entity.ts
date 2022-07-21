import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category
{
    @PrimaryGeneratedColumn()
    public id:Number;

    @Column()
    public title:string;
}