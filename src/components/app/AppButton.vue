<template>
  <button :class="{ sm }">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    sm: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin btn-sm {
  font-size: 9px !important;
  height: 26px;
}

button {
  min-width: 204px;
  height: 32px;
  border-radius: 4px;
  background: $red;
  color: #fff;
  font-weight: 600 !important;
  font-size: 11px !important;
  line-height: 22px !important;
  text-align: center;
  letter-spacing: -0.41px;
  cursor: pointer;
  border: none;
  user-select: none;
  @include sm {
    @include btn-sm;
    min-width: 166px;
  }

  &.sm {
    @include btn-sm;
    min-width: 152px;
  }
}
</style>
