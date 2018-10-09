import axios from 'axios';

async function getResults(query) {
    const key = 'a6af68bf18f807a782df1d1967d2b92a';
    try {
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
        const recipe = res.data;
        console.log(recipe);
    } catch (error) {
        alert("error");
    }

}
getResults('pizza');

//a6af68bf18f807a782df1d1967d2b92a

//https://www.food2fork.com/api/search