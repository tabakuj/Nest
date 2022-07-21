import { Category } from 'src/category/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public title: string;
 
  @Column()
  public description: string;

  @ManyToOne(()=>Category,(p)=>p.products,{ eager: true })
  public category:Category;
}
 