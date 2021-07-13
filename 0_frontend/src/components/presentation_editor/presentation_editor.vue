<template>
  <div id="work-area">
    <sidebar_left v-if="is_slide_loaded"></sidebar_left>
    <work_sheet v-if="is_slide_loaded"></work_sheet>
    <sidebar_right v-if="is_slide_loaded"></sidebar_right>
  </div>
</template>

<script>
import sidebar_left from "./ui_tiles/sidebar_left/sidebar_left";
import work_sheet from "./ui_tiles/work_sheet";
import sidebar_right from "./ui_tiles/sidebar_right/sidebar_right";

export default {
  components: {
    sidebar_left, work_sheet, sidebar_right,
  },
  data(){
    return {
      is_slide_loaded: false
    }
  },
  async created() {
    await this.$store.dispatch('get_project_by_id', {project_id:this.$route.params.project_id})

    let current_project = this.$store.state.presentation_editor.current_project
    if (current_project === null){
      return
    }
    await this.$store.dispatch('get_slide_by_id', {slide_id:current_project.slide_ids[0]})

    this.is_slide_loaded = true

    setInterval(() => {
      this.$store.dispatch('update_current_slide')
    }, 2000)
  }
}
</script>

<style scoped>
#work-area{
  display: flex;
  flex-direction: row;

  width: 100%;
  height: calc(100vh - 40px);
}

</style>
