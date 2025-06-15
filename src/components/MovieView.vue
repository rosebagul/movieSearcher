<template>
      
    <div class="min-h-screen bg-gray-900 text-white py-8">
      <div class="max-w-7xl mx-auto px-4">
  
        <section class="mb-12">
          <h2 class="text-3xl font-bold mb-6">Popular Movies</h2>
          <div v-if="popularMoviesLoading" class="text-center text-gray-400">Loading...</div>
          <div v-else-if="popularMoviesError" class="text-center text-red-500">{{ popularMoviesError }}</div>
          <div v-else>
            <swiper
              :modules="modules"
              :slides-per-view="slidesPerView"
              :space-between="15"
              :mousewheel="true"
              :navigation="true"
              :breakpoints="swiperBreakpoints"
              class="mySwiper"
            >
              <swiper-slide v-for="movie in popularMovies" :key="movie.id">
                <MovieCard :movie="movie" :is-favorite="isFavorite(movie.id)" />
              </swiper-slide>
            </swiper>
          </div>
        </section>
  
        <section class="mb-12">
          <h2 class="text-3xl font-bold mb-6">Trend Movies (This week)</h2>
          <div v-if="trendingMoviesLoading" class="text-center text-gray-400">Loading...</div>
          <div v-else-if="trendingMoviesError" class="text-center text-red-500">{{ trendingMoviesError }}</div>
          <div v-else>
            <swiper
              :modules="modules"
              :slides-per-view="slidesPerView"
              :space-between="15"
              :mousewheel="true"
              :navigation="true"
              :breakpoints="swiperBreakpoints"
              class="mySwiper"
            >
              <swiper-slide v-for="movie in trendingMovies" :key="movie.id">
                <MovieCard :movie="movie" :is-favorite="isFavorite(movie.id)" />
              </swiper-slide>
            </swiper>
          </div>
        </section>
  
        <section class="mb-12">
          <h2 class="text-3xl font-bold mb-6">Upcoming Movies</h2>
          <div v-if="upcomingMoviesLoading" class="text-center text-gray-400">Loading...</div>
          <div v-else-if="upcomingMoviesError" class="text-center text-red-500">{{ upcomingMoviesError }}</div>
          <div v-else>
            <swiper
              :modules="modules"
              :slides-per-view="slidesPerView"
              :space-between="15"
              :mousewheel="true"
              :navigation="true"
              :breakpoints="swiperBreakpoints"
              class="mySwiper"
            >
              <swiper-slide v-for="movie in upcomingMovies" :key="movie.id">
                <MovieCard :movie="movie" :is-favorite="isFavorite(movie.id)" />
              </swiper-slide>
            </swiper>
          </div>
        </section>
  
        <section>
          <h2 class="text-3xl font-bold mb-6">Discover Movies</h2>
          <div v-if="discoverMoviesLoading" class="text-center text-gray-400">Loading...</div>
          <div v-else-if="discoverMoviesError" class="text-center text-red-500">{{ discoverMoviesError }}</div>
          <div v-else>
            <swiper
              :modules="modules"
              :slides-per-view="slidesPerView"
              :space-between="15"
              :mousewheel="true"
              :navigation="true"
              :breakpoints="swiperBreakpoints"
              class="mySwiper"
            >
              <swiper-slide v-for="movie in discoverMovies" :key="movie.id">
                <MovieCard :movie="movie" :is-favorite="isFavorite(movie.id)" />
              </swiper-slide>
            </swiper>
          </div>
        </section>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import MovieNavbar from '../components/MovieNavbar.vue';
  import MovieCard from '../components/MovieCard.vue';
  import { ref, onMounted, onUnmounted } from 'vue';
  import axios from 'axios';
  

  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  
  const modules = [Navigation, Mousewheel, Pagination]; 
  const API_KEY = "d45ae68b5f4bb70bd69b0d454f6783ff";
  const MY_API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDVhZTY4YjVmNGJiNzBiZDY5YjBkNDU0ZjY3ODNmZiIsIm5iZiI6MTc0NzU4MTM0Ni41NTQsInN1YiI6IjY4MjlmOWEyMTQ0ODg5ZjRiOGMwMzAwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bm-oucBYRUwv6YyMZVijSv5NwZ1p-cM0x8I03hUFfss";
  const BASE_URL = 'https://api.themoviedb.org/3';
  

  const popularMovies = ref([]);
  const trendingMovies = ref([]);
  const upcomingMovies = ref([]);
  const discoverMovies = ref([]); 
  

  const popularMoviesLoading = ref(true);
  const trendingMoviesLoading = ref(true);
  const upcomingMoviesLoading = ref(true);
  const discoverMoviesLoading = ref(true);
  
  const popularMoviesError = ref(null);
  const trendingMoviesError = ref(null);
  const upcomingMoviesError = ref(null);
  const discoverMoviesError = ref(null);
  
  const favoriteMovieIds = ref([]); 
  
 
  const swiperBreakpoints = {
    320: { slidesPerView: 2, spaceBetween: 10 },
    640: { slidesPerView: 3, spaceBetween: 15 },
    768: { slidesPerView: 4, spaceBetween: 15 },
    1024: { slidesPerView: 5, spaceBetween: 15 },
    1280: { slidesPerView: 6, spaceBetween: 15 },
  };

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
    return favoriteMovieIds.value.includes(Number(movieId));
  };
  
  const handleStorageChange = () => {
    loadFavoriteMovieIds();
  };

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: { api_key: API_KEY, language: 'en-US', page: 1 },
        headers: { Authorization: `Bearer ${MY_API_TOKEN}` },
      });
      popularMovies.value = response.data.results;
    } catch (err) {
      console.error("Popüler filmler çekilirken hata:", err);
      popularMoviesError.value = "Popüler filmler yüklenemedi.";
    } finally {
      popularMoviesLoading.value = false;
    }
  };
  
  const fetchTrendingMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/trending/movie/week`, { 
        params: { api_key: API_KEY, language: 'en-US' },
        headers: { Authorization: `Bearer ${MY_API_TOKEN}` },
      });
      trendingMovies.value = response.data.results;
    } catch (err) {
      console.error("Trend filmler çekilirken hata:", err);
      trendingMoviesError.value = "Trend filmler yüklenemedi.";
    } finally {
      trendingMoviesLoading.value = false;
    }
  };
  
  const fetchUpcomingMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
        params: { api_key: API_KEY, language: 'en-US', page: 1 },
        headers: { Authorization: `Bearer ${MY_API_TOKEN}` },
      });
      upcomingMovies.value = response.data.results;
    } catch (err) {
      console.error("Yakında çıkacak filmler çekilirken hata:", err);
      upcomingMoviesError.value = "Yakında çıkacak filmler yüklenemedi.";
    } finally {
      upcomingMoviesLoading.value = false;
    }
  };
  
  const fetchDiscoverMovies = async () => {
    try {
     
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          sort_by: 'vote_average.desc', 
          'vote_count.gte': 1000, 
          page: 1
        },
        headers: { Authorization: `Bearer ${MY_API_TOKEN}` },
      });
      discoverMovies.value = response.data.results;
    } catch (err) {
      console.error("Keşfet filmleri çekilirken hata:", err);
      discoverMoviesError.value = "Keşfet filmleri yüklenemedi.";
    } finally {
      discoverMoviesLoading.value = false;
    }
  };
  

  const fetchAllMovies = async () => {
    loadFavoriteMovieIds(); 
    await Promise.all([ 
      fetchPopularMovies(),
      fetchTrendingMovies(),
      fetchUpcomingMovies(),
      fetchDiscoverMovies()
    ]);
  };

  
  onMounted(() => {
    fetchAllMovies(); 
    window.addEventListener('storage', handleStorageChange); 
  });
  
  onUnmounted(() => {
    window.removeEventListener('storage', handleStorageChange); 
  });
  </script>
  
  <style scoped>
  .mySwiper {
    width: 100%;
    height: auto;
    padding: 10px 0;
  }
  
 
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    color: #fff !important;
 
    background-color: rgba(0, 0, 0, 0.4);
    padding: 15px 10px;
    border-radius: 5px;
  }
  
  :deep(.swiper-button-next:hover),
  :deep(.swiper-button-prev:hover) {
    background-color: rgba(0, 0, 0, 0.7);
  }
  
  :deep(.swiper-pagination-bullet-active) {
    background-color: #fff !important;
  }
  </style>