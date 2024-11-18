import axios from 'axios'

/**
 * Creates an axios instance with the base URL set to 'https://rickandmortyapi.com/api'.
 */
export const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api'
})
