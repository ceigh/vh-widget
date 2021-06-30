<template>
  <button>
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  width: 204px;
  height: 32px;
  border-radius: 4px;
  background: #ff4e50;
  color: #fff;
  font-weight: 600 !important;
  font-size: 11px !important;
  line-height: 22px !important;
  text-align: center;
  letter-spacing: -0.41px;
  cursor: pointer;
  border: none;
}
</style>
