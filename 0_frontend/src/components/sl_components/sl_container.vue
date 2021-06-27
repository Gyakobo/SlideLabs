<template>
  <div :id="id" class="sl container">
    <keep-alive v-for="child in children" :key="child">
      <component :is="child.component_name" :ref="child.id" :id="child.id"></component>
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
      container_flag:'',

      children:[],
      next_id: 1,
    }
  },
  props:{
    id:{
      type:String,
      required:true,
    }
  },
  methods:{
    add_child(component_name, id=null){
      if (id === null){
        id = 'item' + this.next_id
        this.next_id += 1
      }
      this.children.push({
        component_name:component_name,
        id:id,
      })
    },
    get_children(){
      let children_out = []
      for (let i = 0; i < this.children.length; i++){
        let child = this.children[i]
        children_out.push({
          component_name:child.component_name,
          id:child.id,
          component_ref:this.$refs[child.id]
        })
      }
      return children_out
    },
    get_child_by_id(id){
      return this.$refs[id]
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
