<template>
  <div class="slide_components_tree">
    <div>
      <button class="ui red button" @click="add_h1">Add h1</button>
    </div>
  </div>
</template>

<script>
export default {
  data (){
    return {
    }
  },
  methods:{
    add_h1(){
      let root = this.$store.state.root_container
      root.add_child_by_name('sl_header')
    }
  },
}
</script>

<style scoped>
.slide_components_tree{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background: #eee;
  color: var(--blue-dark);

  font-size: 20px;
}

</style>
