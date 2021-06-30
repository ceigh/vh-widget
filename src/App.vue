<template>
<div class="container">
  <div class='head'>
    <img src='./assets/img/logo.svg' alt='халва' />
    <img class='close' src='./assets/img/close.svg' alt='x' />
  </div>

  <div class='content'>
    <div class='content-main'>
      <p class='content-main-text'>
        Этот товар можно оплатить частями Виртаульной Халвой за:
      </p>

      <p class='content-main-cost'>
        <span>2 330 ₽/ месяц</span>
        <img src='./assets/img/tip.svg' alt='?' />
      </p>

      <app-button>Получить Виртуальную Халву</app-button>
    </div>

    <img class='content-item' :src='itemImg' alt='товар' />
  </div>

  <div class='footer'>
    <p>0₽ - первый платёж</p>
    <p>0₽ - переплат</p>
    <p>4 мес. - рассрочка</p>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppButton from './components/app/AppButton.vue'

export default defineComponent({
  components: {
    AppButton
  },

  setup () {
    return {
      itemImg: 'https://img.mvideo.ru/Pdb/50126638b.jpg'
      // itemImg: 'https://picsum.photos/400/300'
    }
  }
})
</script>

<style lang="scss" scoped>
@import './assets/styles/reset.scss';
@import './assets/styles/fonts';

.container {
  position: absolute;
  left: 3rem;
  bottom: 3rem;
  width: 443px;
  height: 208px;
  padding: 16px;
  color: #2e2e2e;
  background: #fff;
  box-shadow: 0 4px 25px rgba(23, 19, 29, 0.12);
  border-radius: 7px;
  font-family: 'SF Pro Text', sans-serif;
}

.head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;

  .close {
    cursor: pointer;
  }
}

.content {
  display: flex;
  justify-content: space-between;

  &-main {
    &-text {
      width: 259px;
      height: 40px;
      font-size: 15px;
      line-height: 20px;
      letter-spacing: -0.36px;
      margin-bottom: 12px;
    }

    &-cost {
      height: 22px;
      font-family: 'SF Pro Display', sans-serif;
      font-weight: bold;
      font-size: 22px;
      color: #000;
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      img {
        margin-left: 7px;
        cursor: pointer;
      }
    }
  }

  &-item {
    $size: 80px;

    width: $size;
    height: $size;
    object-fit: contain;
    background: #fff;
    border: 1px solid #e4e4e4;
    border-radius: 3px;
  }
}

.footer {
  max-width: 284px;
  height: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  line-height: 20px;
  letter-spacing: -0.36px;
  margin-top: 17px;
}
</style>
