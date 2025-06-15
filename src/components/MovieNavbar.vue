<template>
    <nav
        class="sticky top-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur text-white shadow px-4 py-3 flex justify-between items-center">
        <button @click="toggleMenu" class="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>

        <div class="flex items-center justify-center">
            <span class="text-red-700 text-6xl font-extrabold italic tracking-tight select-none"
                style="text-shadow: 3px 3px 0 #7f1d1d, 6px 6px 0 #450a0a;">
                B
            </span>
        </div>

        <ul :class="[
            'md:flex md:items-center justify-center md:gap-10 md:static absolute top-16 left-0 w-full bg-black md:bg-transparent text-center transition-all duration-300',
            menuOpen ? 'block' : 'hidden'
        ]">
            <li class="flex-row">
                <router-link :to="{ name: 'Home' }" @click="closeMenu" class="flex py-3 md:px-2 hover:text-red-800">
                    <svg
                        aria-hidden="true" class="rkbrtb0 rkbrtb1 rkbrtb3 _1v25 mr-1" fill="currentColor" height="20"
                        viewBox="0 0 48 48" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd"
                            d="M23.9864 4.00009C24.3242 4.00009 24.6522 4.11294 24.9185 4.32071L45 20V39.636C44.9985 40.4312 44.5623 41.4377 44 42C43.4377 42.5623 42.4311 42.9985 41.6359 43H27V28H21V43H6.5C5.70485 42.9984 4.56226 42.682 4 42.1197C3.43774 41.5575 3.00163 40.7952 3 40V21L23.0544 4.32071C23.3207 4.11294 23.6487 4.00009 23.9864 4.00009ZM30 28V40H42V21.4314L24 7.40726L6 22V40L18 40V28C18.0008 27.2046 18.3171 26.442 18.8796 25.8796C19.442 25.3171 20.2046 25.0008 21 25H27C27.7954 25.0009 28.5579 25.3173 29.1203 25.8797C29.6827 26.4421 29.9991 27.2046 30 28Z"
                            fill="currentColor" fill-rule="evenodd"></path>
                    </svg>
                    Home
                </router-link>
            </li>
            <li class="flex-row">
                <router-link :to="{ name: 'bests' }" @click="closeMenu" class="flex py-3 md:px-2 hover:text-red-800">
                    <svg aria-hidden="true" class="rkbrtb0 rkbrtb1 rkbrtb3 _1v25 mr-1" fill="currentColor" height="20"
                        viewBox="0 0 24 24" width="20">
                        <path
                            d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z" />
                    </svg>
                    Movies
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'Favorites' }" @click="closeMenu"
                    class="flex py-3 md:px-2 hover:text-red-800"><svg xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor" height="20" width="20">
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg> Favourite movies</router-link></li>

        </ul>

        <input v-show="isSearchVisible" @input="injectedHandleSearchInput" v-model="injectedSearchQuery" @keyup.enter="injectedTriggerSearch"
            type="text" placeholder="Search movies..."
            class="hidden md:inline ml-4 px-[50px] py-1 rounded-full bg-gray-600 text-gray-300 placeholder-gray-300 focus:outline-none transition duration-300" />

        <button @click="handleClick"
            class="bg-red-700 hover:bg-red-600 text-gray-100 py-[4px] px-4 w-[120px] rounded-full shadow transition duration-300 ml-2">
            SIGN IN
        </button>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue' 


const injectedSearchQuery = inject('globalSearchQuery'); 
const injectedTriggerSearch = inject('triggerSearch');   
const injectedHandleSearchInput = inject('handleSearchInput'); 


const menuOpen = ref(false)
const isSearchVisible = ref(false) 

function toggleMenu() {
    menuOpen.value = !menuOpen.value
}
function closeMenu() {
    menuOpen.value = false
}

const handleClick = () => {
    alert('Signed in!')
}

const handleScroll = () => {
    isSearchVisible.value = window.scrollY > 400
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})


</script>