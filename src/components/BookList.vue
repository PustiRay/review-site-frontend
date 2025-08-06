<template>
  <div class="container">
    <h1>Book Reviews</h1>
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search by title or author"
      class="search-input"
    />
    <div v-if="filteredBooks.length">
      <div
        v-for="book in filteredBooks"
        :key="book.id"
        class="book-card"
        @click="goToDetail(book.id)"
      >
        <h3>{{ book.Title || 'No Title' }}</h3>
        <p><strong>Author:</strong> {{ book.Author || 'Unknown author' }}</p>
       <img
  v-if="book.Cover && book.Cover.url"
  :src="`http://localhost:1337/api/books${book.Cover.url}`"
  alt="Cover image for {{ book.Title }}"
  class="book-cover"
/>

        <p>
          {{
            book.Review && book.Review.length && book.Review[0].children && book.Review[0].children.length
              ? book.Review[0].children[0].text.substring(0, 100) + '...'
              : ''
          }}
        </p>
      </div>
    </div>
    <p v-else>No books found.</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      books: [],
      searchTerm: ''
    }
  },
  computed: {
    filteredBooks() {
      return this.books.filter(book => {
        const title = (book.Title || '').toLowerCase()
        const author = (book.Author || '').toLowerCase()
        const search = this.searchTerm.toLowerCase()
        return title.includes(search) || author.includes(search)
      })
    }
  },
  methods: {
    async fetchBooks() {
      try {
        // Note: populate=* to get coverImage and all relations
        const res = await axios.get('http://localhost:1337/api/booksm')
        // Strapi returns data inside res.data.data
        this.books = res.data.data || []
        console.log('Fetched books:', this.books)
      } catch (err) {
        console.error('Error fetching books:', err)
      }
    },
    goToDetail(id) {
      this.$router.push(`/books/${id}`)
    }
  },
  mounted() {
    this.fetchBooks()
  }
}
</script>

<style scoped>
.container {
  padding: 2rem;
  max-width: 800px;
  margin: auto;
}
.search-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}
.book-card {
  background-color: #FFEEF4;
  border: 1px solid #AEC3AE;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.book-card:hover {
  background-color: #f5d6e3;
}
.book-cover {
  max-width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin: 0.5rem 0;
}
</style>
