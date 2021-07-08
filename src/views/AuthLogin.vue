<template>
  <section class="login h-screen max-w-screen-2xl mx-auto text-gray-600 body-font relative">
    <div class="container px-5 py-24 mx-auto flex flex-col md:flex-row">
      <div class="w-full lg:w-1/2 md:w-2/3 mx-auto">
        <h1 class="text-5xl font-bold title-font mb-6 text-primary-2">Projectify</h1>
        <p class="italic text-s text-gray-500 md:mr-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit mollis risus in posuere. 
          Quisque volutpat orci quis diam fermentum viverra. Donec facilisis erat nec eros luctus, 
          sit amet placerat diam faucibus.</p>
      </div>
      <div class="w-full lg:w-1/3 md:w-2/3 mx-auto shadow-lg rounded-xl bg-blue-50">
        <div class="flex flex-col py-5 items-center">
          <h1 class="text-xl font-medium title-font text-indigo-500">
            Inicia sesión
          </h1>
          <div class="p-2 w-4/5">
            <div class="relative">
              <label for="email" class="leading-7 text-sm text-gray-600"
                >Correo electronico</label
              >
              <input
                v-model="user.email"
                type="email"
                name="email"
                class="
                  w-full
                  bg-white
                  rounded
                  border border-gray-300
                  focus:border-indigo-500
                  focus:bg-white
                  focus:ring-2 focus:ring-indigo-200
                  text-base
                  outline-none
                  text-gray-700
                  py-1
                  px-3
                  leading-8
                  transition-colors
                  duration-200
                  ease-in-out
                "
              />
            </div>
          </div>
          <div class="p-2 w-4/5">
            <div class="relative">
              <label for="password" class="leading-7 text-sm text-gray-600"
                >Contraseña</label
              >
              <input
                v-model="user.password"
                type="password"
                name="password"
                class="
                  w-full
                  bg-gray-100 bg-opacity-50
                  rounded
                  border border-gray-300
                  focus:border-indigo-500
                  focus:bg-white
                  focus:ring-2 focus:ring-indigo-200
                  text-base
                  outline-none
                  text-gray-700
                  py-1
                  px-3
                  leading-8
                  transition-colors
                  duration-200
                  ease-in-out
                "
              />
            </div>
          </div>
          <span v-if="errorText" class="text-red-500 font-bold">{{ errorText }}</span>
          <div class="p-2 w-full">
            <div @click="login">
              <app-button>Ingresar</app-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AuthLogin",
  data() {
    return {
      errorText: '',
      user: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    async login() {
      this.errorText = ''
      const success = await this.$store.dispatch("loginUser", this.user);
      if (success) {
        this.$router.push({ name: "Home" });
      } else {
        this.errorText = 'Usuario o contraseña incorrecto'
      }
    },
  },
};
</script>

<style scoped>
  .login {
    background-image: url('../assets/images/Authlogin.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
  .text-primary-2{
    color: #9F4C8E;
  }
</style>