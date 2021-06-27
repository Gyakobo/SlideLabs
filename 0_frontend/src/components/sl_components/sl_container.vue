<template>
  <div :id="id" class="sl container">
    <keep-alive v-for="child in children" :key="child">
      <component :is="child"></component>
    </keep-alive>
  </div>
</template>

<script>
import sl_header from "./sl_header";

export default {
  components:{
    sl_header
  },
  data(){
    return {
      children:[]
    }
  },
  props:{
    id:{
      type:String,
      required:true,
    }
  },
  methods:{
    add_child_by_name(name){
      this.children.push(name)
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
