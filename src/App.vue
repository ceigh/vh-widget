<template>
<div class="container">
  <div class='head'>
    <img src='./assets/logo.svg' alt='халва' />
    <img class='close' src='./assets/close.svg' alt='x' />
  </div>

  <div class='content'>
    <div class='content-main'>
      <p class='content-main-text'>
        Этот товар можно оплатить частями Виртаульной Халвой за:
      </p>
      <p class='content-main-cost'>2 330 ₽/ месяц</p>
    </div>

    <img class='content-item' :src='itemImg' alt='товар' />
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      itemImg: 'https://img.mvideo.ru/Pdb/50126638b.jpg'
      // itemImg: 'https://picsum.photos/400/300'
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'modern-css-reset';
@import './assets/styles/fonts';

.container {
  position: absolute;
  left: 3rem;
  bottom: 3rem;
  width: 443px;
  height: 208px;
  padding: 1rem;
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
      font-family: 'SF Pro Display', sans-serif;
      font-weight: bold;
      font-size: 22px;
      color: #000;
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
</style>
