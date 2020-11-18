import {
    Resolver, 
    Query, 
    Mutation, 
    Arg, 
    Field, 
    InputType,
    Int,
    UseMiddleware,
    Ctx
} from 'type-graphql';

import{Category} from '../entity/Category';
import { isAuth } from "../isAuth";


@InputType()
class CategoryInput{
    @Field()
    name!: string;
}

@Resolver()
export class CategoryResolver{

    @Mutation(() => Category)
    @UseMiddleware(isAuth)
    async createCategory(
       
        @Arg("variables", () => CategoryInput) variables: CategoryInput
    ) {
        const newCategory = Category.create(variables);
        return await newCategory.save();
    }

    @Mutation(()=> Boolean)
    @UseMiddleware(isAuth)
    async deleteCategory(@Arg("id", ()=> Int) id: number)
    {
        await Category.delete(id);
        return true;
    }

    @Mutation(()=> Boolean)
    @UseMiddleware(isAuth)
    async updateCategory(
        @Arg("id", ()=> Int) id: number,
        @Arg("fields", ()=> CategoryInput) fields: CategoryInput)
        {
            await Category.update({id}, fields);
            return true;
    }

    @Query(() => [Category])
    @UseMiddleware(isAuth)
    getCategories() {
        return Category.find();
    }

    @Query(() => Category)
    @UseMiddleware(isAuth)
    async getOneCategory( 
        @Arg("id", ()=> Int) id: number){
         return await Category.findOne(id);   
        }
        
    }
