// const BASE_URL = 'http://opt.uvigo.es'
const BASE_URL = 'http://localhost:5000'

/**
 * @param {string[][]} arr
 * @returns {object}
 */
const parse_json = (arr) => arr.map(el => el.map(data => JSON.parse(data)))

export const apiService = {
    getResults: async () => parse_json(await fetch(`${BASE_URL}/results`).then(res => res.json())),
    getReal: async () => parse_json(await fetch(`${BASE_URL}/real`).then(res => res.json())),
    getInput: async () => parse_json(await fetch(`${BASE_URL}/input`).then(res => res.json())),
}