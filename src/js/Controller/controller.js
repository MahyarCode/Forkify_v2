'use strict';
import * as model from '../Model/model.js';
import ResultsView from '../View/resultsView.js';
import RecipeView from '../View/recipeView.js';

const controlSearchResult = async function () {
    const query = document.querySelector('.search__field').value;

    if (!query) return;

    console.log(query);

    const data = await model.loadResult(query);

    ResultsView.render(data);
};

const controlShowRecipe = async function () {
    const data = await model.loadRecipe();

    if (!data) return;

    RecipeView.render(data);
};

RecipeView.addHandlerRecipe(controlShowRecipe);
ResultsView.addHandlerSearchResult(controlSearchResult);
