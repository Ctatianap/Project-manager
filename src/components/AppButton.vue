<template>
  <button
    class="
      flex
      mx-auto
      border-0
      py-2
      px-8
      focus:outline-none
      hover:bg-red-100
      rounded-full
      text-lg
      color
    "
  >
    <slot />
  </button>
</template>

<style scoped>
.color {
  color: #fff6da;
  background-color: #e78a65;
}
.color:hover {
  background-color: #e9aa91;
}
</style>
