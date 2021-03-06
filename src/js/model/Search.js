import axios from 'axios';
import { key } from '../config';

export default class Search {

    constructor(query) {
        this.query = query;
    }
    async getResults() {
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        } catch (error) {
            alert("Recipe is not defined");
        }

    }
}



//a6af68bf18f807a782df1d1967d2b92a

//https://www.food2fork.com/api/search