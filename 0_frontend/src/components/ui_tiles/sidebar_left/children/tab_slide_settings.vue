<template>
  <div class="slide_components_tree">
    <div class="item">
      <span>
        Соотношение сторон
      </span>

      <select v-model="project_settings.aspect_ratio_wh">
        <option v-for="option in aspect_ratio_wh_options" :key="option.text" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data (){
    return {
      project_settings:this.$store.state.project_settings,
      aspect_ratio_wh_options: [
        { text: '4:3', value: 4/3 },
        { text: '16:9', value: 16/9 },
        { text: '2:1', value: 2 }
      ]
    }
  },
  created() {
    this.project_settings.aspect_ratio_wh = this.aspect_ratio_wh_options[1].value
  }
}
</script>

<style scoped>
.slide_components_tree{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background: #eee;
  color: var(--black);

  font-size: 20px;
}

.item{

}

</style>
