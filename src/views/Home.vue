<template>
  <div class="h-screen mx-auto">
    <app-nav />
    <div class="container mx-auto">
      <div class="flex flex-row items-center py-8">
          <div class="w-2/3 px-24">
            <p class="tertiary-1 text-4xl font-medium my-4">Bienvenido</p>
            <p class="gray-3 mb-8">Gestiona tus proyectos, visualiza tus reportes y registra tu porcentage de progreso...</p>
            <p class="gray-3 mb-8 pr-16">Aliquam erat volutpat. Suspendisse rhoncus lorem ac maximus lacinia. Aliquam erat volutpat. 
              Nam consequat urna nec risus pulvinar dapibus. Proin nisi nibh, vulputate eget eros non, phar etra volutpat
               magna. Duis cursus consectetur nisl el consectetur. Aliquam ligula urna, egestas eliquam erat volutpat. Suspendisse rhoncus</p>
          </div>
          <div class="w-1/3">
            <img :src="require('@/assets/images/header.png')" alt="header" class="h-64"> 
          </div>
        </div>
        <div class="bar py-2 px-6 rounded-md flex items-center justify-between mb-2">
          <div>
            <i class="fa-lg fas fa-briefcase"></i>
            <span class="text-2xl text-bold ml-2"> Mis proyectos </span>
          </div>
        </div>
        <div class="mx-auto w-10/12 py-5">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <card-project class="mx-auto"
              v-for="project in projects"
              :project="project"
              :key="project.name"
            />
          </div>
        </div>
        <create-dedication-modal
          v-if="createDedication"
          @close="toggleCreateDedication"
          @saved="getData"
        />
    </div>
  </div>
</template>

<script>
import AppNav from "@/components/layout/AppNav.vue";
import CardProject from "@/components/CardProject.vue";
import CreateDedicationModal from '@/components/CreateDedicationModal.vue'

export default {
  name: "Home",
  components: {
    AppNav,
    CardProject,
    CreateDedicationModal
  },
  data() {
    return {
      createDedication: false,
      showProject: false,
    };
  },
  methods: {
    getData() {
      this.$store.dispatch("getProjects");
      this.$store.dispatch("getDedications");
    },
    toggleCreateDedication() {
      this.createDedication = !this.createDedication
    },
  },
  computed: {
    projects() {
      return this.$store.state.projects;
    },
  },
  mounted() {
    this.getData()
  },
};
</script>
<style scoped>
.bar {
  background-color: #B9BDF7;
  color: #2A37B3;
}
</style>
