"use strict"

const axios = require('axios');

export async function httpGet(path: string, param: any){
    return await axios.get(path, {params: {...param}, withCredentials: true});
}

