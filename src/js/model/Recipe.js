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

        this.time = 15 * periods;
    }

    calcServings() {
        this.servings = 4;
    }



    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'g', 'kg'];

        const newIngredients = this.ingredients.map(el => {
            let ingredient = el.toLowerCase();

            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]).replace('  ', ' ');
            });

            ingredient = ingredient.replace(/\(.*\)/, ' ');

            const ingArr = ingredient.split(' ').filter(el => el !== '');
            const unitIndex = ingArr.findIndex(el2 => units.includes(el2));

            let objIng = {
                count: 1,
                unit: '',
                ingredient
            };

            if (unitIndex > -1) {
                const arrCount = ingArr.slice(0, unitIndex);
                let count;
                if (arrCount.length === 1) {
                    count = eval(ingArr[0].replace('-', '+'));
                } else {
                    count = eval(arrCount.join('+'))
                }

                objIng = {
                    count: count,
                    unit: ingArr[unitIndex],
                    ingredient: ingArr.slice(unitIndex + 1).join(' ')
                }

            } else if (parseInt(ingArr, 10)) {
                objIng = {
                    count: parseInt(ingArr, 10),
                    unit: '',
                    ingredient: ingArr.slice(1).join(' ')
                }
            }

            return objIng;
        });

        this.ingredients = newIngredients
    }


}

//a6af68bf18f807a782df1d1967d2b92a
//https://www.food2fork.com/api/search