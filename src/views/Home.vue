<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const res = await axios.get(
  'https://review-site-backend-qabm.onrender.com/api/books?populate=*',
  {
    headers: {
      Authorization: 'Bearer 3b168db93b251c7541a5d133bc777b704d52f4e35d7a6b412e1a460c6ac70bf8d1543fc64fdc11328de66cb5c119b96f42ded32de328bccde9b8deb807d456650adfbd2bcfb025932e22c91709e578fe58d56f991eedf6cd32abc68fcfeffdd03a3d7b27a52cd82627843629cdf3ebb29021220008b820af43d6d28f2cc8a605'
    }
  }
);

</script>

<template>
  <div>
    <h1>Book Reviews</h1>
    <div v-for="book in books" :key="book.id">
      <h2>{{ book.attributes.title }}</h2>
      <p><strong>Author:</strong> {{ book.attributes.author }}</p>
      <p><strong>Rating:</strong> {{ book.attributes.rating }}/5</p>
      <img :src="book.attributes.coverImage?.data?.attributes?.url" alt="Cover" />
    </div>
  </div>
</template>
