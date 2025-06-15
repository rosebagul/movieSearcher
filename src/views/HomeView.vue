<script setup>
import { ref, provide } from 'vue'
import MovieNavbar from '../components/MovieNavbar.vue';
import MovieHome from '../components/MovieHome.vue';
import MovieList from './MovieList.vue';
import MovieView from '../components/MovieView.vue';


const searchQuery = ref('')
provide('searchQuery', searchQuery)
</script>

<template>
    <MovieNavbar />
    <MovieHome></MovieHome>
    <MovieView/>
</template>

<style scoped></style>
