<template>
  <div
      class="cards"
  >
    <div
        v-for="project in projects"
        :key="project.title"
        class="card"
        @click="$router.push({name:'presentation_editor'})"
        @mouseup.middle="open_new_tab($router.resolve({name:'presentation_editor'}).fullPath)"
    >
      <img
          class="image"
          src="/file_manager/sample_project.jpg"
      >

      <div class="caption">
        {{project.title}}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
  },
  computed:{
    projects(){
      return this.$store.state.file_manager.projects
    }
  },
  methods:{
    open_new_tab(path){
      let url = window.location.origin + path
      window.open(url,'_blank')
    },
  },
  created() {
    this.$store.dispatch('get_projects')
  }
}
</script>

<style scoped>
.cards{
  display: flex;
  flex-direction: row;
  justify-content: left;
  flex-wrap: wrap;

  margin: 10px 0;

  font-size: 15px;
  color: var(--blue-dark);
}

.card{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 250px;
  min-width: 250px;
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
