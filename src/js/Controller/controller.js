'use strict';
import * as model from '../Model/model.js';
import ResultsView from '../View/resultsView.js';
import RecipeView from '../View/recipeView.js';
import Pagination from '../View/paginationView.js';
import Bookmark from '../View/bookmarkView.js';
import Servings from '../View/servingsView.js';

const controlSearchResult = async function () {
    const query = document.querySelector('.search__field').value;

    if (!query) return;

    await model.loadResult(query);

    model.resultPagination(model.state.page);

    Pagination.render();

    ResultsView.render(model.state.currentPageResult);
};

const controlShowRecipe = async function () {
    await model.loadRecipe();

    if (!model.state.results) return;
    if (Object.keys(model.state.recipe).length === 0) return;

    RecipeView.render(model.state.recipe);
};

const controlBookmark = function () {
    const recipe = model.state.recipe;

    if (model.state.bookmark.some(el => el.id === recipe.id)) {
        model.deleteBookmark(recipe);
    } else {
        model.addBookmark(recipe);
    }

    Bookmark.render(model.state.bookmark);

    RecipeView.render(model.state.recipe);
};

const controlServings = function (newServing) {
    model.updateServing(model.state.recipe, newServing);

    RecipeView.render(model.state.recipe);
};

const init = function () {
    window.location.hash = '';
    RecipeView.addHandlerRecipe(controlShowRecipe);
    Bookmark.addHandlerBookmark(controlBookmark);
    Servings.addHandlerServing(controlServings);
    ResultsView.addHandlerSearchResult(controlSearchResult);
    Pagination.addHandlerPagination(controlSearchResult);
};
init();
