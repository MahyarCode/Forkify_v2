'use strict';

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const fetchSearchData = async function (query) {
    try {
        const response = await fetch(
            `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
        );
        const data = await response.json();

        return data;
    } catch (err) {
        console.error(err);
    }
};

export const fetchRecipeData = async function (id) {
    try {
        if (!id) return;
        const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
};
