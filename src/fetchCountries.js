export function fetchCountries(countryName) {
    const BASE_URL = `https://restcountries.com/v3.1/name/`;
    return fetch(`${BASE_URL}/${countryName}?fields=name,capital,population,flags,languages`)
    .then(responce => {
        if (!responce.ok) {
            throw new Error('Oops, there is no country with that name')
        }
        return responce.json();
    })
}