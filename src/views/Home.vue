<template>
  <div class="container mx-auto px-2">
    <app-nav />
    <div>
      <div>
        <div class="flex items-center justify-between">
          <div>
            <span class="text-subtitle1 text-primary"> Proyectos </span
            ><i class="fas fa-briefcase"></i>
          </div>
          <div
            class="w-1/6 my-auto text-right text-secondary hover:text-secondary-2"
          >
            <i
              class="fa-2x"
              :class="showProject ? 'fa fa-angle-up' : 'fa fa-angle-down'"
            ></i>
          </div>
        </div>
      </div>
      <card-project
        name="Grupo Exito - Bot para atención por WhatsApp"
        quote="H7KL9-58"
      ></card-project>
    </div>
  </div>
</template>

<script>
import AppNav from "@/components/layout/AppNav.vue";
import CardProject from "@/components/CardProject.vue";

export default {
  name: "Home",
  components: {
    AppNav,
    CardProject
  },
  data() {
    return {
      showProject: false,
    };
  },
};
</script>
