<script setup>
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";
</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
          <RouterLink to="/" class="link">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/login" class="link">Login</RouterLink>
        </li>
        <li>
          <RouterLink :to="{name: 'User', params: {name: 'Tiago'}}" class="link">Me</RouterLink>
        </li>
      </ul>
    </nav>
  </header>

  <RouterView />
</template>

<script>

</script>

<style scoped>
header {
  background-color: #333;
  color: white;
  padding: 1rem;
}

nav ul {
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 0;
}

nav ul li .link {
  margin: 0;
  color: white;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
