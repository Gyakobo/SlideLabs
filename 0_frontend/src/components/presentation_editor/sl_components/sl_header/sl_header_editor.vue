<template>
  <div class="main_wrapper">
    <div
        v-for="(item, key1) in active_component_params"
        :key="key1"
        class="params_group"
    >
      <h3>{{key1}}</h3>
      <div
          v-for="(item2, key2) in item"
          :key="key2"
          class="item"
      >
        <span>{{key2}}:</span>

        <input
            type="text"
            :value="item2"
            @change="update_active_component_params(key1, key2, $event)"
        >
      </div>
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
    active_component_params(){
      let active_component = this.$store.state.active_component

      if (active_component === null){
        return {}
      } else {
        return active_component.params
      }
    }
  },
  methods:{
    update_active_component_params(key1, key2, event) {
      this.active_component_params[key1][key2] = event.target.value
    },
  }
}
</script>

<style scoped>
.main_wrapper{
  background: #eee;
  color: var(--black);

  font-size: 20px;
  height: 100%;
}

.params_group{
  display: flex;
  flex-direction: column;

  width: 100%;

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
