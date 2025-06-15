<template>
    <MovieNavbar />
    <div class="min-h-screen bg-gray-900 text-white p-8">
        <div class="max-w-7xl mx-auto">
            <h1 class="text-4xl font-bold mb-8">
                {{ genreName ? ` Movies about ${genreName}` : ' Genre movies' }}
            </h1>

            <div v-if="loading" class="text-center text-gray-400 text-lg">
                Movies Loading...
            </div>

            <div v-else-if="movies.length === 0" class="text-center text-gray-400 text-lg">
                No movies found in this genre.
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                <div v-for="movie in movies" :key="movie.id"
                    class="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
                    <router-link :to="`/movie/${movie.id}`">
                        <img :src="movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : 'https://via.placeholder.com/300x450?text=No+Poster'
                            " :alt="movie.title" class="w-full h-auto object-cover" />
                        <div class="p-4">
                            <h2 class="text-lg font-semibold mb-1 truncate">{{ movie.title }}</h2>
                            <p class="text-sm text-gray-400">{{ movie.release_date?.slice(0, 4) || "-" }}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import MovieNavbar from '../components/MovieNavbar.vue';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const movies = ref([]);
const loading = ref(true);
const genreName = ref('');

const API_KEY = "d45ae68b5f4bb70bd69b0d454f6783ff";
const MY_API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDVhZTY4YjVmNGJiNzBiZDY5YjBkNDU0ZjY3ODNmZiIsIm5iZiI6MTc0NzU4MTM0Ni41NTQsInN1YiI6IjY4MjlmOWEyMTQ1NDg4OWY0YjhjMDMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bm-oucBYRUwv6YyMZVijSv5NwZ1p-cM0x8I03hUFfss"; // Kendi API token'ın
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMoviesByGenre = async (genreId) => {
    loading.value = true;
    movies.value = [];
    try {
        const response = await axios.get(`${BASE_URL}/discover/movie`, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
                with_genres: genreId,
                sort_by: 'popularity.desc'
            },
            headers: { Authorization: `Bearer ${MY_API_TOKEN}` },
        });
        movies.value = response.data.results;
    } catch (error) {
        console.error(`Türe göre film çekilirken hata oluştu (Genre ID: ${genreId}):`, error);
        movies.value = [];
    } finally {
        loading.value = false;
    }
};


watch(
    () => route.params.genreId,
    (newGenreId) => {
        if (newGenreId) {
            fetchMoviesByGenre(newGenreId);
        }
    },
    { immediate: true }
);


watch(
    () => route.query.name,
    (newName) => {
        genreName.value = newName || '';
    },
    { immediate: true }
);


onMounted(() => {

});
</script>

<style scoped></style>