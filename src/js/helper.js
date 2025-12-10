'use strict';
import axios from 'axios';

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const fetchAPI = async function (url, data = undefined) {
    try {
        if (!data) {
            const response = await axios.get(url);
            return response.data;
        } else {
            const response = await axios.post(url, data);
            return response.data;
        }
    } catch (err) {
        console.error(`❌❌${err}❌❌`);
    }
};
