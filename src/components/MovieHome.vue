<template>

    <header>
        <div class="relative h-screen">
            <div class="absolute inset-0 bg-[url('/bgImage.jpg')] h-full w-full bg-cover bg-center">
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>

            <div class="relative h-screen flex flex-col justify-center items-center p-4 z-[10]">
                <h1 class="text-7xl font-bold text-white text-center">Unlimited movies, TV shows, and more</h1>
            

            <div class="relative mt-10 md:mt-3 w-1/2 md:w-1/3">
                    <input type="text" v-model="searchQuery" @keyup.enter="searchMovies" placeholder="Search..."
                        class="w-full pl-10 pr-3 py-2 rounded-full text-sm bg-gray-100 text-black placeholder-gray-800 focus:outline-none focus:ring-3 focus:ring-white" />
                    <svg class="absolute left-1 top-1/2 transform -translate-y-1/4 text-gray-800 h-10 w-10"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1016.65 2a7.5 7.5 0 000 14.5z" />
                    </svg>
                </div>
</div>
        </div>


    </header>
</template>

<script setup>

import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
const menuOpen = ref(false)
const searchQuery = ref('')

function toggleMenu() {
    menuOpen.value = !menuOpen.value
}

const handleClick = () => {
    alert('pushed!')
}



const searchMovies = () => {
    console.log('Search:', searchQuery.value)
    router.push({ path: '/', query: { search:  searchQuery.value} })

}

</script>