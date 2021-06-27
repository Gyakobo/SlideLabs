<template>
  <div>
    <navbar></navbar>
    <div id="work-area">
      <sidebar_left></sidebar_left>
      <work_sheet></work_sheet>
      <sidebar_right></sidebar_right>
    </div>

  </div>
</template>

<script>
import navbar from "./ui_tiles/navbar";
import sidebar_left from "./ui_tiles/sidebar_left/sidebar_left";
import work_sheet from "./ui_tiles/work_sheet";
import sidebar_right from "./ui_tiles/sidebar_right";

export default {
  components: {
    navbar, sidebar_left, work_sheet, sidebar_right,
  },
  data(){
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#work-area{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  width: 100%;
  height: calc(100vh - 40px);
}

</style>
