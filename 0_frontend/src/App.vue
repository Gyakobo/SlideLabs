<template>
  <router-view/>
</template>

<script>
import screen_width_mixin from "./utils/screen_width/screen_width_mixin";

export default {
  name: 'App',
  mixins:[
    screen_width_mixin
  ],
}
</script>

<style>
  body{
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }

  :root{
    --black: #333;
    --blue-light: #9dd;
    --blue-dark: #099;
  }

  button:focus{
    outline: none;
  }
</style>
