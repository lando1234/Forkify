import Search from "./model/search";
import Recipe from "./model/Recipe";
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import { elements, renderLoader, clearLoader } from "./view/base";

/** Global Stage of the app
 * - Search Object
 * - Current recipe object
 * - Shopping list Object
 * - Liked recipes
 */

const state = {};


const controlSearch = async() => {
    const query = searchView.getInput();

    if (query) {
        state.search = new Search(query);
        try {

            searchView.clearInput();
            searchView.clearResults();
            renderLoader(elements.searchRes);
            await state.search.getResults();

            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Error getting recipes');
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', event => {
    const element = event.target.closest('.btn-inline');
    if (element) {
        const goto = parseInt(element.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goto);

    }
});

/**
 * RECIPE CONTROLLER
 * */

const controlRecipe = async() => {
    const id = window.location.hash.replace('#', '');



    if (id) {
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        if (state.search) {
            searchView.highlightSelected(id);
        }

        state.recipe = new Recipe(id);

        try {
            await state.recipe.getRecipe();

            state.recipe.calcTime();
            state.recipe.calcServings();
            state.recipe.parseIngredients();

            console.log(state.recipe);

            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (err) {
            console.log(err)
                //alert("Error Processing Recipe");
        }
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));