<template>
  <div :id="components_tree_item.id" class="sl header" style="left:100px">
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
    components_tree_item:{
      type:Object,
      required:true,
    }
  }
}
</script>

<style scoped>
.sl.header{
  width: fit-content;
  height: fit-content;

  position: absolute;
  user-select: none;
}

</style>
