import Search from "./model/search";
import * as searchView from './view/searchView';
import { elements } from "./view/base";

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

        searchView.clearInput();
        searchView.clearResults();

        await state.search.getResults();

        searchView.renderResults(state.search.result);
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});