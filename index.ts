type City = {
    cityName: string,
    country: string,
    population: number,
}

export const addCity = (cityName: string, country: string, population: number): void => {
    let cities: City[];

    let city: City = {
        cityName: cityName,
        country: country,
        population: population
    }

    let rawList: string | null = localStorage.getItem('list');
    if (!rawList) {
        cities = [];
        localStorage.setItem('list', JSON.stringify(cities));
    } else {
        cities = JSON.parse(rawList);
    }

    cities.push(city);
    localStorage.setItem('list', JSON.stringify(cities));

    searchAndView();
}

export function searchAndView(input: string = '') : void{
    input = input.toLowerCase();
    let cities: City[];
    let ul = document?.getElementById('city-directory');
    let rawList: string | null = localStorage.getItem('list');

    removeCurrentDisplay(ul);

    if (rawList) {
        cities = JSON.parse(rawList);
        let results = cities.filter(city => (city.cityName.toLowerCase().indexOf(input) >= 0)
            || (city.country.toLowerCase().indexOf(input) >= 0));

        displayList(results, ul, true);
    } else {
        cities = [];
        displayList(cities,ul,true);
    }
}

const formatter = new Intl.NumberFormat();

export function displayList(cities: City[], parent: HTMLElement | null, fromSearch: boolean): void {
    if(cities.length > 0) {
        for (let city of cities) {
            let li = document.createElement('li');
            let outputLine: string = `${city.cityName}, ${city.country} (Population: ${formatter.format(city.population)})`;
            li.innerText = outputLine;
            parent?.appendChild(li);
        }
    } else {
        let p = document.createElement('p');
        p.innerText = (fromSearch) ? 'No cities match your search' : 'No cities in directory';
        parent?.appendChild(p);
    }
}

function removeCurrentDisplay(parent : HTMLElement | null): void {
    while (parent?.hasChildNodes() && parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export const isValidISBN = (input: string): boolean => {
    input = input.toLowerCase();
    if (input.length != 10) {
        return false;
    }

    let sum: number = 0;

    for (let i = 0; i < input.length; i++) {
        let a: string = input.charAt(i);
        let b: number = ((i === input.length - 1) && (a === 'x')) ? 10 : Number.parseInt(a);

        if (isNaN(b)) {
            return false;
        }

        sum += b * (i + 1);
    }
    return (sum % 11 === 0);
}

console.log("isValidISBN result: " + isValidISBN('048665088X'));

export const changeItUp = (input: string): string => {
    input = input.toLowerCase();
    let result: string = '';
    const alphabet: string = 'abcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < input.length; i++) {
        let index: number = alphabet.indexOf(input.charAt(i));
        let newIndex: number = (index === alphabet.length - 1) ? 0 : index + 1;
        let letter: string = (index < 0) ? input.charAt(i) : changeVowels(alphabet.charAt(newIndex));
        result = result.concat(letter);
    }

    return result;
}

function changeVowels(letter: string): string {
    const vowels: string = 'aeiou';
    if (vowels.indexOf(letter) >= 0) {
        letter = letter.toUpperCase();
    }
    return letter;
}

console.log(`changeItUp result: ${changeItUp('ZANDOR130')}`);

export const moveZeroes = (input: any[]): any[] => {
    let zeroes: number[] = [];
    for (let i = 0; i < input.length; i++) {
        if (input[i] === 0) {
            zeroes.push(input[i]);
            input.splice(i, 1);
        }
    }
    return input.concat(zeroes);
}

let test: any[] = [false, 1, 0, 1, 2, 0, 1, 3, 'a'];
console.log(`moveZeroes result: ${moveZeroes(test)}`);


