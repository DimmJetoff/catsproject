<template>
  <footer class="footer">
    <p class="myname">Кожурин Дмитрий Михайлович</p>
    <div class="link-container">
      <a class="link" href="https://www.artstation.com/dimdim5">MyWork</a>
    </div>
  </footer>
</template>

<script></script>

<style lang="scss">
.footer {
  display: flex;
  min-height: 70px;
  background-color: aqua;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  border-top: 1px solid blue;
}

.myname {
  margin: 0;
  padding-left: 20px;
}

.link {
  text-decoration: none;
  padding-right: 20px;
}
</style>
