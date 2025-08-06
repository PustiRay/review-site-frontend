<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/" class="nav-link">Home</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
.navbar {
  background-color: #94A684;
  padding: 1rem;
  display: flex;
}

.nav-link {
  color: white;
  text-decoration: none;
  margin-right: 1rem;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
