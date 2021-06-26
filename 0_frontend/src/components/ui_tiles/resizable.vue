<template>
  <div :id="id" class="resizable" :style="{width:width, height:height}">
    <div class="no-pointer">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data (){
    return {
      resizable:null,
      width:0,
      height:0,

      drag_direction:null,
      start_mouse_x:0,
      start_mouse_y:0,
      start_width:0,
      start_height:0,
    }
  },
  props:{
    id:{
      type:String,
      required:true,
    },

    init_width:{
      type:String,
      default:'100%',
    },
    min_width:{
      type:Number,
      default:0,
    },
    max_width:{
      type:Number,
      default:Infinity,
    },

    init_height:{
      type:String,
      default:'100%',
    },
    min_height:{
      type:Number,
      default:0,
    },
    max_height:{
      type:Number,
      default:Infinity,
    },

    padding_tblr:{
      type:Array,
      default:() => {return [5,5,5,5]},
    }
  },
  methods:{
    constrain(v, v_min, v_max){
      return Math.max(v_min, Math.min(v_max, v))
    },
    constrain_width(width){
      return this.constrain(width, this.min_width, this.max_width)
    },
    constrain_height(height){
      return this.constrain(height, this.min_height, this.max_height)
    },
    mousedown_listener(event){
      if (event.which !== 1){
        return
      }

      let x = event.pageX;
      let y = event.pageY;

      let rect = this.resizable.getBoundingClientRect()

      if (x < rect.left ||
          x >= rect.right ||
          y < rect.top ||
          y >= rect.bottom){
        return
      }

      this.drag_direction = null
      if (y - rect.top < this.padding_tblr[0]){
        this.drag_direction = 'top'
      }
      else if (rect.bottom - y < this.padding_tblr[1]){
        this.drag_direction = 'bottom'
      }
      else if (x - rect.left < this.padding_tblr[2]){
        this.drag_direction = 'left'
      }
      else if (rect.right - x < this.padding_tblr[3]){
        this.drag_direction = 'right'
      }

      if (this.drag_direction === null){
        return
      }
      this.start_mouse_x = x
      this.start_mouse_y = y
      this.start_width = rect.width
      this.start_height = rect.height
    },
    mouseup_listener(event){
      if (event.which !== 1){
        return
      }
      this.drag_direction = null
    },
    mousemove_listener(event){
      if (this.drag_direction === null){
        return
      }
      if (event.which !== 1){
        this.drag_direction = null
        return
      }


      let diff_x = event.pageX - this.start_mouse_x
      let diff_y = event.pageY - this.start_mouse_y

      let height, width
      switch (this.drag_direction) {
        case 'top':
          height = this.start_height - diff_y
          height = this.constrain_height(height)
          this.height = height + 'px'
          break;
        case 'bottom':
          height = this.start_height + diff_y
          height = this.constrain_height(height)
          this.height = height + 'px'
          break;
        case 'left':
          width = this.start_width - diff_x
          width = this.constrain_width(width)
          this.width = width + 'px'
          break;
        case 'right':
          width = this.start_width + diff_x
          width = this.constrain_width(width)
          this.width = width + 'px'
          break;
      }
    },
    add_listeners(){
      document.addEventListener('mousedown', this.mousedown_listener)
      document.addEventListener('mouseup', this.mouseup_listener)
      document.addEventListener('mousemove', this.mousemove_listener)
    },
    remove_listeners(){
      document.removeEventListener('mousedown', this.mousedown_listener)
      document.removeEventListener('mouseup', this.mouseup_listener)
      document.removeEventListener('mousemove', this.mousemove_listener)
    },
  },
  mounted() {
    this.width = this.init_width
    this.height = this.init_height

    this.resizable = document.getElementById(this.id);
    let tblr = this.padding_tblr
    this.resizable.style.padding = `${tblr[0]}px ${tblr[3]}px ${tblr[1]}px ${tblr[2]}px`

    this.add_listeners()
  },
  beforeUnmount() {
    this.remove_listeners()
  }
}
</script>

<style scoped>
.resizable{
  background: #999;
  cursor: col-resize;
}
.no-pointer{
  width: 100%;
  height: 100%;
  cursor: default;
}
</style>
