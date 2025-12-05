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
    searchQuery: '',
};

// TODO Search Result ---------------------------------------------------------
export const loadResult = async function (query) {
    state.searchQuery = query;
    const fetchData = await fetchAPI(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${state.searchQuery}&key=${API_KEY}`
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
};

// TODO Load Recipe ---------------------------------------------------------
const createRecipe = function (fetchedRecipe) {
    return {
        id: fetchedRecipe.id,
        image: fetchedRecipe.image_url,
        title: fetchedRecipe.title,
        publisher: fetchedRecipe.publisher,
        cookingTime: fetchedRecipe.cooking_time,
        servings: fetchedRecipe.servings,
        ingredients: fetchedRecipe.ingredients,
        source: fetchedRecipe.source_url,
        ...(fetchedRecipe.key && { key: fetchedRecipe.key }),
    };
};

export const loadRecipe = async function () {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const fetchData = await fetchAPI(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${API_KEY}`
    );

    const { recipe } = fetchData.data;

    const data = createRecipe(recipe);
    state.recipe = data;

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

    localStorage.setItem('bookmarks', JSON.stringify(state.bookmark));
};

export const deleteBookmark = function (recipe) {
    const itemIndex = state.bookmark.findIndex(el => el.id === recipe.id);
    state.bookmark.splice(itemIndex, 1);

    const bookmarkIndex = state.results.findIndex(el => el.id === recipe.id);

    delete state.results[bookmarkIndex].bookmark;

    state.recipe.bookmark = false;

    localStorage.setItem('bookmarks', JSON.stringify(state.bookmark));
};

// TODO servings ---------------------------------------------------------
export const updateServing = function (recipe, newServing) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * (newServing / recipe.servings);
    });

    recipe.servings = newServing;
};

// TODO Change data For PostRecipe ---------------------------------------------------------
export const changeData = function (form) {
    const ingredientForm = Object.entries(form).filter(
        el => el[0].includes('ingredient') && el[1] !== ''
    );

    const ingredients = ingredientForm.map(el => {
        const ing = el[1].split(',');
        return { quantity: ing[0], unit: ing[1], description: ing[2] };
    });

    const newData = {
        image_url: form.image,
        title: form.title,
        publisher: form.publisher,
        cooking_time: form.cookingTime,
        servings: form.servings,
        source_url: form.sourceUrl,
        ingredients,
    };

    return newData;
};

export const sendRecipe = async function (sendData) {
    const apiUrl = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${state.searchQuery}&key=${API_KEY}`; // Replace with your API endpoint
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
    };

    const sentData = await fetch(apiUrl, requestOptions);
    const userData = await sentData.json();

    userData.data.recipe.bookmark = true;

    state.recipe = createRecipe(userData.data.recipe);
    state.results.unshift(userData.data.recipe);
};
