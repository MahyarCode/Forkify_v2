'use strict';
import { fetchSearchData, fetchRecipeData } from '../helper.js';

// TODO Search Result ---------------------------------------------------------

//FIXME first, format the fetch data
const formattedResult = function (nameData) {
    const { recipes } = nameData.data;

    const data = recipes.map(obj => {
        return { id: obj.id, image: obj.image_url, publisher: obj.publisher, title: obj.title };
    });
    return data;
};

const searchValue = document.querySelector('.search__field');

//FIXME it outputs the formatted data from API
export const loadResult = async function () {
    const query = searchValue.value;
    const data = await fetchSearchData(query);
    const outputData = formattedResult(data);
    return outputData;
};

// TODO Present Recipe ---------------------------------------------------------
//FIXME first, format the fetch data
const formattedRecipe = function (nameData) {
    const { recipe } = nameData.data;

    const data = {
        id: recipe.id,
        image: recipe.image_url,
        title: recipe.title,
        publisher: recipe.publisher,
        cookingTime: recipe.cooking_time,
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        source: recipe.source_url,
    };

    return data;
};
//FIXME it outputs the formatted data from API
export const loadRecipe = async function () {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const data = await fetchRecipeData(id);
    const outputData = formattedRecipe(data);
    return outputData;
};
