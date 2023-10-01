<script setup>
  import { computed, onMounted } from 'vue';

  import { useNavStore } from '@/stores/items';
  const store = useNavStore();

  const items = computed(() => store.getItems);

  const onScreenResize = () => {
    window.addEventListener("resize", () => {
      updateScreenWidth();
      });
    }

  const updateScreenWidth = () => {
    store.screenWidth = window.innerWidth;
    if(store.screenWidth <= 1280) {
      store.active = false
    } else if (store.screenWidth > 1280) {
      store.active = true
    }
  }

  const show = () => {
    store.active = !store.active
    store.map = !store.map
  }

  onMounted(() => {
    updateScreenWidth();
    onScreenResize();
  })
</script>

<template>
  <div class="header">
    <div class="header__top">
      <div class="container">
        <div class="header__top-inner">
          <div class="header__top-left">
            <img src="../assets/Logo.svg" alt="tele2">
          </div>
          <div class="header__top-right">
            <a href="#">
              <div class="header__map-wrapper header--map-top">
                <img src="../assets/location.svg" alt="location" class="header__map-icon">
                <p class="header__map-text ">Москва и область</p>
              </div>
            </a>
            <div class="bell__wrapper"    
              @mouseover="store.bell = true"
              @mouseout="store.bell = false"
              :class="{ active: store.bell }"
              @click="store.notify = !store.notify"
              >
              <img class="bell__icon" src="../assets/notification-bell.svg" alt="notification">
              <div class="bell__notify" v-if="store.notify"></div>
            </div>
            <div class="nav-wrapper" @click="show">
              <div class="nav-container">
                <input class="checkbox" type="checkbox" />
                <div class="hamburger-lines">
                  <span class="line line1"></span>
                  <span class="line line2"></span>
                  <span class="line line3"></span>
                </div>  
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
    <div class="header__bottom">
      <div class="container">
        <div class="header__bottom-inner">
          <Transition name="show">
            <div class="nav__inner" v-if="store.active">
              <nav class="nav">
                <p class="nav__item" 
                  v-for="item in items" 
                  :key="item.name" 
                  :class="items.includes(item.id) ? 'active' : ''"
                  @mouseover="store.navLinkActive = true"
                  @mouseout="store.navLinkActive = false"
                >{{ item.name }}</p>
              </nav>
              <div class="header__map-wrapper header--map-bottom" v-if="store.map">
                <img src="../assets/location.svg" alt="location" class="header__map-icon">
                <p class="header__map-text header--map-bottom-text">Москва и область</p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
// Normalize
  input {
    margin: 0;
  }
  a {
    text-decoration: none; 

    color: inherit;
  }
  .container {
    margin: 0 auto;
    padding: 0 162px;
    max-width: 1160px;

    color: #7C8792;
  }
  .header {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  
    &__top {
      background-color: #1F2229;
      z-index: 5;
    }
    &__top-inner {
      padding: 8px 0;

      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__top-right {
      display: flex;
      align-items: center;
      justify-content: space-between;  
    }
    &__map-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 32px;
    }
    &__bottom {
    background-color: #fff;
    }
  }

  .bell {
    &__wrapper {
    margin-left: 39px;
    position: relative;
  }
  &__notify {
    position: absolute;
    right: 0;
    top: 1px;
    width: 6px;
    height: 6px;
    border: 2px solid #1F2229;
    border-radius: 50%;
    z-index: 5;
    background-color: #3FCBFF;
    }
  }  
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between; 
    background-color: #fff;  
    &__item {
      position: relative;
      padding: 14px 0;
      text-align: center;
      color: #7C8792;
      &.active {
        color: #1F2229;
      }
      &:hover {
        color: #1F2229;
        cursor: pointer;
      }
    }
    &__item:after {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #1F2229;
      content: '';
      opacity: 0;
      transition: all .5s ease;
    }
    
    &__item:hover.nav__item:after{
      opacity: 1;
    }
  }
  

/* Buger button */
.nav-wrapper {
  margin-left: 20px;
  display: none;
  height: 14px;
  width: 18px;
}
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.nav-container .checkbox {
  position: absolute;
  display: block;
  height: 14px;
  width: 18px;
  top: 50%;
  right: 0;
  transform: translateY(-8%);
  z-index: 5;
  opacity: 0;
  cursor: pointer;
}
.nav-container .hamburger-lines {
  display: block;
  height: 14px;
  width: 18px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-8%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #1F2229;
}

.nav-container .hamburger-lines .line {
  display: block;
  height: 3px;
  width: 100%;
  border-radius: 10px;
  background: #fff;
}

.nav-container .hamburger-lines .line1 {
  transform-origin: 0% -2px;
  transition: transform 0.4s ease-in-out;
}

.nav-container .hamburger-lines .line2 {
  transition: transform 0.2s ease-in-out;
}

.nav-container .hamburger-lines .line3 {
  transform-origin: 0% 5px;
  transition: transform 0.4s ease-in-out;
}
.nav-container input[type="checkbox"]:checked ~ .hamburger-lines .line1 {
  transform: rotate(45deg);
}

.nav-container input[type="checkbox"]:checked ~ .hamburger-lines .line2 {
  transform: scaleY(0);
}

.nav-container input[type="checkbox"]:checked ~ .hamburger-lines .line3 {
  transform: rotate(-45deg);
}
/* Nav animation */
.show-enter-from {
  left: -100%;
}
.show-enter-to {
  left: 0;
}
.show-enter-active {  
  transition: all 1s;
}
.bell__wrapper.active:hover {
  cursor: pointer;
}
.bell__wrapper.active {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
/* Media queries */
@media (max-width: 1280px) {
  .container {
    padding: 0 18px;
  }
  .nav-wrapper {
    display: block;
  }
  .header {
    &__map-wrapper.header--map-top {
      display: none;
    }
    &__map-wrapper.header--map-bottom {
      position: absolute;
      bottom: 0;
      color:#959597;
    }
  }
  .nav {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 18px;
    position: absolute; 
    &__inner {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-direction: column;
    }
    &__item{
      padding: 8px 0;
      width: 100%;
      text-align: start;
    }
    &__item:after {
      opacity: 1;
      height: 1px;
      background-color: #EDEDED;
    }
  }
}
</style>