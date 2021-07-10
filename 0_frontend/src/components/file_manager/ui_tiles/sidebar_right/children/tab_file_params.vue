<template>
  <div class="main_wrapper">
    <div class="ui teal big button">
      Проекты
    </div>
    <div class="ui basic teal big button">
      Плагины
    </div>
  </div>
</template>

<script>

export default {
  data (){
    return {
    }
  },
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

</style>
