<template>
  <div>
    <header>
    <div class="conteiner">
      <div class="header_body">
        <router-link class="Logo" to="/">
          <img src="../assets/logo.png" alt="Лого">
        </router-link>
        <div class="burger">
          <span></span>
        </div>
        <nav class="header_menu">
          <ul class ="header_list">
            <li>
              <router-link class="link" to="/AboutSlideLab">O SlideLab </router-link>
            </li>
            <li>
              <router-link class="link" to="/Blog">Блог</router-link>
            </li>
            <li>
              <router-link class="link" to="/Gallery">Галерея <span class="arrow-down"></span></router-link>
              <ul class="submenu">
                <li><router-link class="link" to="/PrezTemplates">Шаблоны презентаций</router-link></li>
                <hr>
                <li><router-link class="link" to="/SlidsTemplates">Шаблоны слайдов</router-link></li>
              </ul>
            </li>
            <li>
              <router-link class="link" to="/Price">Цены</router-link>
            </li>
            <li>
              <div class="btn">
                <router-link class="link" to="/Login">Вход</router-link>
              </div>
            </li>
            <li>
              <div class="btn">
                <router-link class="link" to="/Registration">Регистрация</router-link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
    <slot/>
  </div>

</template>

<script>
export default {
  name: "Base"
}
</script>

<style scoped>

</style>