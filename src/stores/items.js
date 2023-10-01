import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNavStore = defineStore('items', {
  state: () => ({
    navLinkActive: ref(false),
    map: ref(false),
    notify: ref(true),
    bell: ref(true),
    active: ref(true),
    screenWidth: 0,
    items: [
      {
        id: 1,
        name:'Преимущества Tele2'
      },
      {
        id: 2,
        name:'Тарифы'
      },
      {
        id: 3,
        name:'Акции и предложения'
      },
      {
        id: 4,
        name:'Промотариф Tele2'
      },
      {
        id: 5,
        name:'Технология eSIM'
      },
      {
        id: 6,
        name:'Подключение нового абонента'
      }
    ],
  }),
  getters: {
    getItems: (state) => state.items,
  }
})
