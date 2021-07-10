<template>
  <div class="navbar">
    <router-link
        v-for="section in menu_sections"
        :key="section.title"
        :to="{name:section.route_name}"
        custom
        v-slot="{ href, route, navigate, isActive }"
    >
      <div
        class="menu_item"
        :class="{active:isActive}"
        :href="href"
        @click="navigate"
        @mouseup.middle="open_new_tab(route.fullPath)"
      >
        {{section.title}}
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data (){
    return {
      menu_sections:[
        {
          title:'Файлы проектов',
          route_name:'file_manager',
        },
        {
          title:'Редактор презентаций',
          route_name:'presentation_editor',
        },
      ]
    }
  },
  methods:{
    open_new_tab(path){
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
}

.menu_item.active{
  background: rgba(0,0,0,0.1);
  text-decoration: underline;
}

</style>
