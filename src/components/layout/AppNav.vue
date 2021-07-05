<template>
  <div class="relative bg-white">
    <div
      class="
          flex
          justify-between
          items-center
          border-b-2 border-gray-100
          py-6
          md:justify-start
          md:space-x-10
        "
    >
      <div class="flex justify-start lg:w-0 lg:flex-1">
        <a href="#">
          <span class="sr-only">Workflow</span>
          <img
            class="h-8 w-auto sm:h-10"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt=""
          />
        </a>
      </div>
      <div class="md:flex items-center justify-end md:flex-1 lg:w-0">
      <div @click="logout">
        <app-button>Cerrar sesión</app-button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppNav",
  methods: {
    async logout() {
      const success = await this.$store.dispatch('logout')
      if (success) {
        this.$router.push({ name: 'Login' })
      }
    }
  }
};
</script>
