
<template>
  <div>
    <PokemonPage/>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<script>
import PokemonPage from "@/pages/PokemonPage.vue";

export default {
  components: {PokemonPage}
}
</script>