<template>
  <div class="container h-screen mx-auto px-2">
    <app-nav />
    <div class="bar py-2 px-6 rounded-md flex items-center justify-between mb-6">
      <div>
        <i class="fa-lg fas fa-briefcase"></i>
        <span class="text-2xl text-bold ml-2"> Proyectos </span>
      </div>
      <div class="w-1/6 my-auto text-right text-secondary hover:text-secondary-2">
        <i class="fa-2x" :class="showProject ? 'fa fa-angle-up' : 'fa fa-angle-down'" ></i>
      </div>
    </div>
    <div class="mx-auto w-10/12">
      <div @click="toggleCreateDedication">
        <app-button class="mb-3">Registar dedicación</app-button>
      </div>
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
  background-color: #fff6da;
  color: #fda88b;
}
</style>
