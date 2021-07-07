<template>
  <div class="slide_components_tree">
    <div
        v-for="key in Object.keys(root_element_style)"
        :key="key"
        class="item"
    >
      <span>{{key}}:</span>

      <input
          type="text"
          :value="root_element_style[key]"
          @change="update_root_element_style(key, $event)"
      >
    </div>
  </div>
</template>

<script>
export default {
  data (){
    return {
    }
  },
  computed:{
    root_element_style(){
      let active_component = this.$store.state.active_component

      if (active_component === null){
        return {}
      } else {
        return active_component.params.root_element_style
      }
    }
  },
  methods:{
    update_root_element_style(key, event) {
      this.root_element_style[key] = event.target.value
    },
  }
}
</script>

<style scoped>
.slide_components_tree{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background: #eee;
  color: var(--black);

  font-size: 20px;

  padding: 5px 10px;
}

.item{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 5px;
}

.item input{
  width: 150px;
}

</style>
