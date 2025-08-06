<template>
  <div class="container" v-if="!loading && !error">
    <h1>{{ book.Title }}</h1>
    <p><strong>Author:</strong> {{ book.Author }}</p>
    <p><strong>Genre:</strong> {{ book.Genre }}</p>
    <p><strong>Rating:</strong> {{ book.Rating }}/10</p>
    
    <div v-if="book.Review && book.Review.length">
      <h3>Review</h3>
      <div v-for="(paragraph, index) in book.Review" :key="index" class="review-paragraph">
        <p v-for="child in paragraph.children" :key="child.text">{{ child.text }}</p>
      </div>
    </div>
  </div>

  <div v-else-if="loading">
    Loading book...
  </div>

  <div v-else-if="error">
    Book not found.
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['id'],
  data() {
    return {
      book: null,
      loading: true,
      error: false,
    }
  },
  async mounted() {
    try {
      const res = await axios.get('https://review-site-backend-qabm.onrender.com/api/books?populate=*')
      const books = res.data.data
      this.book = books.find(b => b.id === parseInt(this.id))
      if (!this.book) {
        this.error = true
      }
    } catch (e) {
      this.error = true
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}
.review-paragraph {
  margin-bottom: 1rem;
  line-height: 1.5;
}
</style>
