<template>
    <header>
      <div class="relative h-[80vh]">
        <div class="absolute inset-0 bg-[url('/bgImage.jpg')] h-full w-full bg-cover bg-center">
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
  
        <div class="relative h-screen flex flex-col justify-center items-center p-2 z-[10]">
          <h1 class="text-7xl font-bold text-gray-100 text-center">Unlimited movies, TV shows, and more</h1>
  
          <div class="relative mt-10 md:mt-1 w-1/2 md:w-1/3">
            <input type="text" @input="onSearchInput" v-model="searchQuery" @keyup.enter="searchMovies"
              placeholder="Search..."
              class="w-full pl-10 pr-20 py-2 rounded-full text-sm bg-gray-100 text-black placeholder-gray-800 focus:outline-none focus:ring-3 focus:ring-white" />
  
            <svg class="absolute left-1 top-1/2 transform -translate-y-1/4 text-gray-800 h-10 w-10"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1016.65 2a7.5 7.5 0 000 14.5z" />
            </svg>
  
            <button @click="searchMovies"
              class="absolute justify-center text-center right-1 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-red-700 text-pink-100 border border-red-600 rounded-full text-sm hover:scale-110 transition-transform duration-300">
              Search
            </button>
          </div>
        </div>
      </div>
    </header>

  </template>
  
  <script setup>
  import { ref, watch, provide } from 'vue';
  import { useRouter, useRoute } from 'vue-router'; 
  import MovieView from '../components/MovieView.vue'; 
  import MovieNavbar from './MovieNavbar.vue';
  const router = useRouter();
  const route = useRoute(); 
  
  const searchQuery = ref('');
  
  
  watch(() => route.query.search, (newSearchTerm) => {
    if (newSearchTerm) {
      searchQuery.value = newSearchTerm;
    } else {
      searchQuery.value = '';
    }
  }, { immediate: true }); 

  const searchMovies = () => {
    if (searchQuery.value.trim() !== '') {
      console.log('Search initiated for:', searchQuery.value);
      
      router.push({ name: 'MovieList', query: { search: searchQuery.value } });
    }else {
    router.push({ path: '/', query: {} });
  }
  };
  
  function onSearchInput() {
    
    if (searchQuery.value.trim() === '') {
      if (route.name === 'MovieList' && route.query.search) {
        router.push({ name: 'MovieList', query: {} });
      } else if (route.name !== 'Home' && route.query.search) { 
        router.push({ path: '/', query: {} });
      }
    }
  }


  
  </script>
  
  <style scoped>

  </style>