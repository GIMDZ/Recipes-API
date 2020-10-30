import {
    Resolver, 
    Query, 
    Mutation, 
    Arg, 
    Field, 
    InputType,
    Int,
    Ctx
} from 'type-graphql';

import{Category} from '../entity/Category';

@InputType()
class CategoryInput{
    @Field()
    name!: string;
}

@Resolver()
export class CategoryResolver{

    @Mutation(() => Category)
    async createCategory(
       
        @Arg("variables", () => CategoryInput) variables: CategoryInput
    ) {
        const newCategory = Category.create(variables);
        return await newCategory.save();
    }

    @Mutation(()=> Boolean)
    async deleteCategory(@Arg("id", ()=> Int) id: number)
    {
        await Category.delete(id);
        return true;
    }

    @Mutation(()=> Boolean)
    async updateCategory(
        @Arg("id", ()=> Int) id: number,
        @Arg("fields", ()=> CategoryInput) fields: CategoryInput)
        {
            await Category.update({id}, fields);
            return true;
    }

    @Query(() => [Category])
    getCategories() {
        return Category.find();
    }

    @Query(() => Category)
    async getOneCategory( 
        @Arg("id", ()=> Int) id: number){
         return await Category.findOne(id);   
        }
        
    }
