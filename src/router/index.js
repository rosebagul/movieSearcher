import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetail from '../components/MovieDetail.vue' 


import FavouriteView from '../views/FavouriteView.vue'

import GenresView from '../views/GenresView.vue'
import BestMovies from '../views/BestMovies.vue'
import MovieList from '../views/MovieList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/film/:id',
      
      name: 'film', 
      component: MovieDetail,
      props: true 
    },
    {
      path:'/favourites',
    
      name:'Favorites',
      component:FavouriteView,
    },
    {
      path:'/movie/:id',
      name: 'film',
      component:MovieDetail,
    },
    {
    path: '/genre/:genreId', 
    name: 'genreMovies',
    component: GenresView
  },
  {
    path:'/bests',
    name:'bests',
    component:BestMovies
  },
  {
    path:'/moviess',
    name:'MovieList',
    component: MovieList
  }

  ],
})

export default router