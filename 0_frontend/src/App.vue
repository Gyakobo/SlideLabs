<template>
  <home/>
</template>

<script>
import home from './components/home.vue'
import screen_width_mixin from "./utils/screen_width/screen_width_mixin";

export default {
  name: 'App',
  mixins:[
    screen_width_mixin
  ],
  components: {
    home
  },
}
</script>

<style>
  body{
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }

  :root{
    --blue-light: #9dd;
    --blue-dark: #099;
  }

  button:focus{
    outline: none;
  }
</style>
