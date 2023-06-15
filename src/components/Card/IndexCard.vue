<template>
  <div class="card__container">
    <div class="card__container-button">
      <button @click="backCatalog" class="card__container-btn">
        <img src="../../assets/Frame 1.svg" alt="Фото с котиком" />
        <span class="card__container-text"> Вернуться в Каталог </span>
      </button>
    </div>
    <div class="card__container-photo">
      <img :src="cardData.img ? cardData.img : emptyPhoto" alt="Здесь пока нет кота" class="card__container-img"/>
      <div class="card__container-info">
        <h2 class="card__container-title">{{ cardData.title }}</h2>
        <p class="card__container-content">{{ cardData.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import cats from "../../../cats.json"
import emptyPhoto from "../../assets/add_a_photo_FILL0_wght400_GRAD0_opsz48.svg"

export default {
  data() {
    return {
      id: this.$route.params.id,
      cats: cats,
      cardData: {},
      emptyPhoto: emptyPhoto
    };
  },

  computed: {
    // title() {
    //   return this.$route.query.title
    // },
    // price() {
    //   return this.$route.query.price
    // },
    // photo() {
    //   return this.$route.query.img
    // }
  },


  mounted() {
      this.dataInCard()
  },

  methods: {
    backCatalog() {
      console.log(this.cats)
      this.$router.push("/PageCatalog");
      // localStorage.title = this.cardData.title
    },

    dataInCard() {
      for (const element of this.cats.products) {
          if (element.id === +this.id) {
            this.cardData = { ...element }
          } 
      }
    }
  },

};
</script>

<style>
.card__container {
  display: flex;
  flex-direction: column;
  padding: 25px;
  height: 100vh;
}

.card__container-button {

}

.card__container-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 250px;
    border: 0;
    background-color: white;
    cursor: pointer;
}

.card__container-text {
  cursor: auto;
}

.card__container-photo {
  display: flex;
  padding: 20px;
}

.card__container-img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid gray;
}

.card__container-info {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-left: 50px;
  flex-grow: 1;
}

.card__container-title {
  font-size: 24px; 
  margin: 0;
}

.card__container-content {
  font-size: 24px;
  margin-top: 20px;
}
</style>
