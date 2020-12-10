import {
    Resolver, 
    Query, 
    Mutation, 
    Arg, 
    Field, 
    InputType,
    UseMiddleware,
    Ctx,
    Int} from 'type-graphql';
import { getRepository } from 'typeorm';
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
        
        @Arg("variables", () => RecipeInput) variables: RecipeInput,
        @Ctx() {payload}: MyContext,
        ){

             
                try {
                    let category = await Category.findOne({ name: variables.category });
                    if (!category) {
                        Category.name
                        const newCategory = Category.create({ name: variables.category });
                        category = await newCategory.save();
    
                    }

                    const user = await User.findOne(payload!.userId);
                    if (!user) {
                    return null;
                    }

                if(user && category) {
                    const newRecipe = Recipe.create({
                        name: variables.name,
                        description: variables.description,
                        ingredients: variables.ingredients,
                        user,
                        category
                    });
                    return await newRecipe.save();
                }

                } catch (err) {
                    console.log(err);
                }
            
                
        /*const newRecipe = this.getRepository.create(variables);
         return await newRecipe.save();*/ //This didn't work as expected
    }

    @Mutation(()=> Boolean)
    @UseMiddleware(isAuth)

    async deleteRecipe(@Arg("id", ()=> Int) id: number)
    {
        await Recipe.delete(id);
        return 'Recipe Deleted';
    }

    @Mutation(()=> Boolean)
    @UseMiddleware(isAuth)
    async updateRecipe(
        @Arg("id", ()=> Int) id: number,
        @Arg("fields", ()=> RecipeUpdateInput) fields: RecipeUpdateInput)
        {
            try {await Recipe.update({id}, ({
                name: fields.name,
                description: fields.description,
                ingredients: fields.ingredients,
                
            }));
            return true;}
            catch (err) {
                console.log(err);
                return false;
            }
    }

    @Query(() => [Recipe])
    @UseMiddleware(isAuth)
    async getRecipes() {
        const recipeRepository = getRepository(Recipe)
        try{
            const recipe = await recipeRepository.find({
            relations: ['user', 'category']
        })
        return recipe;
       }catch (err) {
        console.log(err);
        return null;
      }
    }

    @Query(() => Recipe)
    @UseMiddleware(isAuth)
    async getOneRecipe( 
        @Arg("id", ()=> Int) id: number){
         try{
             return await Recipe.findOne({ id }, { relations: ['user','category'] });
        }
        catch (err) {
            console.log(err);
            return null;
          }
    }

    
    @Query(() => [Recipe], { nullable: true })
    @UseMiddleware(isAuth)
    async getMyRecipes(@Ctx() { payload }: MyContext) {
          const user = await User.findOne(payload!.userId);
      
          if (!user) {
            return null;
          }
      
          const recipes = await Recipe.find({
            where: { user },
            relations: ['user','category'],
          });
      
          return recipes;
        }
    
        
    

}