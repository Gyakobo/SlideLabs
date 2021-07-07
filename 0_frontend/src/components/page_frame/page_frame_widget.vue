<template>
  <div>
    <div class="sticky">
      <navbar></navbar>
    </div>

    <div class="content-container">
      <slot></slot>
    </div>

  </div>
</template>

<script>
  import navbar from "./navbar";

  export default {
    components:{
      navbar,
    },
    data(){
      return{
      }
    },
  }
</script>


<style scoped>
  .sticky {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .content-container{
    min-height:  calc(100vh - 40px);
  }

</style>
