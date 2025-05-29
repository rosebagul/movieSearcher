// import { ref } from 'vue'
// import axios from 'axios'

// const searchQuery = ref('')
// const movies = ref([])

// const fetchMovies = async () => {
//   try {
//     const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
//       params: {
//         api_key: d45ae68b5f4bb70bd69b0d454f6783ff,
//         query: searchQuery.value
//       }
//     })
//     movies.value = response.data.results
//   } catch (error) {
//     console.error('API error:', error)
//   }
// }
// // console.log(searchQuery.value)       
// // console.log(response.data)     
// // console.log(movies.value) 