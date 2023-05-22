<template>
  <header class="header">
    <nav class="nav">
      <img
        class="logo"
        src="../assets/etton logo.jpg"
        alt="логотип ООО'Эттон'"
      />
      <ul class="btn__list">
        <li class="btn__item">
          <router-link class="btn__link" to="/" exact active-class="active">
            <span class="btn__text">Главная</span>
          </router-link>
        </li>
        <li class="btn__item">
          <router-link class="btn__link" to="/PageCatalog" active-class="active">
            <span class="btn__text">Каталог</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script></script>

<style lang="scss">
.header {
  display: flex;
  min-height: 70px;
  align-items: center;
  border-bottom: 1px solid blue;
}

.nav {
  display: flex;
  margin: 0;
  padding-left: 20px;
  align-items: center;
}

.logo {
  margin: 0;
  padding-top: 10px;
}

.btn__list {
  display: flex;
  list-style: none;
  width: 200px;
  justify-content: space-around;
  margin: 0;
}

.btn__item {
  border: none;
  cursor: pointer;
  background-color: transparent;
  margin: 0;
}

.btn__link {
  display: inline-block;
  width: 100px;
  line-height: 40px;
  text-align: center;
  text-decoration: none;
  color: black;
  border-radius: 24px;
}

.active {
  background-color: #724df0;
}



</style>
