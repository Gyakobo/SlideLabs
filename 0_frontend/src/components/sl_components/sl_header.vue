<template>
  <div :id="id" class="sl header" style="left:100px">
    <h1 class="ui header">{{ text }}</h1>
  </div>
</template>

<script>
export default {
  data (){
    return {
      text:'Yet another header'
    }
  },
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
.sl.header{
  width: fit-content;
  height: fit-content;

  position: absolute;
}

</style>
