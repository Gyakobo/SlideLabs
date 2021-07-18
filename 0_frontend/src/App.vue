<template>
  <router-view/>
</template>

<script>
import screen_size_mixin from "../../3_js_common/utils/screen_width/screen_size_mixin";

export default {
  name: 'App',
  mixins:[
    screen_size_mixin
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
