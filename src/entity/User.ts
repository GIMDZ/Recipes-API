import {
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    // CreateDateColumn, 
    BaseEntity,
    OneToMany} from 'typeorm';    
import {Field, Int, ObjectType} from 'type-graphql';

import {Recipe} from './Recipe';

@ObjectType()
@Entity()
export class User extends BaseEntity {
    
    @Field(()=> Int) //For graphql
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Field()
    @Column()
    name!: string;

    @Field()
    @Column()
    email!: string;

    @Field()
    @Column()
    password!: string;
    
    // Relation with Recipes: One user has many recipes
    @Field(() => [Recipe])
    @OneToMany(() => Recipe, recipe => recipe.user)
    recipe!: Recipe[];

    // @Field(() => String)
    // @CreateDateColumn({ type: 'timestamp' })
    // createdAt!: string;
    
    

}