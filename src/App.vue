<template>
  <div class="container">
    <div class="head">
      <img
        src="./assets/img/logo.svg"
        alt="халва"
      >
      <img
        class="close"
        src="./assets/img/close.svg"
        alt="x"
      >
    </div>

    <div class="content">
      <div class="content-main">
        <div
          v-if="['catalog', 'catalogParts'].includes(style)"
          class="content-main-text-catalog"
        >
          <p v-if="style === 'catalog'">
            Купить сейчас,
            <br>
            <span class="content-main-text-catalog-highlight">
              а заплатить потом!
            </span>
          </p>

          <p v-else-if="style === 'catalogParts'">
            Зачем платить всё сразу, если
            <span class="content-main-text-catalog-highlight">
              можно Частями?
            </span>
          </p>
        </div>

        <p
          v-else
          class="content-main-text"
        >
          {{ text }}
        </p>

        <p
          v-if="['item', 'itemPhoto'].includes(style)"
          class="content-main-cost"
        >
          <span>{{ costPerMonthText }}</span>
          <img
            class="tip"
            src="./assets/img/tip.svg"
            alt="?"
          >
        </p>

        <div style="display: flex;">
          <app-button>{{ textButton }}</app-button>

          <img
            v-if="style === 'cart'"
            class="tip"
            src="./assets/img/tip.svg"
            alt="?"
          >
        </div>
      </div>

      <img
        v-if="['itemPhoto', 'cart'].includes(style) && itemImg"
        class="content-item"
        :src="itemImg"
        alt="товар"
      >
    </div>

    <div class="footer">
      <p>0₽ - первый платёж</p>
      <p>0₽ - переплат</p>
      <p>{{ months }} мес. - рассрочка</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import AppButton from './components/app/AppButton.vue'

const defaultOpts: Window['VHWidgetOpts'] = {
  style: 'catalog',
  months: 4,
  textButton: 'Получить Виртуальную Халву'
}

export default defineComponent({
  components: {
    AppButton
  },

  setup () {
    const options = { ...defaultOpts, ...window.VHWidgetOpts }

    const costPerMonth = computed(() => {
      const { cost, months } = options
      return Math.round((cost ?? 0) / months)
    })
    const costPerMonthText = computed(() => {
      return `${costPerMonth.value} ₽/ месяц`
    })

    const textButton = computed(() => {
      if (options.style === 'cart') {
        return `Купить за ${costPerMonthText.value}`
      }
      return options.textButton
    })

    return {
      ...options,
      costPerMonth,
      costPerMonthText,
      textButton
    }
  }
})
</script>

<style lang="scss" scoped>
@import './assets/styles/reset';
@import './assets/styles/fonts';
@import './assets/styles/variables';

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

      &-catalog {
        width: 317px;
        height: 64px;
        font-family: 'SF Pro Display', sans-serif;
        font-size: 26px;
        line-height: 32px;
        letter-spacing: -0.28px;
        color: #000;
        margin-bottom: 24px;

        &-highlight {
          color: $red;
          font-weight: 600;
        }
      }
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

.tip {
  margin-left: 7px;
  cursor: pointer;
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
