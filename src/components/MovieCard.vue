<template>
    <div class="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200 cursor-pointer">
      <div v-if="isFavorite" class="absolute top-2 right-2 text-red-500 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 drop-shadow-md" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clip-rule="evenodd" />
        </svg>
      </div>
  
      <router-link :to="`/movie/${movie.id}`">
        <img :src="getPoster(movie)" :alt="movie.title" class="w-full h-[200px] object-cover" />
        <div class="p-4">
          <h3 class="text-lg font-semibold text-white mb-1 truncate">{{ movie.title }}</h3>
          <p class="text-sm text-gray-400">{{ movie.release_date?.slice(0, 4) || "-" }}</p>
        </div>
      </router-link>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    movie: {
      type: Object,
      required: true
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  });
  
  const getPoster = (movieItem) => {
    return movieItem.poster_path
      ? `https://image.tmdb.org/t/p/w500${movieItem.poster_path}`
      : 'https://via.placeholder.com/300x450?text=No+Poster'; 
  };
  </script>
  
  <style scoped>
 
  .drop-shadow-md {
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.1)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  }
  </style>