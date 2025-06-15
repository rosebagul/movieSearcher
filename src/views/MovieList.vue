<template>
  <MovieNavbar/>
  <div v-if="loading" class="loading">Loading...</div>

  <div class="bg-gray-900 bg-opacity-95 backdrop-blur-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
    <div
      v-for="(item, index) in movies"
      :key="index"
      class="relative bg-gray-100 rounded-2xl shadow-md overflow-hidden hover:scale-110 transition-transform duration-300"
    >
      <div v-if="isFavorite(item.id)" class="absolute top-2 right-2 text-red-500 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <router-link :to="{ name: 'film', params: { id: item.id } }" class="hover:text-red-800">
        <img :src="getPoster(item)" alt="Poster" class="w-full h-[200px] object-cover" />
        <div class="p-4">
          <h2 class="text-lg font-semibold text-gray-900 mb-2">
            {{ item.title }}
          </h2>
        </div>
      </router-link>
    </div>
  </div>

  <div v-if="loading" class="loading animation s">Loading...</div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount,onUnmounted, watch} from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import MovieNavbar from '../components/MovieNavbar.vue'
const route = useRoute()
const movies = ref([])
const page = ref(1)
const totalPages = ref(1)
const query = ref('')
const loading = ref(false)
const error = ref(null)
const favoriteMovieIds = ref([]); 
const API_KEY = "d45ae68b5f4bb70bd69b0d454f6783ff"


const fetchMovies = async () => {
  if (loading.value || page.value > totalPages.value || !query.value) return
  loading.value = true
  error.value = null

  try {
    const { data } = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: API_KEY,
        query: query.value,
        page: page.value
      }
    })

    if (page.value === 1 && data.results.length === 0) {
      movies.value = []
      totalPages.value = 1
    } else {
      movies.value.push(...data.results)
      totalPages.value = data.total_pages
      page.value++
    }
  } catch (err) {
    error.value = 'Film verileri alınamadı.'
    console.error(err)
  } finally {
    loading.value = false
  }
}
function getPoster(item) {
  return item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Film_reel.svg/1054px-Film_reel.svg.png'
}

const loadFavoriteMovieIds = () => {
  const storedFavorites = localStorage.getItem('favoriteMovies');
  if (storedFavorites) {
    try {
      favoriteMovieIds.value = JSON.parse(storedFavorites);
    } catch (e) {
      console.error("Favori ID'ler yüklenirken hata:", e);
      favoriteMovieIds.value = [];
    }
  } else {
    favoriteMovieIds.value = [];
  }
};


const isFavorite = (movieId) => {
 
  if (typeof movieId !== 'number' && typeof movieId !== 'string') {
    return false;
  }
  return favoriteMovieIds.value.includes(Number(movieId)); 
};


const handleStorageChange = () => {
  loadFavoriteMovieIds(); 
};


watch(
  () => route.query.search,
  async (newSearch) => {
    if (newSearch && newSearch.trim() !== '') {
      query.value = newSearch  
      page.value = 1
      movies.value = []
      await fetchMovies()
    } else {
      movies.value = []
    }
  },
  { immediate: true }
)

const handleScroll = () => {
  const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
  if (scrollBottom) {
    fetchMovies()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  loadFavoriteMovieIds();
  window.addEventListener('storage', handleStorageChange);
})
onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange);
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>


<style scoped>
.movie-item {
  margin-bottom: 10px;
}
.loading {
  text-align: center;
  margin-top: 20px;
}
</style>