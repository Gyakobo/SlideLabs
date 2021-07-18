<template>
  <div
      ref="sidebar_wrapper"
      class="sidebar_wrapper"
      :style="{
        width:wrapper_width
      }"
  >
    <div class="sidebar-right">
      <div class="ui icon buttons">
        <button
            v-for="tab in tabs"
            :key="tab.name"
            class="ui button"
            :class="{
              active: current_tab === tab.name
            }"
            @click="current_tab = tab.name"
        >
          <i class="icon" :class="tab.classes"></i>
        </button>
      </div>
      <keep-alive>
        <component :is="current_tab"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import tab_component_params from "./children/tab_component_params";
import drag_resizer from "../../../../../../3_js_common/utils/drag_resize/drag_resizer";

export default {
  components:{
    tab_component_params
  },
  data (){
    return {
      current_tab: 'tab_component_params',
      tabs:[
        {
          name:'tab_component_params',
          classes:['cogs']
        },
      ]
    }
  },
  computed:{
    wrapper_width(){
      return this.$store.state.sidebar_right_width + 'px'
    }
  },
  mounted() {
    let resizer = new drag_resizer.DragResizer()
    resizer.set_element(this.$refs.sidebar_wrapper)
    resizer.set_constraints({
      min_width:200,
      max_width:400
    })
    resizer.set_actions(['left'])
    resizer.set_update_size_callback(
        (w) => {
          this.$store.state.sidebar_right_width = w
        }
    )
    resizer.add_listeners()
    this.resizer = resizer
  },
  beforeUnmount() {
    this.resizer.remove_listeners()
  }
}
</script>

<style scoped>
.sidebar_wrapper{
  height: 100%;

  border-left: 5px solid #999;
}

.sidebar-right{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background: #eee;
  color: var(--blue-dark);

  font-size: 20px;
}

</style>
