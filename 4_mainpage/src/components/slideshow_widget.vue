<template>
  <div class="message">
    <!-- Slideshow container -->
    <div class="slideshow-container">

      <!-- Full-width images with number and caption text -->
      <div
        v-for="(slide, idx) in slides"
        :key="idx"
        class="fade"
        :style="{
          display: (idx === slide_index) ? 'block' : 'none'
        }"
      >
        <img :src="require('../assets/img/'+slide)" style="max-width: 100%;height: 100%;">
      </div>
      <div class="dots">

        <span
            v-for="(slide, idx) in slides"
            :key="idx"
            class="dot"
            :class="{
            active: idx === slide_index
          }"
            @click="slide_index = idx"
        ></span>

      </div>
    </div>
    <!-- Next and previous buttons -->
    <a class="prev" @click="plus_slides(-1)">&#10094;</a>
    <a class="next" @click="plus_slides(1)">&#10095;</a>
    <!-- The dots/circles -->

  </div>
</template>

<script>
  export default {
    data(){
      return {
        slides:[
          '1.jpg',
          '2.jpg',
          '3.jpg',
        ],
        slide_index:0
      }
    },
    methods:{
      plus_slides(value){
        this.slide_index = (this.slide_index + value + this.slides.length) % this.slides.length
      },
    },
    created() {
      setInterval(() => this.plus_slides(1), 10000);
    }
  }
</script>

<style scoped>
  .slideshow-container {
    position: absolute;
    text-align: center;
    width:100%;
    height: 100%;
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  /* Next & previous buttons */
  .prev  {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    margin-top: -22px;
    padding: 20px;
    color:  #009892;
    font-weight: bold;
    font-size: 18px;
    transition: 0.6s ease;
    border-radius: 0px 3px 3px 0px;
    user-select: none;
  }
  .next
  {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    margin-top: -22px;
    padding: 20px;
    color:  #009892;
    font-weight: bold;
    font-size: 18px;
    transition: 0.6s ease;
    border-radius: 3px 0px 0px 3px;
    user-select: none;
  }
  /* Position the "next button" to the right */
  .next {
    right: 0;
    border-radius: 3px 0 0 3px;
  }

  /* On hover, add a black background color with a little bit see-through */
  .prev:hover, .next:hover {
    background-color: rgba(0,0,0,0.8);
  }
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  .dots{
    position: absolute;
    top: 90%;
    left:50%;
    margin-top:-12px;
    margin-left:-35px;
    width:65px;
    height:25px;
    user-select: none;
    background-color: rgba(255,255,255,0.5);
    border-radius: 10px;
    padding-right: 3px;
    padding-left: 2px;
  }

  /* The dots/bullets/indicators */
  .dot {
    cursor: pointer;
    height: 15px;
    width: 15px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 2px;
    margin-right: 3px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
  }

  .active, .dot:hover {
    background-color: #717171;
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  /* Fading animation */
  .fade {
    opacity: 1;
    -webkit-animation-name: fade;
    -webkit-animation-duration: 1.5s;
    animation-name: fade;
    animation-duration: 1.5s;
    position: relative;

    height: 100%;
  }


  @-webkit-keyframes fade {
    from {opacity: .0}
    to {opacity: 1}
  }

  @keyframes fade {
    from {opacity: .0}
    to {opacity: 1}
  }
</style>
