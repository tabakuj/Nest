import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public title: string;
 
  @Column()
  public description: string;
}
 