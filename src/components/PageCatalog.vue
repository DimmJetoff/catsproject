<template>
  <div class="container" @click="hideList" @keydown.esc="hideList">
    <aside class="sidebar">
      <div class="section__button button-section sidebar__button ">
        <button @click="visibleForm" type="reset" class="button-section__btn">
          Фильтры
        </button>
      </div>
      <form class="form" :class="{active__filter:isActive}" method="post" >
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
          <div class="section__checkbox checkbox-section">
            <label class="checkbox-section__label">
              <input
                type="checkbox"
                class="checkbox-section__input"
                v-model="checkboxFree"
                @click="resetCkeckbox"
              />Бесплатные
            </label>
            <label class="checkbox-section__label">
              <input
                type="checkbox"
                class="checkbox-section__input"
                v-model="checkboxPaid"
                @click="resetCkeckbox"
              />Платные
            </label>
          </div>
        </fieldset>
      </form>
      <div class="section__button button-section button-section__but" :class="{active__filter:isActive}">
        <!-- <button type="button" class="button-section__btn">Применить</button> -->
        <button @click="resetForm" type="reset" class="button-section__btn">
          Сбросить
        </button>
        <!-- <input type="reset" value="Сбросить" class="button-section__input" /> -->
      </div>
    </aside>
    <main class="main">
      <h1 class="title">Каталог</h1>
      <ul class="card__list">
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
      isActive: false
    };
  },

  computed: {
    searchCats() {
      console.log(this.catsFriends);
      return this.catsFriends.filter(
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
        return this.categoriesCats.filter((item) => !item.price);
      }
      return this.checkboxCatsPaid;
    },

    checkboxCatsPaid() {
      if (this.checkboxPaid) {
        return this.categoriesCats.filter((item) => item.price);
      }
      return this.categoriesCats;
    },

    // мой рабочий вариант с использованием value и массива с этими value//

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

  methods: {
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
      console.log("fdfs");
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

    // Мой вариант фильтрации с помощью чекбоксов через метод

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
        (this.$refs.category.textContent = "Выберите категорию");
      (this.checkboxFree = false), (this.checkboxPaid = false);
      // this.checkboxCats = []
    },

    resetCkeckbox() {
      this.checkboxFree = false;
      this.checkboxPaid = false;
    },

    visibleForm() {
      console.log('222');
      this.isActive = !this.isActive;
      console.log(this.isActive);

    }
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
  // overflow-y: hidden;
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
  color: #724df0;
}

.button-section__btn:hover {
  background: #724df0;
  cursor: pointer;
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

.title {
  padding: 50px 0 0 0;
  margin: 0;
}

.card__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  list-style: none;
  margin: 50px 0;
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
    visibility: hidden;
  }
  .button-section__but {
    visibility: hidden;
  }

  .container {
    flex-direction: column;
  }

  .form {
  justify-content: center;
 }
  // .sidebar {
  //   height: 10vh;
  // }
  .sidebar {
    height: fit-content;
  }
 }



  .active__filter {
  visibility: visible;
  background-color: white;
}


</style>
