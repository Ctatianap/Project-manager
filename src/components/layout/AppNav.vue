<template>
  <div class="relative bg-tertiary-3">
    <div
      class=" container mx-auto
        p-4 md:p-0
        flex flex-col md:flex-row md:pt-4
        md:justify-between
        md:items-center
        border-b-2 border-gray-100
        md:space-x-10
      "
    >
      <div class="w-1/2 flex justify-start lg:w-0 lg:flex-1">
        <img :src="require('@/assets/images/logo.svg')" alt="header" class="h-10"> 
        <p class="text-4xl font-bold title-font mb-6 tertiary-1 pl-4" >
          Projectify
        </p>
      </div>
      <div class="w-1/2 flex flex-row justify-end">
        <p class="hidden md:block hover:underline tertiary-1 text-lg font-semibold pr-16">Inicio</p>
        <p class="hidden md:block hover:underline tertiary-1 text-lg font-semibold pr-16">Sobre nosotros</p>
        <p class="hidden md:block hover:underline tertiary-1 text-lg font-semibold pr-16">Contáctanos</p>
         <div class="flex items-center justify-end">
        <div @click="logout">
          <button class="rounded-full bg-tertiary-2 hover:bg-purple-300 tertiary-1 font-semibold px-3 py-1 -mt-2">Cerrar sesión</button>
        </div>
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
      const success = await this.$store.dispatch("logout");
      if (success) {
        this.$router.push({ name: "Login" });
      } else {
        window.localStorage.removeItem("project-manager-user");
        this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>
