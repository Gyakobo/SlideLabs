<template>
  <div class="main_wrapper">
    <div v-if="active_project === null">
      Проект не выбран
    </div>
    <div v-else class="params_group">
      <h3>Параметры проекта</h3>
      <div
          v-for="(item, key) in active_project"
          :key="key"
          class="item"
      >
        <span>{{key}}:</span>

        <input
            v-if="is_edit_mode"
            type="text"
            :value="item"
            @change="active_project[key] = $event.target.value"
        >
        <span v-else>{{item}}</span>


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
    </div>


  </div>
</template>

<script>

export default {
  data (){
    return {
      is_edit_mode:false,
      last_project_id:'',
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
