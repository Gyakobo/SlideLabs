<template>
  <div class="navbar">
    <button class="menu">
      <i class="ui bars icon"></i>
    </button>
    {{text}}
  </div>
</template>

<script>
export default {
  data (){
    return {
      text:'This is navbar'
    }
  },
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

.menu{
  background: none;
  border: 0;
}

.ui.bars.icon{
  color: #fff;
}

</style>
