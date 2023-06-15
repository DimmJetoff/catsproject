<template>
  <div class="container" ref="container" @click="hideList">
    <aside class="sidebar">
      <div class="section__button button-section sidebar__button">
        <button @click="visibleForm" type="reset" class="button-section__btn">
          Фильтры
        </button>
      </div>
      <form class="form" :class="{ active__filter: isActive }" method="post">
        <ul v-if="showCategory" class="section__items">
          <li
            class="section__item"
            v-for="category in categories.options"
            :key="category.id"
            @click="changeCategory(category.id)"
          >
            {{ category.label }}
          </li>
        </ul>
        <fieldset class="section">
          <div class="">
            <input
              v-model="searchCategory"
              type="text"
              placeholder="Поиск"
              class="section__input"
            />
          </div>
          <div class="section__title" @click.stop="iconHandle">
            <div class="section__text" ref="category">
              <span class="section__span">Выберите категорию</span>
            </div>
            <div
              class="section__img"
              :style="{ transform: 'rotate(' + degrise + 'deg)' }"
            >
              <img
                src="../assets/expand_more_FILL0_wght400_GRAD0_opsz48.svg"
                alt="dropdown icon"
                class="material-symbols-outlined"
              />
            </div>
          </div>
          <div class="section__checkbox checkbox-section">
            <label class="checkbox-section__label">
              <input
                type="checkbox"
                class="checkbox-section__input"
                v-model="checkboxFree"
              />Бесплатные
            </label>
            <label class="checkbox-section__label">
              <input
                type="checkbox"
                class="checkbox-section__input"
                v-model="checkboxPaid"
              />Платные
            </label>
          </div>
        </fieldset>
      </form>
      <div
        class="section__button button-section button-section__but"
        :class="{ active__filter: isActive }"
      >
        <!-- <button type="button" class="button-section__btn">Применить</button> -->
        <button @click="resetForm" type="radio" class="button-section__btn">
          Сбросить
        </button>
        <!-- <input type="reset" value="Сбросить" class="button-section__input" /> -->
      </div>
    </aside>
    <main class="main">
      <div class="control">
        <h1 class="control__title">Каталог</h1>
        <div
          class="control__icon"
          :class="{ rotateIcon: activeRotate }"
          @click="showPriceSort"
        >
          <span></span>
          <img
            src="../assets/Vector 163.svg"
            class="control__pic"
            :class="{ control__picture: noRotateVector }"
          />
          <p :class="{ control__text: noRotate }">По цене</p>
        </div>
      </div>
      <ul class="card__list">
        <template v-if="checkboxCatsFree.length">
          <li
            class="card__item"
            v-for="(cat, index) in checkboxCatsFree"
            :key="index"
          >
            <div class="card__cartoon" v-if="cat.img">
              <img :src="cat.img" alt="Карточка кота" class="card__img" />
            </div>

            <div class="card__cartoon" v-else>
              <img
                src="../assets/add_a_photo_FILL0_wght400_GRAD0_opsz48.svg"
                alt="Карточка кота"
                class="card__img"
              />
            </div>

            <router-link
              class="card__btn"
              :to="{ name: 'IndexCard', params: { id: cat.id } }"
            >
              <h2 class="card__title">{{ cat.title }}</h2>
            </router-link>

            <p class="card__price">
              {{ cat.price === 0 ? "Бесплатно" : cat.price }}
            </p>
          </li>
        </template>
        <div v-else>Сожалеем, но таких котиков пока нет.</div>
      </ul>
    </main>
  </div>
</template>

<script>
import cats from "/cats.json";
import emptyPhoto from "../assets/add_a_photo_FILL0_wght400_GRAD0_opsz48.svg";
import categories from "/categories.json";

export default {
  components: {},

  data() {
    return {
      emptyPhoto,
      hide: false,
      showCategory: false,
      // catsCategories: [],
      catsFriends: cats.products,
      catsValues: cats.products.map((item) => JSON.parse(JSON.stringify(item))),
      searchCategory: "",
      categoryId: null,
      checkboxFree: false,
      checkboxPaid: false,
      degrise: null,
      show: true,
      isActive: false,
      activeRotate: false,
      noRotate: false,
      displayIcon: false,
      noRotateVector: false,
    };
  },

  computed: {
    sortCats() {
      const catsSort = JSON.parse(JSON.stringify(this.catsFriends));
      if (this.activeRotate === true) {
        return catsSort.sort((a, b) => b.price - a.price);
      }
      return catsSort.sort((a, b) => a.price - b.price);
    },

    searchCats() {
      return this.sortCats.filter(
        (item) =>
          item.title
            .toLowerCase()
            .indexOf(this.searchCategory.toLowerCase()) !== -1
      );
    },

    categoriesCats: {
      get: function () {
        if (!this.categoryId) {
          return this.searchCats;
        }
        return this.searchCats.filter(
          (item) => item.categories.indexOf(this.categoryId) !== -1
        );
      },
      set: function (newValue) {
        this.catsFriends = newValue;
      },
    },

    categories() {
      return categories;
    },

    checkboxCatsFree() {
      if (this.checkboxFree) {
        console.log(this.categoriesCats);
        console.log(this.categoriesCats.filter((item) => !item.price));
        return this.categoriesCats.filter((item) => !item.price);
      }
      return this.checkboxCatsPaid;
      // рабочий вариант с использованием value и массива с этими value//

      // checkboxCatsFree() {
      //   if (this.checkboxCats.includes('free')) {
      //     return this.categoriesCats.filter(item => !item.price)
      //   } else if (this.checkboxCats.includes('paid')) {
      //     return this.categoriesCats.filter(item => item.price)
      //   }
      //   return this.categoriesCats
      // },

      // еще один вариант без value//

      // checkboxCatsFreeOrPaid() {
      //   if (this.checkboxFree) {
      //     return this.categoriesCats.filter((item) => !item.price)
      //   } else if (this.checkboxPaid) {
      //     return this.categoriesCats.filter((item) => item.price)
      //   }
      //   return this.categoriesCats
      // }
    },

    checkboxCatsPaid() {
      if (this.checkboxPaid) {
        return this.categoriesCats.filter((item) => item.price);
      }
      return this.categoriesCats;
    },
  },

  mounted() {
    // this.backFilter()
  },

  methods: {
    // backFilter() {
    //   if (localStorage.title) {
    //     this.checkboxFree = true
    //     localStorage.clear()
    //   }
    // },

    iconHandle() {
      this.show = !this.show;
      if (this.show) {
        this.degrise = 0;
        this.hideList();
      } else {
        this.degrise = 180;
        this.showList();
      }
    },

    showList() {
      this.showCategory = true;
    },

    hideList() {
      this.showCategory = false;
      document.querySelector(".section__img").style.transform = "rotate(0)";
    },

    changeCategory(id) {
      if (this.categories.options.length) {
        for (const elem of this.categories.options) {
          if (elem.id === id) {
            this.$refs.category.textContent = elem.label;
            document.querySelector(".section__img").style.transform =
              "rotate(0)";
          }
        }
      }
      this.categoriesId(id);
    },

    categoriesId(id) {
      this.categoryId = id;
    },


    // вариант фильтрации с помощью чекбоксов через метод

    // changePrice(event) {
    //   if (event.target.checked) {
    //     if (event.target.value === "free") {
    //       this.categoriesCats = this.catsFriends.filter((item) => !item.price);
    //     } else {
    //       this.categoriesCats = this.catsFriends.filter((item) => item.price);
    //     }
    //   } else {
    //     this.categoriesCats = this.catsValues;
    //   }
    // },

    resetForm() {
      // (this.categoriesCats = this.catsValues),
      (this.searchCategory = ""),
      (this.categoryId = null),
      (this.$refs.category.textContent = "Выберите категорию"),
      (this.checkboxFree = false),
      (this.checkboxPaid = false)
      // this.checkboxCats = []
      if (this.$refs.container.style.width < 768) {
          this.isActive = false
      }
    },

    visibleForm() {
      this.isActive = !this.isActive;
    },

    showPriceSort() {
      this.activeRotate = !this.activeRotate;
      this.noRotate = !this.noRotate;
      this.displayIcon = !this.displayIcon;
      this.noRotateVector = !this.noRotateVector;

      //Вариант сортировки через метод
      // if (this.activeRotate === true) {
      //   this.checkboxCatsFree.sort((a, b) => a.price - b.price);
      // } else {
      //   this.checkboxCatsFree.sort((a, b) => b.price - a.price);
      // }
    },
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
  flex-grow: 1;
  width: 100%;
}

// .container:hover {
//   overflow-y: auto;
// }

// .container:focus {
//   overflow-y: auto;
// }

.sidebar {
  padding: 30px;
}

.sidebar__button {
  visibility: hidden;
}

.section {
  display: flex;
  flex-direction: column;
  padding: 100px 0 0 0;
  border: 0;
  gap: 20px;
  width: 250px;
  position: relative;
}

.input-section {
  display: flex;
  flex-direction: row;
}

.section__input {
  padding: 5px 0 5px 5px;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  width: 100%;
  background-image: url("../assets/search_FILL0_wght400_GRAD0_opsz48.svg");
  background-repeat: no-repeat;
  background-position: 225px 5px;
  background-size: 20px 20px;
}

.section__input:focus {
  outline: none;
}

.section__input::placeholder {
}

.section__title {
  display: flex;
  border-bottom: 2px solid;
  padding-left: 5px;
  color: gray;
  width: 100%;
  position: relative;
  cursor: pointer;
  height: 25px;
}

.section__text {
  flex-grow: 1;
  position: absolute;
  bottom: 5px;
}

.section__img {
  position: absolute;
  right: 5px;
  top: 1px;
  bottom: 5px;
}

.section__items {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid gray;
  border-radius: 14px;
  margin-top: -15px;
  position: absolute;
  width: 255px;
  top: 360px;
  z-index: 100;
  background-color: white;
}

.section__item {
  padding: 8px 12px;
  cursor: pointer;
}

.section__item:hover {
  background-color: #724df0;
  color: white;
}

.section__item:first-child:hover {
  border-radius: 12px 12px 0 0;
}

.section__item:last-child:hover {
  border-radius: 0 0 12px 12px;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
  width: 20px;
  height: 20px;
}

.section__checkbox {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.checkbox-section__input {
  margin-right: 10px;
}

.section__button {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
}

.button-section__btn {
  display: inline-block;
  height: 40px;
  border: 1px solid #724df0;
  border-radius: 24px;
  cursor: pointer;
  // color: #724df0;
}

.button-section__btn:active {
  background: #724df0;
  color: white;
}

.button-section__input {
  border: 0;
  height: 40px;
  border: 1px solid #724df0;
  border-radius: 24px;
  color: #724df0;
}

.button-section__input:hover {
  background: #724df0;
  cursor: pointer;
  color: white;
}

.main {
  display: flex;
  flex-direction: column;
  background-color: rgb(163, 40, 171);
  padding: 25px;
  width: 100%;
}

.control {
  display: flex;
  height: 150px;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;

  &__title {
    padding: 50px 0 0 0;
    margin: 0;
  }
}

.control__icon {
  display: flex;
  width: 200px;
  height: 30px;
  align-self: flex-end;
  align-items: center;
}

.control__icon:hover {
  cursor: pointer;
}

.control__icon span {
  display: block;
  width: 20px;
  height: 2px;
  background-color: black;
  margin-right: 10px;
  margin-left: 20px;
}

.control__icon span::before,
.control__icon span::after {
  display: block;
  background-color: black;
  content: "";
  height: 2px;
}

.control__icon span::before {
  transform: translate(0, -8px);
  width: 15px;
}

.control__icon span::after {
  width: 25px;
  transform: translate(0, 5px);
}

.control__pic {
  height: 20px;
  margin-top: -2px;
  margin-right: 5px;
}

.rotateIcon {
  transform: rotate(180deg) translate(140px, 0);
}

.control__picture {
  transform: translate(-45px);
  margin-left: -5px;
  margin-right: 18px;
}

.control__img {
  display: flex;
  flex-direction: column;
  height: 105px;
  justify-content: flex-start;
}

.control__text {
  margin: 0;
  transform: translate(-150px, 0) rotate(180deg);
}

.card__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  list-style: none;
  padding: 0;
}

.card__item {
  display: flex;
  flex-direction: column;
  // justify-content: flex-start;
  border: 1px solid gray;
  border-radius: 12px;
  width: 250px;
  height: 360px;
}

.card__cartoon {
  width: 100%;
  height: 65%;
}

.card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
  border: 0.1px solid gray;
  box-sizing: border-box;
}

.card__btn {
  display: inline-block;
  padding: 12px;
  text-decoration: none;
  color: black;
}

.card__title {
  height: 40px;
  margin: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card__price {
  padding: 15px;
  margin: 0;
  align-self: flex-end;
}

@media (max-width: 768px) {
  .sidebar__button {
    visibility: visible;
  }
  .form {
    display: none;
  }
  .button-section__but {
    display: none;
  }

  .container {
    flex-direction: column;
  }

  .sidebar {
    height: -moz-fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .section {
    padding: 16px;
  }

  .sidebar__button {
    margin-bottom: 10px;
  }

  .main {
    justify-content: center;
  }

  .button-section__btn:active {
  background: #724df0;
  color: white;
  }

}



.active__filter {
  display: flex;
  background-color: white;
}
</style>
