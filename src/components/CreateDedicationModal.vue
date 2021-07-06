<template>
  <div
    class="
      fixed
      inset-0
      bg-black bg-opacity-30
      h-screen
      w-full
      flex
      justify-center
      pt-10
    "
  >
    <div
      class="relative w-1/2 h-1/2 bg-white rounded shadow-lg overflow-y-auto"
    >
      <div class="px-4 py-3 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-600">
          Registrar dedicación
        </h2>
      </div>

      <div class="w-full p-3">
        <div v-if="!dedication.project_id" class="flex justify-center">
          <div class="bg-white shadow rounded-lg">
            <ul class="divide-y divide-gray-300">
              <li
                v-for="item in projects"
                :key="item.name"
                @click="selectProject(item.id)"
                class="p-4 hover:bg-gray-50 cursor-pointer"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
        <template v-else>
          <input
            v-model.number="dedication.pct_dedication"
            type="number"
            min="1"
            class="
              w-20
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
        </template>
      </div>

      <div
        class="
          absolute
          bottom-0
          left-0
          px-4
          py-3
          border-t border-gray-200
          w-full
          flex
          justify-end
          items-center
          gap-3
        "
      >
        <button
          @click="close"
          class="
            bg-red-500
            hover:bg-red-600
            px-4
            py-2
            rounded
            text-white
            focus:outline-none
          "
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateDedicationModal",
  computed: {
    projects() {
      return this.$store.state.projects;
    },
    selectedProject() {
      return this.projects.find(item => item.id === this.dedication.project_id)
    }
  },
  data() {
    return {
      dedication: {
        project_id: null,
        week_number: null,
        pct_dedication: null,
      },
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async save() {
      const success = await this.$store.dispatch('createDedication', this.dedication)
      if (success) {
        this.$emit('saved')
      }
    },
    selectProject(projectId) {
      this.dedication.project_id = projectId
    }
  },
};
</script>
