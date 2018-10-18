import Search from "./model/search";
import * as searchView from './view/searchView';
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

        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        await state.search.getResults();

        clearLoader();
        searchView.renderResults(state.search.result);
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