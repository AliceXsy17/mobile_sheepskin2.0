import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartCount: JSON.parse(localStorage.getItem('cart'))
  },
  mutations: {
   countChange(state,n) {
    state.cartCount = n;
    localStorage.setItem("cart", state.cartCount);
   },
   increment(state,n) {
     state.cartCount += n;
     localStorage.setItem("cart", state.cartCount);
     console.log("增加了"+n);
   },
   decrease(state) {
    state.cartCount--;
    localStorage.setItem("cart", state.cartCount);
  },   
   clear(state) {
    state.cartCount = 0;
   },
   //将购物车数量存到localStorage中
   setStorage(state) {
    localStorage.setItem("cart", state.cartCount);
   }
  },
  getters: {
    //读取localStorage中的购物车数量
    getStorage() {
      var count = localStorage.getItem("cart");
      return count;
    }
  }, 
  actions: {

  }
})
