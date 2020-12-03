<template>
<div id="app">
    <div class="container">
      <simon-says/>
    </div>
  </div>
</template>

<script>
import SimonSays from './components/SimonSays.vue';

export default {
  name: 'App',
  components: {
    SimonSays,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  overflow: hidden;
  padding: 15px;
}
</style>
