<template>
  <div
      class="cards"
      :style="{width:width + 'px'}"
  >
    <div
        v-for="project in projects"
        :key="project.title"
        class="card"
        @pointerdown="$store.commit('set_active_project', project)"
        @dblclick="open_presentation_editor()"
        @pointerup.middle="open_presentation_editor(true)"
    >
      <img
          class="image"
          @dragstart="(event) => {event.preventDefault()}"
          src="/file_manager/sample_project.jpg"
      >

      <div class="caption">
        {{project.title}}
      </div>
    </div>

    <div
        class="card"
        style="height: 275px"
        @mouseenter="is_add_project_card_hover = true"
        @mouseleave="is_add_project_card_hover = false"
        @pointerdown="dialog_create_project_start()"
    >
      <i
          class="huge plus icon"
          :style="{opacity: is_add_project_card_hover ? '1.0' : '0.5'}"
      ></i>
    </div>

    <dialog_create_project
        :is_show="is_show_dialog_create_project"
        @dialog_exit="on_dialog_create_project_exit($event)"
    ></dialog_create_project>
  </div>
</template>

<script>
import dialog_create_project from "./dialog_create_project";

export default {
  components:{
    dialog_create_project
  },
  data(){
    return {
      is_add_project_card_hover:false,
      is_show_dialog_create_project:false,
    }
  },
  computed:{
    width(){
      let state = this.$store.state
      return state.screen_width - state.sidebar_left_width - state.sidebar_right_width
    },
    projects(){
      return this.$store.state.file_manager.projects
    },
    active_project(){
      return this.$store.state.file_manager.active_project
    }
  },
  methods:{
    open_presentation_editor(new_tab=false){
      if (this.active_project === null){
        alert('Project not selected!')
        return
      }

      let route_object = {
        name:'presentation_editor',
        params: {
          project_id: this.active_project.project_id
        }
      }

      if (new_tab){
        let path = this.$router.resolve(route_object).fullPath
        let url = window.location.origin + path
        window.open(url,'_blank')
      } else {
        this.$router.push(route_object)
      }
    },
    dialog_create_project_start(){
      this.is_show_dialog_create_project = true
    },
    on_dialog_create_project_exit(is_ok){
      this.is_show_dialog_create_project = false

      if(is_ok){
        this.$store.dispatch('get_projects')
      }
    }
  },
  created() {
    this.$store.dispatch('get_projects')
  },
}
</script>

<style scoped>
.cards{
  display: flex;
  flex-direction: row;
  justify-content: left;
  flex-wrap: wrap;

  height: fit-content;

  margin: 10px 0;

  font-size: 15px;
  color: var(--blue-dark);
}

.card{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 250px;
  min-width: 250px;
  height: fit-content;
  margin: 10px;
  padding: 10px;

  border: 0;
  border-radius: 5px;

  background-color: rgba(255,255,255, 0.7);
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
}

.card:hover{
  transform: translateY(-3px);

  box-shadow: 0 1px 3px 0 #BCBDBD, 0 0 0 1px #D4D4D5;
}

.card .image{
  width: 230px;
  height: 230px;

  border-radius: 5px;

  cursor: pointer;
}

.caption{
  margin-top: 5px;

  font-size: 20px;
  text-align: center;
  cursor: pointer;
}
</style>
