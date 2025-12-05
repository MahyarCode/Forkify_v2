'use strict';
import * as model from '../Model/model.js';
import ResultsView from '../View/resultsView.js';
import RecipeView from '../View/recipeView.js';
import Pagination from '../View/paginationView.js';
import Bookmark from '../View/bookmarkView.js';
import Servings from '../View/servingsView.js';
import PostRecipe from '../View/postRecipe.js';

const controlSearchResult = async function () {
    const query = document.querySelector('.search__field').value;

    if (!query) return;

    ResultsView.renderSpinner();

    await model.loadResult(query);

    model.resultPagination(model.state.page);

    Pagination.render();

    ResultsView.render(model.state.currentPageResult);
};

const controlShowRecipe = async function () {
    if (window.location.hash) {
        RecipeView.renderSpinner();
    }

    await model.loadRecipe();

    setTimeout(() => {
        if (!model.state.results) return;
        if (Object.keys(model.state.recipe).length === 0) return;

        RecipeView.render(model.state.recipe);
    }, 350);
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

const controlLoadBookmark = function () {
    const storage = localStorage.getItem('bookmarks');
    if (storage) model.state.bookmark = JSON.parse(storage);

    Bookmark.render(model.state.bookmark);
};

const controlServings = function (newServing) {
    model.updateServing(model.state.recipe, newServing);

    RecipeView.render(model.state.recipe);
};

const controlPostRecipe = async function (inputForm) {
    const postData = model.changeData(inputForm);

    await model.sendRecipe(postData);

    model.addBookmark(model.state.recipe);
    Bookmark.render(model.state.bookmark);

    RecipeView.render(model.state.recipe);

    model.resultPagination(model.state.page);

    Pagination.render();

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    PostRecipe.toggleModal();
};

const init = function () {
    window.location.hash = '';
    RecipeView.addHandlerRecipe(controlShowRecipe);
    Bookmark.addHandlerBookmark(controlBookmark);
    Bookmark.addHandlerLoadBookmark(controlLoadBookmark);
    Servings.addHandlerServing(controlServings);
    ResultsView.addHandlerSearchResult(controlSearchResult);
    Pagination.addHandlerPagination(controlSearchResult);
    PostRecipe.addUploadRecipeHandler(controlPostRecipe);
};
init();
