<template>
  <resizable
      id="sidebar-left-resizer"
      ref="sidebar_left_resizer"
      :init_width="$store.state.sidebar_left_width + 'px'"
      :min_width="100"
      :max_width="500"
      :padding_tblr="[0,0,0,10]"
  >
    <div class="sidebar_left">
      <div class="ui icon buttons">
        <button
            class="ui button"
            :class="{
              active: current_tab === 'tab_components_tree'
            }"
            @click="current_tab = 'tab_components_tree'"
        ><i class="sitemap icon"></i></button>
        <button
            class="ui button"
            :class="{
              active: current_tab === 'tab_components_add'
            }"
            @click="current_tab = 'tab_components_add'"
        ><i class="plus square outline icon"></i></button>
      </div>
<!--      <keep-alive>-->
<!--        <component :is="current_tab"></component>-->
<!--      </keep-alive>-->
      <component :is="current_tab"></component>
    </div>
  </resizable>
</template>

<script>
import resizable from "../resizable";
import tab_components_tree from "./children/tab_components_tree";
import tab_components_add from "./children/tab_components_add";

export default {
  components:{
    resizable,
    tab_components_tree, tab_components_add
  },
  data (){
    return {
      current_tab: 'tab_components_tree'
    }
  },
  mounted() {
    this.$watch(
        "$refs.sidebar_left_resizer.width",
        (new_value) => {
          this.$store.state.sidebar_left_width = parseFloat(new_value)
        }
    );
  }
}
</script>

<style scoped>
.sidebar_left{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
}

</style>
