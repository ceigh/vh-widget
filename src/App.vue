<template>
  <div
    class="container"
    :class="{ 'container-ready': isReady, 'container-auto': !showSchedule }"
    :style="{ background, borderRadius, left, bottom }"
  >
    <div
      class="head"
      :style="{ marginBottom: `${partnerLogo ? 10 : 18}px`}"
    >
      <div class="head-logo">
        <img
          src="./assets/img/logo.svg"
          alt="халва"
        >

        <div
          v-if="partnerLogo"
          class="head-logo-partner"
        >
          <img
            src="./assets/img/separator.svg"
            alt="|"
            class="head-logo-partner-separator"
          >
          <img
            class="head-logo-partner-logo"
            :src="partnerLogo"
            alt="партнер"
          >
        </div>
      </div>

      <img
        class="head-close"
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

    <div
      v-if="style === 'cart' && showSchedule"
      class="schedule"
    >
      <div
        v-for="i in monthsToShow"
        :key="i"
        class="schedule-month"
      >
        <div
          class="schedule-month-line"
          :class="{'schedule-month-line-active': i === 1}"
        />
        <p class="schedule-month-cost">
          {{ i === 1 ? 0 : costPerMonth }} ₽
        </p>
        <p class="schedule-month-date">
          {{ i === 1 ? 'Сегодня' : getDate(i - 1) }}
        </p>
      </div>

      <div
        v-if="months > maxMonths"
        class="schedule-month-more"
      >
        <p>
          +{{ months - maxMonths }}
          <br>
          мес.
        </p>
      </div>
    </div>

    <div
      class="footer"
      :style="{ marginTop: `${style === 'cart' && showSchedule ? 7 : 14}px` }"
    >
      <p>0₽ - первый платёж</p>
      <p>0₽ - переплат</p>
      <p>{{ months }} мес. - рассрочка</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import AppButton from './components/app/AppButton.vue'

const defaultOpts = {
  style: 'catalog',
  months: 4,
  text: 'Этот товар можно оплатить частями Виртаульной Халвой за:',
  textButton: 'Получить Виртуальную Халву',
  partnerLogo: '',
  showSchedule: true,
  left: '3rem',
  bottom: '3rem'
}

export default defineComponent({
  components: { AppButton },

  setup () {
    const maxMonths = 6
    const isReady = ref(false)
    const options = { ...defaultOpts, ...window.VHWidgetOpts }

    const costPerMonth = computed(() => {
      const { cost, months } = options
      return Math.round((cost ?? 0) / Math.round(months))
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

    const background = computed(() => {
      const { background } = options
      const white = '#fff'
      if (!background) return white

      if (background === 1) return '#f8f3ee'
      if (background === 2) return '#f8eef0'
      if (background === 3) return '#f3eef8'
      if (background === 4) return '#eef3f8'
      if (background === 5) return '#eef8f1'

      if (typeof background === 'string') return background
      return white
    })

    const borderRadius = computed(() => {
      const { borderRadius } = options
      let radius = 7
      if (typeof borderRadius === 'number') radius = borderRadius
      return `${radius}px`
    })

    const monthsToShow = computed(() => {
      const { months } = options
      return months > maxMonths ? maxMonths : months
    })

    function getDate (i: number): string {
      const today = new Date()
      today.setMonth(today.getMonth() + i)
      return today.toLocaleString('ru', {
        day: 'numeric', month: 'numeric', year: 'numeric'
      })
    }

    onMounted(() => {
      isReady.value = true
    })

    return {
      ...options,

      isReady,

      costPerMonth,
      costPerMonthText,
      textButton,
      maxMonths,
      monthsToShow,

      background,
      borderRadius,

      getDate
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
  width: 443px;
  height: 208px;
  padding: 16px;
  color: #2e2e2e;
  box-shadow: 0 4px 25px rgba(23, 19, 29, 0.12);
  font-family: 'SF Pro Text', sans-serif;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &-ready {
    opacity: 1;
  }

  &-auto {
    height: unset;
  }
}

.head {
  display: flex;
  justify-content: space-between;

  &-logo {
    display: flex;

    &-partner {
      display: flex;
      align-items: center;

      &-separator {
        margin: 0 10px;
      }

      &-logo {
        max-height: 16px;
        max-width: 100px;
      }
    }
  }

  &-close {
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

.schedule {
  display: flex;
  margin-top: 16px;

  &-month {
    flex: 0 1 80px;

    &:not(:last-child) {
      margin-right: 8px;
    }

    &-line {
      height: 4px;
      background: #b7bac6;
      border-radius: 10px;

      &-active {
        background: $red;
      }
    }

    &-cost {
      font-weight: 600;
      font-size: 12px;
      margin-top: 3px;
    }

    &-date {
      font-size: 9px;
    }

    &-more {
      flex: 0 0 40px;
      background: rgba(#b7bac6, 0.2);
      border-radius: 4px;
      font-weight: bold;
      font-size: 7px;
      line-height: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
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
}
</style>
