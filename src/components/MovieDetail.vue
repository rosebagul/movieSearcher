<template>
  <MovieNavbar />
  <div v-if="movie" class="min-h-screen bg-cover bg-center relative" :style="{
    backgroundImage: movie.backdrop_path
      ? `linear-gradient(to right, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.4)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
      : 'linear-gradient(to right, #111827, #1f2937)'
  }">
    <div class="relative z-10 max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row items-start gap-8 text-white">

      <div class="mt-5 pt-5 ">
        <img :src="movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://via.placeholder.com/300x450?text=No+Poster'
          " class="w-64 rounded-xl shadow-lg cursor-pointer" @click="showModal = true" />

        <div v-if="showModal"
          class="fixed inset-0 pt-[100px] z-[60] flex items-center justify-center bg-black bg-opacity-80"
          @click.self="showModal = false">
          <div class="relative">
            <button
              class="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition"
              @click="showModal = false">
              ✕
            </button>
            <div v-if="movie.poster_path">
              <img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
                class="max-w-[90vw] max-h-[90vh] rounded-xl" />
            </div>
            <div v-else class="w-[300px] h-[450px] bg-gray-900 text-white flex items-center justify-center rounded-xl">
              <p>Poster not available for this movie.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5 pt-5 flex-grow">
        <h1 class="text-4xl font-bold mb-2">{{ movie.title }}<span class="font-extralight text-gray-400 text-2xl"> ({{
          movie.release_date?.slice(0, 4) || "-" }}
              )</span>
        </h1>
        <div class="mt-4">
          <button @click="toggleFavorite" :class="{ 'bg-red-700': isFavorite, 'bg-gray-700': !isFavorite }"
            class="text-white font-bold py-2 px-4 rounded flex items-center justify-center transition-colors duration-200">
            <svg v-if="!isFavorite" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 2.5a.5.5 0 01.5.5v4.5h4.5a.5.5 0 010 1h-4.5v4.5a.5.5 0 01-1 0V8.5H5a.5.5 0 010-1h4.5V3a.5.5 0 01.5-.5z"
                clip-rule="evenodd" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd" />
            </svg>
            {{ isFavorite ? 'Remove from favourites' : 'Add to favourites' }}
          </button>
        </div>
        <p class="text-sm text-gray-300 mb-2">
          <span>{{ movie.release_date }} </span> •
          <span> {{ movie.runtime }} min</span> •
          <span>{{ movie.vote_average }}/10</span>
        </p>
        <span
    v-for="genre in movie.genres"
    :key="genre.id"
    @click="navigateToGenre(genre.id, genre.name)" class="bg-red-700 hover:bg-red-900 text-white text-xs font-medium px-2 py-1 m-[5px] rounded-full shadow cursor-pointer"
  >
    {{ genre.name }}
  </span>

        <h4 class="font-bold text-lg mt-10 leading-relaxed max-w-2xl">Overview</h4>
        <p class="text-lg leading-relaxed max-w-2xl">
          {{ movie.overview }}
        </p>

        <div v-if="trailerVideoKey" class="mt-10">
          <h4 class="font-bold text-lg mb-4">Official Trailer</h4>
          <div class="relative overflow-hidden rounded-lg bg-black" style="padding-top: 56.25%;">
            <div id="youtube-player" class="absolute top-0 left-0 w-full h-full"></div>
          </div>
        </div>

        <div v-if="cast.length > 0" class="mt-10 w-[750px]">
          <h4 class="font-bold text-lg mb-4">Top Cast</h4>
          <div class="flex flex-wrap gap-4">
            <swiper :modules="modules" :slides-per-view="slidesPerView" :space-between="10" :mousewheel="{
              sensitivity: 1,
              forceToAxis: true,
              releaseOnEdges: true,
            }" :navigation="true" :breakpoints="swiperBreakpoints" @swiper="onSwiper" @slideChange="onSlideChange"
              class="mySwiper w-full h-auto px-4">

              <swiper-slide v-for="actor in cast" :key="actor.id">
                <div class="flex flex-col items-center text-center w-28">
                  <img :src="actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : 'https://via.placeholder.com/185x278?text=No+Image'" alt="Actor Profile"
                    class="w-24 h-24 rounded-full object-cover shadow-md mb-2" />
                  <p class="text-sm font-semibold">{{ actor.name }}</p>
                  <p class="text-xs text-gray-400">{{ actor.character }}</p>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>

    </div>

    <div class="absolute inset-0 bg-black/10 lg:bg-transparent mt-5 pt-5"></div>
  </div>
</template>

<script setup>
import MovieNavbar from './MovieNavbar.vue'
import { ref, onMounted, watch, onUnmounted } from 'vue' 
import axios from 'axios'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

const modules = [Navigation, Pagination, Mousewheel];
const router = useRouter();
const route = useRoute();
const movie = ref(null);
const cast = ref([]);
const trailerVideoKey = ref(null);
const showModal = ref(false);

const player = ref(null);
const isMuted = ref(true);


const favoriteMovies = ref([]); 
const isFavorite = ref(false);  

const API_KEY = "d45ae68b5f4bb70bd69b0d454f6783ff";
const MY_API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDVhZTY4YjVmNGJiNzBiZDY5YjBkNDU0ZjY3ODNmZiIsIm5iZiI6MTc0NzU4MTM0Ni41NTQsInN1YiI6IjY4MjlmOWEyMTQ1NDg4OWY0YjhjMDMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bm-oucBYRUwv6YyMZVijSv5NwZ1p-cM0x8I03hUFfss";
const BASE_URL = 'https://api.themoviedb.org/3';

const loadFavorites = () => {
  const storedFavorites = localStorage.getItem('favoriteMovies');
  if (storedFavorites) {
    try {
      favoriteMovies.value = JSON.parse(storedFavorites);
    } catch (e) {
      console.error("Favoriler LocalStorage'dan yüklenirken hata oluştu:", e);
      favoriteMovies.value = []; 
    }
  }
};


const saveFavorites = () => {
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies.value));
};


const toggleFavorite = () => {
  if (movie.value) {
    const movieId = movie.value.id;
    if (isFavorite.value) {
 
      favoriteMovies.value = favoriteMovies.value.filter(id => id !== movieId);
      isFavorite.value = false;
      console.log(`Film ID: ${movieId} favorilerden çıkarıldı.`);
    } else {
     
      favoriteMovies.value.push(movieId);
      isFavorite.value = true;
      console.log(`Film ID: ${movieId} favorilere eklendi.`);
    }
    saveFavorites(); 
  }
};
const navigateToGenre = (genreId, genreName) => {
  router.push({
    name: 'genreMovies',
    params: { genreId: genreId },
    query: { name: genreName }
  });
};

const swiperBreakpoints = {
  640: { slidesPerView: 3, spaceBetween: 5 },
  768: { slidesPerView: 4, spaceBetween: 10 },
  1024: { slidesPerView: 5, spaceBetween: 15 },
  1280: { slidesPerView: 6, spaceBetween: 20 },
};


window.onYouTubeIframeAPIReady = () => {
  console.log('YouTube IFrame API Ready!');
  
  if (trailerVideoKey.value && !player.value) {
    createYouTubePlayer(trailerVideoKey.value);
  }
};

const createYouTubePlayer = (videoId) => {
  
  if (player.value && typeof player.value.destroy === 'function') {
    player.value.destroy();
    player.value = null;
  }

  const playerElement = document.getElementById('youtube-player');
  if (!playerElement) {
    console.error("YouTube player div not found! ID: youtube-player");
    return;
  }

  
  if (typeof YT !== 'undefined' && YT.Player) {
    player.value = new YT.Player('youtube-player', {
      videoId: videoId,
      playerVars: {
        'autoplay': 1,   
        'mute': 1,        
        'controls': 1,   
        'rel': 0,        
        'modestbranding': 1 
      },
      events: {
        'onReady': (event) => {
          console.log('YouTube Player is truly ready to receive commands!');
          event.target.mute(); 
          isMuted.value = true;
          event.target.playVideo();
        },
        'onStateChange': (event) => {
          if (event.target && typeof event.target.isMuted === 'function') {
            isMuted.value = event.target.isMuted();
          }
        },
        'onError': (event) => {
          console.error("YouTube Player Error:", event.data);
        }
      }
    });
  } else {
    console.warn("You tube API is not ready..");
  }
};


const playTrailer = () => { /* No-op */ };
const pauseTrailer = () => { /* No-op */ };
const toggleMute = () => { /* No-op */ };


const getData = async () => {

  if (!route.params.id) {
    console.warn("Rota parametresi ID bulunamadı, API isteği yapılmıyor.");
    movie.value = null;
    trailerVideoKey.value = null;
    cast.value = [];
    if (player.value && typeof player.value.destroy === 'function') {
      player.value.destroy();
      player.value = null;
    }
    return;
  }

  try {
    const movieResponse = await axios.get(`${BASE_URL}/movie/${route.params.id}`, {
      params: { api_key: API_KEY, language: 'en-US' },
      headers: { Authorization: `Bearer ${MY_API_TOKEN}` },
    });
    movie.value = movieResponse.data;

    if (movie.value) {
      isFavorite.value = favoriteMovies.value.includes(movie.value.id);
    }

    const creditsResponse = await axios.get(`${BASE_URL}/movie/${route.params.id}/credits`, {
      params: { api_key: API_KEY, language: 'en-US' },
      headers: { Authorization: `Bearer ${MY_API_TOKEN}` },
    });
    cast.value = creditsResponse.data.cast.slice(0, 15); 

    const videosResponse = await axios.get(`${BASE_URL}/movie/${route.params.id}/videos`, {
      params: { api_key: API_KEY, language: 'en-US' },
      headers: { Authorization: `Bearer ${MY_API_TOKEN}` },
    });
    const trailer = videosResponse.data.results.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    );
    if (trailer && trailer.key) {
      if (trailer.key !== trailerVideoKey.value) {
        trailerVideoKey.value = trailer.key;
        if (typeof YT !== 'undefined' && YT.Player) {
          createYouTubePlayer(trailerVideoKey.value);
        }
      } else if (!player.value && typeof YT !== 'undefined' && YT.Player) {
      
        createYouTubePlayer(trailerVideoKey.value);
      }
    } else {
    
      trailerVideoKey.value = null;
      if (player.value && typeof player.value.destroy === 'function') {
        player.value.destroy();
        player.value = null;
      }
    }

  } catch (error) {
    console.error("Veri çekme hatası:", error);
    movie.value = null; 
    trailerVideoKey.value = null;
    cast.value = [];
    if (player.value && typeof player.value.destroy === 'function') {
      player.value.destroy();
      player.value = null;
    }
  }
};

const onSwiper = (swiper) => {
};

const onSlideChange = () => {
};
onUnmounted(() => {
  console.log('MovieDetail unmounted, destroying YouTube player...');
  if (player.value && typeof player.value.destroy === 'function') {
    player.value.destroy();
    player.value = null;
  }
});


watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (newId && (newId !== oldId || !oldId)) {
      console.log(`Film ID değişti/ilk yükleme: ${oldId || 'Yok'} -> ${newId}`);
      if (player.value && typeof player.value.destroy === 'function') {
        player.value.destroy();
        player.value = null;
      }
      await getData();
    }
  },
  { immediate: true }
);

onMounted(() => {
 
  loadFavorites();
 
});
</script>

<style scoped>
.mySwiper {
  max-width: 1400px;
  margin: 0 auto;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #fff !important;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #fff !important;
}
</style>