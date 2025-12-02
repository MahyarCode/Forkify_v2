'use strict';
import * as model from '../Model/model.js';
import { markupSearchResult } from '../View/resultsView.js';
import { markupRecipe } from '../View/recipeView.js';

const searchEl = document.querySelector('.search');
const recipeEl = document.querySelector('.recipe');
const resultRecipe = document.querySelector('.preview');

searchEl.addEventListener('submit', async function (e) {
    e.preventDefault();
    const data = await model.loadResult();
    markupSearchResult(data);
});

window.addEventListener('load', async function (e) {
    e.preventDefault();
    const data = await model.loadRecipe();
    markupRecipe(data);
});

window.addEventListener('hashchange', async function (e) {
    e.preventDefault();
    const data = await model.loadRecipe();
    markupRecipe(data);
});

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
// const fetchRecipeData = async function () {
//     try {
//         const id = window.location.hash.slice(1);
//         console.log(id);
//         const response = await fetch(
//             `https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e86ba`
//         );
//         const data = await response.json();

//         return data;
//     } catch (err) {
//         console.error(err);
//     }
// };

// const aaaa = async function () {
//     const data = await fetchRecipeData();
//     console.log(data);
// };
// aaaa();
