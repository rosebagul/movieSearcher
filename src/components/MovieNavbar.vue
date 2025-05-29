<template>
    <nav class="w-full bg-black shadow-md fixed px-4 py-3 flex flex-inline justify-between items-center z-[100]">
        <button @click="toggleMenu" class="md:hidden text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
        <div class="bg-black flex items-center justify-center">
            <span class="text-red-700 text-6xl font-extrabold italic tracking-tight select-none"
                style="text-shadow: 3px 3px 0 #7f1d1d, 6px 6px 0 #450a0a;">
                B
            </span>
        </div>
        <ul :class="['md:flex items-center justify-center gap-10 mx-auto md:space-x-15', menuOpen ? 'block' : 'hidden', 'md:block', 'mt-2 md:mt-0']"
            class="text-gray-500">

            <li>
               
            </li>
            <li class="flex-row"><a href="#" class="flex py-3 md:px-2 hover:text-gray-100"> <svg aria-hidden="true"
                        class="rkbrtb0 rkbrtb1 rkbrtb3 _1v25 mr-1" fill="currentColor" height="20" viewBox="0 0 48 48"
                        width="20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd"
                            d="M23.9864 4.00009C24.3242 4.00009 24.6522 4.11294 24.9185 4.32071L45 20V39.636C44.9985 40.4312 44.5623 41.4377 44 42C43.4377 42.5623 42.4311 42.9985 41.6359 43H27V28H21V43H6.5C5.70485 42.9984 4.56226 42.682 4 42.1197C3.43774 41.5575 3.00163 40.7952 3 40V21L23.0544 4.32071C23.3207 4.11294 23.6487 4.00009 23.9864 4.00009ZM30 28V40H42V21.4314L24 7.40726L6 22V40L18 40V28C18.0008 27.2046 18.3171 26.442 18.8796 25.8796C19.442 25.3171 20.2046 25.0008 21 25H27C27.7954 25.0009 28.5579 25.3173 29.1203 25.8797C29.6827 26.4421 29.9991 27.2046 30 28Z"
                            fill="currentColor" fill-rule="evenodd"></path>
                    </svg>Home</a></li>
            <li><a href="#" class="flex py-3 md:px-2 hover:text-gray-100"> <svg aria-hidden="true"
                        class="rkbrtb0 rkbrtb1 rkbrtb3 _1v25wbq6g mr-1" fill="currentColor" height="20"
                        viewBox="0 0 48 48" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd"
                            d="M17 4.00001L24 13L31.0468 4L34.5 4L27.5 13H42C42.7957 13 43.5587 13.3161 44.1213 13.8787C44.6839 14.4413 45 15.2044 45 16V41C45 41.7957 44.6839 42.5587 44.1213 43.1213C43.5587 43.6839 42.7957 44 42 44H6C5.20435 44 4.44129 43.6839 3.87868 43.1213C3.31607 42.5587 3 41.7957 3 41V16C3 15.2044 3.31607 14.4413 3.87868 13.8787C4.44129 13.3161 5.20435 13 6 13L20.5 13L13.5 4L17 4.00001ZM42 41H6V16H42V41Z"
                            fill="currentColor" fill-rule="evenodd"></path>
                    </svg>Live TV</a></li>
            <li><a href="#" class="block py-3 md:px-2 hover:text-gray-100">CONTACT</a></li>
        </ul>



        <button @click="handleClick"
            class="bg-red-700 hover:bg-red-600 text-gray-100 py-2 px-6 rounded-full shadow transition duration-300">
            SING IN
        </button>


    </nav>


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
</script>++