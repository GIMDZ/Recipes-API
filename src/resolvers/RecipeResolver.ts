import {
    Resolver, 
    Query, 
    Mutation, 
    Arg, 
    Field, 
    InputType,
    UseMiddleware,
    Int} from 'type-graphql';

import{Recipe} from '../entity/Recipe';
import{Category} from '../entity/Category';
import { User } from '../entity/User'
import { isAuth } from "../isAuth";
import { MyContext } from "../MyContext";

@InputType()
class RecipeInput{
    
    @Field()
    name!: string;
    @Field()
    description!: string;
    @Field()
    ingredients!: string;
    @Field()
    category!: string;
}

@InputType()
class RecipeUpdateInput {
  @Field(() => String, {nullable: true})
  name?: string;

  @Field(() => String, {nullable: true})
  description?: string;

  @Field(() => String, {nullable: true})
  ingredients?: string;

  @Field(() => String, {nullable: true})
  category?: string;

}

@Resolver()
export class RecipeResolver{

    @Mutation(() => Recipe)
    @UseMiddleware(isAuth)
    async createRecipe(
        
        @Arg("variables", () => RecipeInput) variables: RecipeInput
    ) {
        const newRecipe = Recipe.create(variables);
        return await newRecipe.save();
    }

    @Mutation(()=> Boolean)
    async deleteRecipe(@Arg("id", ()=> Int) id: number)
    {
        await Recipe.delete(id);
        return true;
    }

    @Mutation(()=> Boolean)
    async updateRecipe(
        @Arg("id", ()=> Int) id: number,
        @Arg("fields", ()=> RecipeUpdateInput) fields: RecipeUpdateInput)
        {
            await Recipe.update({id}, fields);
            return true;
    }

    @Query(() => [Recipe])
    getRecipes() {
        return Recipe.find();
    }

    @Query(() => Recipe)
    async getOneRecipe( 
        @Arg("id", ()=> Int) id: number){
         return await Recipe.findOne(id);   
        }
        

}