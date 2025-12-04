'use strict';
import { fetchAPI } from '../helper.js';
import { API_KEY } from '../config.js';

export const state = {
    recipe: {},
    results: [],
    currentPageResult: [],
    bookmark: [],
    page: 1,
    lastPage: null,
};

// TODO Search Result ---------------------------------------------------------
export const loadResult = async function (query) {
    const fetchData = await fetchAPI(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=${API_KEY}`
    );
    const { recipes } = fetchData.data;

    const data = recipes.map(obj => {
        return {
            id: obj.id,
            image: obj.image_url,
            publisher: obj.publisher,
            title: obj.title,
            ...(obj.key && { key: obj.key }),
        };
    });
    state.results = data;
    console.log(data);
};

// TODO Present Recipe ---------------------------------------------------------
export const loadRecipe = async function () {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const fetchData = await fetchAPI(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${API_KEY}`
    );

    const { recipe } = fetchData.data;

    const data = {
        id: recipe.id,
        image: recipe.image_url,
        title: recipe.title,
        publisher: recipe.publisher,
        cookingTime: recipe.cooking_time,
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        source: recipe.source_url,
        ...(recipe.key && { key: recipe.key }),
    };
    state.recipe = data;
    console.log(data);
    if (state.results.length === 0) return;

    const item = state.results.find(el => el.id === state.recipe.id);
    state.recipe.bookmark = item.bookmark ? true : false;
};

// TODO Pagination ---------------------------------------------------------
export const resultPagination = function (page) {
    const min = (page - 1) * 10;
    const max = page * 10;

    state.lastPage = Math.ceil(state.results.length / 10);
    state.currentPageResult = state.results.slice(min, max);
};

// TODO bookmark ---------------------------------------------------------
export const addBookmark = function (recipe) {
    state.bookmark.push(recipe);

    const bookmarkIndex = state.results.findIndex(el => el.id === recipe.id);
    state.results[bookmarkIndex].bookmark = true;
    state.recipe.bookmark = true;
};

export const deleteBookmark = function (recipe) {
    const itemIndex = state.bookmark.findIndex(el => el.id === recipe.id);
    state.bookmark.splice(itemIndex, 1);

    const bookmarkIndex = state.results.findIndex(el => el.id === recipe.id);
    delete state.results[bookmarkIndex].bookmark;
    state.recipe.bookmark = false;
};

// TODO servings ---------------------------------------------------------
export const updateServing = function (recipe, newServing) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * (newServing / recipe.servings);
    });

    recipe.servings = newServing;
};
