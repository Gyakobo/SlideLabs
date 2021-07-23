<template>
  <div class="wrapper">
    <slideshow/>
  <div class="content">
    <div class="btn">
      <router-link class="link" to="/GetStarted">Начать!</router-link>
    </div>
  </div>
</div>
</template>



<script>
import slideshow from '../components/slideshow_widget.vue'
export default {
  name: "Home",
  data(){
    return{
      sliderItems:[
        {id:1, name: 'img1',img: '1.jpg'},
        {id:2, name: 'img2',img: '2.jpg'},
        {id:3, name: 'img3',img: '3.jpg'},
      ]
    }
  },
  components:{
    slideshow,
  }
}
</script>

<style scoped>

</style>