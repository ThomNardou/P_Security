<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const props = defineProps(["name"])
const result = ref([])

onMounted(() => {
  console.log(props)
  axios.get(`https://localhost:8443/user/${props.name}`)
})
</script>


<template>
  <main>
    <p>{{ props }}</p>
  </main>
</template>
