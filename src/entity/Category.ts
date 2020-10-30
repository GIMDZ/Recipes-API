// Base
import {
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    // CreateDateColumn, 
    BaseEntity,
    OneToMany} from 'typeorm';    
import {Field, Int, ObjectType} from 'type-graphql';

// Particular
import {Recipe} from './Recipe';

@ObjectType()
@Entity()
export class Category extends BaseEntity {
    
    @Field(()=> Int) //For graphql
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Field(()=> String)
    @Column()
    name!: string;

    // Relations with Recipe: A category can have many recipes
    @Field(()=> [Recipe], {nullable: true})
    @OneToMany(() => Recipe, recipe => recipe.category)
    recipe!: Recipe[];

    // @Field(()=> Int)
    // @Column("int", {default:0})
    // quantity!: number;
    
    // @Field(()=> String)
    // @CreateDateColumn({type: 'timestamp'})
    // createdAt!: string;

}