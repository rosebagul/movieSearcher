<template>
    <div class="p-6 bg-gray-900 min-h-screen">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div v-for="(item, index) in movies" :key="index"
                class="bg-gray-100 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img :src="getPoster(item)" alt="Poster" class="w-full h-[200px] object-cover" />
                <div class="p-4">
                    <h2 class="text-2xl font-semibold text-gray-000 mb-2">
                        {{ item.original_title }}
                    </h2>
                    <p class="text-sm text-gray-700 line-clamp-4">
                        {{ item.overview }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>



import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const movies = ref(null)



const searchQuery = ref('')

function getPoster(item) {
    return item.poster_path
        ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Film_reel.svg/1054px-Film_reel.svg.png';
}

const BASE_URL = 'https://api.themoviedb.org/3'


const getData = async () => {
    const API_KEY = "d45ae68b5f4bb70bd69b0d454f6783ff"
    const MY_API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDVhZTY4YjVmNGJiNzBiZDY5YjBkNDU0ZjY3ODNmZiIsIm5iZiI6MTc0NzU4MTM0Ni41NTQsInN1YiI6IjY4MjlmOWEyMTQ1NDg4OWY0YjhjMDMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bm-oucBYRUwv6YyMZVijSv5NwZ1p-cM0x8I03hUFfss"

    console.log(MY_API_TOKEN);


    const response = await axios.get(`${BASE_URL}/search/movie?query=${route.query.search}`, {
        params: { api_key: API_KEY },
        headers: { Authorization: `Bearer ${MY_API_TOKEN}` },
    })

    console.log(
        response.data.results
    );
    movies.value = response.data.results

}

onMounted(() => route.query.search, async () => {
    await getData();
})
watch(async () => {
    await getData();
})

</script>