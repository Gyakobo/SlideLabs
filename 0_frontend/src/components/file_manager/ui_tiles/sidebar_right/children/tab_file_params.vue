<template>
  <div class="main_wrapper">
    <div v-if="active_project === null">
      Проект не выбран
    </div>
    <div v-else class="params_group">
      <h3>Параметры проекта</h3>
      <div
          v-for="key in project_settings_keys"
          :key="key"
          class="item"
      >
        <span>{{key}}:</span>

        <input
            v-if="is_edit_mode"
            type="text"
            :value="active_project[key]"
            @change="on_prop_change(key, $event)"
        >
        <span v-else>{{active_project[key]}}</span>


      </div>
      <div
          v-if="is_edit_mode"
          @click="stop_edit(true)"
          class="ui big orange button"
      >
        Сохранить
      </div>
      <div
          v-else
          @click="start_edit()"
          class="ui big teal button"
      >
        Редактировать
      </div>

      <div class="flex-spacer">
      </div>

      <div
          class="ui big basic red button"
          @click="delete_project()"
      >
        Удалить проект
      </div>
    </div>


  </div>
</template>

<script>

export default {
  data (){
    return {
      is_edit_mode:false,
      last_project_id:'',
      project_settings_keys: ['project_id', 'title'],
    }
  },
  computed:{
    active_project(){
      return this.$store.state.file_manager.active_project
    }
  },
  watch:{
    active_project(){
      this.stop_edit(false)
    }
  },
  methods:{
    on_prop_change(key, event){
      console.log('on_change', key, event.target.value)
      this.active_project[key] = event.target.value
    },
    start_edit(){
      this.is_edit_mode = true
      this.last_project_id = this.active_project.project_id
    },
    stop_edit(is_save_result){
      this.is_edit_mode = false

      if (is_save_result){
        this.$store.dispatch('update_active_project', {last_project_id:this.last_project_id})
      }
    },
    delete_project(){
      if (this.active_project === null) {
        alert('Проект не выбран!');
      }

      let is_confirm = confirm(`Вы уверены, что хотите удалить проект "${this.active_project.title}"?`)

      if (is_confirm){
        this.$store.dispatch('delete_active_project')
      }
    }
  }
}
</script>

<style scoped>
.main_wrapper{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: 10px 10px;
}

.ui.button{
  margin: 5px;
}

.params_group{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

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

.flex-spacer{
  flex-grow: 1;
}

</style>
