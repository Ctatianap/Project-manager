<template>
  <div
    class="
      pb-5
      max-w-sm
      flex flex-col
      justify-between
      bg-white
      border-2 border-purple-200
      rounded-lg
      tracking-wide
      shadow-md
    "
  >
    <img
      class="lg:h-48 md:h-36 p-4 w-full object-cotain object-center"
      :src="src"
      alt="img project"
    />
    <div class="flex items-center mb-4">
      <div class="p-4">
        <p class="primary-1 text-s font-medium h-12">{{ project.name }}</p>
        <p class="text-purple-400 font-semibold  mb-4">{{ project.quote_number }}</p>
        <p class="text-xs text-gray-400">Aliquam erat volutpat. Suspendisse rhoncus lorem ac maximus 
          lacinia. Aliquam erat volutpat. Nam consequat urna nec risus 
          pulvinar dapibus. Proin nisi nibh, vulputate eget eros non, phar
          etra volutpat magna. Duis cursus consectetur nisl el consectetur. 
          Aliquam ligula urna, egestas </p>
      </div>
    </div>
    <div @click="toggleViewDedications">
      <app-button> Ver dedicación </app-button>
    </div>
    <project-dedications-modal
      v-if="dedicationsModal"
      :project="project"
      @close="toggleViewDedications"
    />
  </div>
</template>

<script>
import ProjectDedicationsModal from "@/components/ProjectDedicationsModal.vue";

export default {
  name: "CardProject",
  components: {
    ProjectDedicationsModal,
  },
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dedicationsModal: false,
    };
  },
  
  methods: {
    toggleViewDedications() {
      this.dedicationsModal = !this.dedicationsModal;
    },
  },
  computed:{
    src () {
      return this.project.id === 1 ? require('@/assets/images/project1.png') : this.project.id === 2 ? require('@/assets/images/project2.png') : require('@/assets/images/project3.png');
    }
  }
};
</script>
<style scoped>
  .tertiary-1 {
      color: '#2A37B3';
  }

  .tertiary-2 {
      color: '#B9BDF7';
  }
</style>
