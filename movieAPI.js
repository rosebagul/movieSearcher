import axios from 'axios'

const API_KEY = 'YOUR_API_KEY' // TheMovieDB'den al
const BASE_URL = 'https://api.themoviedb.org/3'

export const searchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query },
    headers:{ Authorization :`Bearer ${MY_API_TOKEN}`}
  })

  // curl --request GET \
  // --url 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher' \
  // --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDVhZTY4YjVmNGJiNzBiZDY5YjBkNDU0ZjY3ODNmZiIsIm5iZiI6MTc0NzU4MTM0Ni41NTQsInN1YiI6IjY4MjlmOWEyMTQ1NDg4OWY0YjhjMDMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bm-oucBYRUwv6YyMZVijSv5NwZ1p-cM0x8I03hUFfss'
  return response.data.results
}