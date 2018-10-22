import axios from 'axios';
import { key } from '../config';

export default class Recipe {

    constructor(id) {
        this.id = id;
    }
    async getRecipe() {
        try {
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            console.log("Something went Wrong");
        }

    }

    calcTime() {
        const numIngredients = this.ingredients.length;
        const periods = Math.ceil(numIngredients / 3);

        return 15 * periods;
    }

    calcServings() {
        this.servings = 4;
    }



    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {
            let ingredient = el.toLowerCase();

            unitsLong.forEach((unit, i) => {
                ingredient = el.replace(unit, unitsShort[i]);
                console.log(unit, ingredient);
            });

            ingredient = ingredient.replace(/\(.*\)/, '');

            return ingredient;
        });

        this.ingredients = newIngredients
    }


}



//a6af68bf18f807a782df1d1967d2b92a

//https://www.food2fork.com/api/search