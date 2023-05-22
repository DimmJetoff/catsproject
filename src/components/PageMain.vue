<template>
  <div class="container__main">
    <main class="main_page">
      <h1 class="title">Главная</h1>
    </main>
  </div>
</template>

<script>

export default {
  components: {
  },
  data: () => {
    return {};
  },
};
</script>

<style lang="scss">
.container__main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin: 0;
  flex-grow: 1;
}

.main_page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(163, 40, 171);
  flex-grow: 1;
}

.title {
  margin: 0;
  line-height: 120%;
}

// //--Медиазапрос

// @media (max-width: 1000px) and (max-height:1000px){

// .header {
//    padding-top: 0.1em;
// }

//  .logo {
//    margin: 0;
//    padding: 1px;
//  }

//  .btn {
//    margin: 0;
//    padding: 1px;
//  }

//  .text {
//    margin: 0;
//    padding: 1px;
//    font-size: 14px;
//  }

//  .main {
//   align-content: center;
//   margin: 0 auto;

//  }

//  .some-text {
//   height: 1vh;
//   font-family: $font;
//   font-size: 14px;
//   margin: 2px;
//  }

//  .title {
//    margin: 0;
//    align-self: center;
//    font-size: 14px;

//  }

//  .footer {
//   width: 100vmin;
//   align-items: center;
//   padding-top: 1em;
//   flex-wrap: wrap;
//   // align-content: space-between;

//  }

//  .myname {
//    margin: 0;
//    font-size: 14px;
//  }

//  .link {
//    margin: 0;
//    font-size: 14px;
//  }

//  .link-container {
//   padding-right: 0.75em;
//  }
// }
</style>
