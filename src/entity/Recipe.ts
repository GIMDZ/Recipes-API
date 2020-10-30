// Base
import {
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    // CreateDateColumn, 
    BaseEntity,
    ManyToOne} from 'typeorm';    
import {Field, Int, ObjectType} from 'type-graphql';

// Particular
import {Category} from './Category';
import {User} from './User';

@ObjectType()
@Entity()
export class Recipe extends BaseEntity {
    
    @Field(()=> Int) //For graphql
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Field(()=> String)
    @Column()
    name!: string;

    @Field(()=> String)
    @Column()
    description!: string;

    @Field(()=> String)
    @Column()
    ingredients!: string;
    
    // Relations with Category: A category has many recipes
    @Field(() => User, {nullable: true})   
    @ManyToOne(() => Category, category => category.recipe)
    category!: Category;

    // Relations with User: An user has many recipes 
    @Field(() => Category, {nullable: true})
    @ManyToOne(() => User, user => user.recipe)
    user!: User;

    // @Field(()=> Int)
    // @Column("int", {default:0})
    // quantity!: number;
    
    // @Field(()=> String)
    // @CreateDateColumn({type: 'timestamp'})
    // createdAt!: string;

}