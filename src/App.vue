<template>
  <div
    v-if="isShow"
    class="container"
    :class="{ 'container-auto-height': !showSchedule || isCollapsed,
              'container-auto-width': isCollapsed,
              'container-collapsed': isCollapsed }"
    :style="{ background, borderRadius, left, bottom }"
  >
    <div
      v-if="collapseable"
      class="collapse-btn"
      :class="{ 'collapse-btn-collapsed': isCollapsed }"
      :style="{ background }"
      @click="isCollapsed = !isCollapsed"
    >
      <img
        :src="getImg('tick.svg')"
        alt="✓"
      >
    </div>

    <div
      v-if="!isCollapsed"
      class="head"
      :style="{ marginBottom: `${partnerLogo ? 10 : 18}px`}"
    >
      <div class="head-logo">
        <img
          :src="getImg('logo.svg')"
          alt="халва"
        >

        <div
          v-if="partnerLogo"
          class="head-logo-partner"
        >
          <img
            :src="getImg('separator.svg')"
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
        v-if="!collapseable"
        class="head-close"
        :src="getImg('close.svg')"
        alt="x"
        @click="isShow = false"
      >
    </div>

    <div
      class="content"
      :class="{ 'content-collapsed': isCollapsed }"
    >
      <img
        v-if="['itemPhoto', 'cart'].includes(style) && itemImg && isCollapsed"
        class="content-item content-item-collapsed"
        :src="itemImg"
        alt="товар"
      >

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
          v-else-if="!isCollapsed"
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
            :src="getImg('tip.svg')"
            alt="?"
          >
        </p>

        <div
          v-if="style === 'cart' && isCollapsed"
          class="buy-text"
        >
          <div>
            <span class="buy-text-primary">
              <span class="buy-text-primary-part">Купить за</span>
              {{ costPerMonth }} ₽/ мес
            </span>
            <span> x {{ months }} мес</span>
          </div>

          <img
            class="tip"
            :src="getImg('tip.svg')"
            alt="?"
          >
        </div>

        <div style="display: flex;">
          <app-button :sm="isCollapsed">
            {{ textButton }}
          </app-button>

          <img
            v-if="style === 'cart' && !isCollapsed"
            class="tip"
            :src="getImg('tip.svg')"
            alt="?"
          >
        </div>
      </div>

      <img
        v-if="['itemPhoto', 'cart'].includes(style) && itemImg && !isCollapsed"
        class="content-item"
        :src="itemImg"
        alt="товар"
      >
    </div>

    <div
      v-if="style === 'cart' && showSchedule && !isCollapsed"
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
      v-if="!isCollapsed"
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
import { defineComponent, ref, computed } from 'vue'
import AppButton from './components/app/AppButton.vue'

const defaultOpts = {
  style: 'catalog',
  months: 4,
  text: 'Этот товар можно оплатить частями Виртаульной Халвой за:',
  textButton: 'Получить Виртуальную Халву',
  partnerLogo: '',
  showSchedule: true,
  left: '3rem',
  bottom: '3rem',
  collapseable: false,
  initialCollapse: true
}

export default defineComponent({
  components: { AppButton },

  setup () {
    const maxMonths = 5
    const isShow = ref(true)
    const options = { ...defaultOpts, ...window.VHWidgetOpts }
    const isCollapsed = ref(options.collapseable && options.initialCollapse)

    const costPerMonth = computed(() => {
      const { cost, months } = options
      return Math.round((cost ?? 0) / Math.round(months))
    })
    const costPerMonthText = computed(() => {
      return `${costPerMonth.value} ₽/ месяц`
    })

    const textButton = computed(() => {
      if (isCollapsed.value) {
        return 'Оплатить Виртуальной Халвой'
      } else if (options.style === 'cart') {
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

    function getImg (name: string): string {
      return `${process.env.VUE_APP_PATH || ''}/img/${name}`
    }

    return {
      ...options,
      isShow,
      isCollapsed,

      costPerMonth,
      costPerMonthText,
      textButton,
      maxMonths,
      monthsToShow,

      background,
      borderRadius,

      getDate,
      getImg
    }
  }
})
</script>

<style lang="scss" scoped>
@import './assets/styles/reset';
@import './assets/styles/fonts';

.container {
  $padding: 16px;
  $padding-sm: 13px;

  position: fixed;
  width: 443px;
  min-height: 208px;
  padding: $padding;
  padding-bottom: 8px;
  color: #2e2e2e;
  box-shadow: 0 4px 25px rgba(23, 19, 29, 0.12);
  opacity: 1;
  @include font1;
  @include sm {
    padding: $padding-sm;
    padding-bottom: 4px;
    margin: 0 auto;
    width: 95% !important;
    min-height: 170px;
    left: unset !important;
    bottom: 1rem !important;
  }

  &-auto-height {
    min-height: auto;
  }

  &-auto-width {
    width: auto;
  }

  &-collapsed {
    padding-bottom: $padding;
    @include sm {
      padding-bottom: $padding-sm;
    }
  }
}

.collapse-btn {
  $height: 18px;
  position: absolute;
  right: 0;
  top: calc(#{ - $height} - 2px);
  width: 22px;
  height: $height;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &-collapsed {
    img {
      transform: rotate(180deg);
    }
  }
}

.buy-text {
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  font-size: 15px;
  @include font2;

  &-primary {
    font-weight: bold;

    &-part {
      @include xs {
        display: none;
      }
    }
  }
}

.head {
  display: flex;
  justify-content: space-between;
  @include sm {
    margin-bottom: 12px !important;
  }

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

  &-collapsed {
    align-items: center;
    padding-right: 20px;
    justify-content: flex-start;
  }

  &-main {
    &-text {
      width: 259px;
      height: 40px;
      font-size: 15px;
      line-height: 20px;
      letter-spacing: -0.36px;
      margin-bottom: 12px;
      @include sm {
        width: 166px;
        height: unset;
        font-size: 10px;
        line-height: 14px;
        margin-bottom: 7px;
      }

      &-catalog {
        width: 317px;
        height: 64px;
        font-size: 26px;
        line-height: 32px;
        letter-spacing: -0.28px;
        color: #000;
        margin-bottom: 24px;
        @include font2;
        @include sm {
          margin-bottom: 12px;
          font-size: 22px;
          width: unset;
        }

        &-highlight {
          color: $red;
          font-weight: 600;
        }
      }
    }

    &-cost {
      height: 22px;
      font-weight: bold;
      font-size: 22px;
      color: #000;
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      @include font2;
      @include sm {
        font-size: 18px;
        margin-bottom: 12px;
      }
    }
  }

  &-item {
    $size-sm: 65px;
    --size: 80px;
    width: var(--size);
    height: var(--size);
    object-fit: contain;
    background: #fff;
    border: 1px solid #e4e4e4;
    border-radius: 3px;
    @include sm {
      --size: #{$size-sm};
    }

    &-collapsed {
      --size: #{$size-sm};
      margin-right: 16px;
    }
  }
}

.tip {
  margin-left: 7px;
  cursor: pointer;
}

.schedule {
  display: flex;
  margin-top: 16px;
  @include sm {
    margin-top: 13px;
  }

  &-month {
    --size: 80px;
    flex: 0 1 var(--size);
    @include sm {
      --size: 65px;
    }

    &:not(:last-child) {
      margin-right: 8px;
    }

    &-line {
      height: 4px;
      background: #b7bac6;
      border-radius: 10px;
      @include sm {
        height: 3.25px;
      }

      &-active {
        background: $red;
      }
    }

    &-cost {
      font-weight: 600;
      font-size: 12px;
      margin-top: 3px;
      @include sm {
        font-size: 10px;
      }
    }

    &-date {
      font-size: 9px;
      @include sm {
        font-size: 7px;
      }
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
  @include sm {
    font-size: 7px;
    margin-top: 8px !important;
    max-width: 230px;
  }
}
</style>
