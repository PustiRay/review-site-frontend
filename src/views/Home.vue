<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const books = ref([])

onMounted(async () => {
  const res = await axios.get('https://review-site-backend-qabm.onrender.com/api/books?populate=*')
  books.value = res.data.data
})
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
