<template>
  <div class="navbar">
    <div
        class="menu_item"
        @click="$router.push({name:'file_manager'})"
        @mouseup.middle="open_new_tab({name:'file_manager'})"
        :class="{
          active: $route.path.startsWith('/file_manager')
        }"
    >
      <i class="home icon"></i>
    </div>

    <div
        v-if="is_show_project_name"
        class="project_title"
    >
      {{current_project.title}}
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
    current_project(){
      return this.$store.state.presentation.current_project
    },
    is_show_project_name(){
      return this.$route.path.startsWith('/presentation_editor') && this.current_project !== null
    }
  },
  methods:{
    open_new_tab(route_query){
      let path = this.$router.resolve(route_query).fullPath
      let url = window.location.origin + path
      window.open(url,'_blank')
    },
  }
}
</script>

<style scoped>
.navbar{
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;

  text-align: center;
  width: 100%;
  height: 40px;
  line-height: 40px;

  background: var(--blue-dark);
  color: #fff;

  font-size: 20px;
}

.menu_item{
  padding: 0 10px;
  cursor: pointer;
}
.menu_item:hover{
  background: rgba(0,0,0,0.05);
}

.menu_item.active{
  background: rgba(0,0,0,0.15);
}
.menu_item.active:hover{
  background: rgba(0,0,0,0.2);
}

.project_title{
  width: 90%;
  text-align: center;
}

</style>
