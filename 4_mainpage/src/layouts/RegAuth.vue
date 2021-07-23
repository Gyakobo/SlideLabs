<template>
  <div><header>
    <div class="conteiner">
      <div class="header_body">
        <router-link class="Logo" to="/">
          <img src="../assets/logo.png" alt="Лого">
        </router-link>
      </div>
    </div>
  </header>
      <slot/>
  </div>

</template>

<script>
export default {
  name: "RegAuth"
}
</script>

<style scoped>

</style>