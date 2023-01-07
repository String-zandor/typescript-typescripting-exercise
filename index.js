"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveZeroes = exports.changeItUp = exports.isValidISBN = exports.displayList = exports.searchAndView = exports.addCity = void 0;
const addCity = (cityName, country, population) => {
    let cities;
    let city = {
        cityName: cityName,
        country: country,
        population: population
    };
    let rawList = localStorage.getItem('list');
    if (!rawList) {
        cities = [];
        localStorage.setItem('list', JSON.stringify(cities));
    }
    else {
        cities = JSON.parse(rawList);
    }
    cities.push(city);
    localStorage.setItem('list', JSON.stringify(cities));
    searchAndView();
};
exports.addCity = addCity;
function searchAndView(input = '') {
    input = input.toLowerCase();
    let cities;
    let ul = document === null || document === void 0 ? void 0 : document.getElementById('city-directory');
    let rawList = localStorage.getItem('list');
    removeCurrentDisplay(ul);
    if (rawList) {
        cities = JSON.parse(rawList);
        let results = cities.filter(city => (city.cityName.toLowerCase().indexOf(input) >= 0)
            || (city.country.toLowerCase().indexOf(input) >= 0));
        displayList(results, ul, true);
    }
    else {
        cities = [];
        displayList(cities, ul, true);
    }
}
exports.searchAndView = searchAndView;
const formatter = new Intl.NumberFormat();
function displayList(cities, parent, fromSearch) {
    if (cities.length > 0) {
        for (let city of cities) {
            let li = document.createElement('li');
            let outputLine = `${city.cityName}, ${city.country} (Population: ${formatter.format(city.population)})`;
            li.innerText = outputLine;
            parent === null || parent === void 0 ? void 0 : parent.appendChild(li);
        }
    }
    else {
        let p = document.createElement('p');
        p.innerText = (fromSearch) ? 'No cities match your search' : 'No cities in directory';
        parent === null || parent === void 0 ? void 0 : parent.appendChild(p);
    }
}
exports.displayList = displayList;
function removeCurrentDisplay(parent) {
    while ((parent === null || parent === void 0 ? void 0 : parent.hasChildNodes()) && parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
const isValidISBN = (input) => {
    input = input.toLowerCase();
    if (input.length != 10) {
        return false;
    }
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        let a = input.charAt(i);
        let b = ((i === input.length - 1) && (a === 'x')) ? 10 : Number.parseInt(a);
        if (isNaN(b)) {
            return false;
        }
        sum += b * (i + 1);
    }
    return (sum % 11 === 0);
};
exports.isValidISBN = isValidISBN;
console.log("isValidISBN result: " + (0, exports.isValidISBN)('048665088X'));
const changeItUp = (input) => {
    input = input.toLowerCase();
    let result = '';
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < input.length; i++) {
        let index = alphabet.indexOf(input.charAt(i));
        let newIndex = (index === alphabet.length - 1) ? 0 : index + 1;
        let letter = (index < 0) ? input.charAt(i) : changeVowels(alphabet.charAt(newIndex));
        result = result.concat(letter);
    }
    return result;
};
exports.changeItUp = changeItUp;
function changeVowels(letter) {
    const vowels = 'aeiou';
    if (vowels.indexOf(letter) >= 0) {
        letter = letter.toUpperCase();
    }
    return letter;
}
console.log(`changeItUp result: ${(0, exports.changeItUp)('ZANDOR130')}`);
const moveZeroes = (input) => {
    let zeroes = [];
    for (let i = 0; i < input.length; i++) {
        if (input[i] === 0) {
            zeroes.push(input[i]);
            input.splice(i, 1);
        }
    }
    return input.concat(zeroes);
};
exports.moveZeroes = moveZeroes;
let test = [false, 1, 0, 1, 2, 0, 1, 3, 'a'];
console.log(`moveZeroes result: ${(0, exports.moveZeroes)(test)}`);
