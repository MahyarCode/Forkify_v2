'use strict';
import { fetchAPI } from '../helper.js';

// TODO Search Result ---------------------------------------------------------
export const loadResult = async function (query) {
    const fetchData = await fetchAPI(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
    );
    const { recipes } = fetchData.data;

    const data = recipes.map(obj => {
        return { id: obj.id, image: obj.image_url, publisher: obj.publisher, title: obj.title };
    });
    return data;
};

// TODO Present Recipe ---------------------------------------------------------
export const loadRecipe = async function () {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const fetchData = await fetchAPI(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);

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
    };

    return data;
};
