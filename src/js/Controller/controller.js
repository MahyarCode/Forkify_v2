'use strict';
import * as model from '../Model/model.js';
import ResultsView from '../View/resultsView.js';
import RecipeView from '../View/recipeView.js';
import Pagination from '../View/paginationView.js';

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

    RecipeView.render(model.state.recipe);
};

RecipeView.addHandlerRecipe(controlShowRecipe);
ResultsView.addHandlerSearchResult(controlSearchResult);
Pagination.addHandlerPagination(controlSearchResult);
