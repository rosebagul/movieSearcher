<template>
  <MovieNavbar />
  <div class="min-h-screen bg-gray-900 bg-opacity-95 backdrop-blur-md text-white p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">Favourite films</h1>

      <div v-if="favoriteMoviesDetails.length === 0" class="text-center text-gray-400 text-lg">
        You don't have any favorite movies yet. You can visit movie detail pages to add movies to your favorites.
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <div v-for="movie in favoriteMoviesDetails" :key="movie.id"
          class="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <router-link :to="`/movie/${movie.id}`">
            <img :src="movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Poster'
              " :alt="movie.title" class="w-full h-[250px] object-cover" />
            <div class="p-4">
              <h2 class="text-lg font-semibold mb-1 truncate">{{ movie.title }}</h2>
              <p class="text-sm text-gray-400">{{ movie.release_date?.slice(0, 4) || "-" }}</p>
            </div>
          </router-link>
          <button @click="removeFavorite(movie.id)"
            class="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 text-sm transition-colors duration-200">
            Remove from Favorites
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MovieNavbar from '../components/MovieNavbar.vue'; 
import { ref, onMounted } from 'vue';
import axios from 'axios';

const favoriteMovieIds = ref([]); 
const favoriteMoviesDetails = ref([]); 

const API_KEY = "d45ae68b5f4bb70bd69b0d454f6783ff"; 
const MY_API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDVhZTY4YjVmNGJiNzBiZDY5YjBkNDU0ZjY3ODNmZiIsIm5iZiI6MTc0NzU4MTM0Ni41NTQsInN1YiI6IjY4MjlmOWEyMTQ1NDg4OWY0YjhjMDMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bm-oucBYRUwv6YyMZVijSv5NwZ1p-cM0x8I03hUFfss"; // Kendi API token'ın
const BASE_URL = 'https://api.themoviedb.org/3';


const loadFavoriteMovieIds = () => {
  const storedFavorites = localStorage.getItem('favoriteMovies');
  if (storedFavorites) {
    try {
      favoriteMovieIds.value = JSON.parse(storedFavorites);
    } catch (e) {
      console.error("Favori film ID'leri LocalStorage'dan yüklenirken hata:", e);
      favoriteMovieIds.value = [];
    }
  }
};


const fetchFavoriteMovieDetails = async () => {
  favoriteMoviesDetails.value = [];
  for (const id of favoriteMovieIds.value) {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${id}`, {
        params: { api_key: API_KEY, language: 'en-US' },
        headers: { Authorization: `Bearer ${MY_API_TOKEN}` },
      });
      favoriteMoviesDetails.value.push(response.data);
    } catch (error) {
      console.error(`Film ID ${id} detayları çekilirken hata oluştu:`, error);
     
    }
  }
};


const removeFavorite = (movieId) => {
 
  favoriteMovieIds.value = favoriteMovieIds.value.filter(id => id !== movieId);
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovieIds.value));


  favoriteMoviesDetails.value = favoriteMoviesDetails.value.filter(movie => movie.id !== movieId);
  console.log(`Film ID: ${movieId} favorilerden kaldırıldı.`);
};



onMounted(async () => {
  loadFavoriteMovieIds(); 
  await fetchFavoriteMovieDetails(); 
});
</script>