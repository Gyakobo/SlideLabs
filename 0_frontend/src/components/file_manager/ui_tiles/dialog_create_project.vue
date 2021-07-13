<template>
  <div
      v-if="is_show"
      class="main_wrapper"
  >
    <div class="dialog">
      <h3 style="text-align: center">Создание проекта</h3>
      <div
          v-for="(item, key) in project_fields"
          :key="key"
          class="item"
      >
        <span>{{key}}:</span>

        <input
            type="text"
            v-model="project_fields[key]"
        >
      </div>
      <div
          @click="dialog_exit(true)"
          class="ui teal button"
      >
        Создать проект
      </div>
      <div
          @click="dialog_exit(false)"
          class="ui basic teal button"
      >
        Отмена
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data (){
    return {
      project_fields:{
        project_id:'',
        title:'',
      }
    }
  },
  props:{
    is_show:{
      type:Boolean,
      required:true,
    }
  },
  methods:{
    async dialog_exit(is_ok){
      if (is_ok){
        await this.$store.dispatch('create_project', this.project_fields)
      }

      this.project_fields.project_id = ''
      this.project_fields.title = ''
      this.$emit('dialog_exit', is_ok)
    },
  }
}
</script>

<style scoped>
.main_wrapper{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  background: rgba(0,0,0,0.5);

  z-index: 9999;
}

.dialog{
  position: absolute;
  left:30vw;
  top:30vh;
  width:40vw;
  height:40vh;

  border: 2px solid var(--blue-dark);
  border-radius: 10px;
  background: #eee;

  padding: 15px 20px;

  display: flex;
  flex-direction: column;
}

.ui.button{
  margin: 5px;
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
