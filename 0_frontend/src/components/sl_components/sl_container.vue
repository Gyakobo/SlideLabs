<template>
  <div :id="id" class="sl container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    id:{
      type:String,
      required:true,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sl.container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
