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
    <div class="relative h-1/2 bg-white rounded shadow-lg">
      <div class="px-4 py-3 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-600">{{ project.name }}</h2>
      </div>

      <div class="w-full p-3">
        <ul v-if="dedications.length" class="divide-y divide-gray-300">
          <li
            v-for="(item, i) in dedications"
            class="p-4 hover:bg-gray-50 flex justify-between"
            :key="item.id"
          >
            <span>
              Semana -
              <input
                v-if="item.isEditing"
                v-model.number="item.week_number"
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
              <span v-else>
                {{ item.week_number }}
              </span>
              <br />
              Dedicación -
              <input
                v-if="item.isEditing"
                v-model.number="item.pct_dedication"
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
              <span v-else> {{ item.pct_dedication }}% </span>
            </span>
            <div>
              <button v-if="item.isEditing" @click="cancelEdit(i)" class="mr-5">
                <i class="fas fa-times text-blue-600"></i>
              </button>
              <button v-if="item.isEditing" @click="saveEdit(i)" class="mr-5">
                <i class="fas fa-save text-green-600"></i>
              </button>
              <button v-else @click="edit(i)" class="mr-5">
                <i class="fas fa-edit text-green-600"></i>
              </button>
              <button @click="deleteDedication(i)">
                <i class="fas fa-trash text-red-600"></i>
              </button>
            </div>
          </li>
        </ul>
        <h3 v-else class="font-bold text-center">
          No hay dedicaciones registradas
        </h3>
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
  name: "ProjectDedicationsModal",
  data() {
    return {
      dedications: [],
    };
  },
  methods: {
    cancelEdit(dedicationIndex) {
      let { prev_week_number, prev_pct_dedication } = this.dedications[dedicationIndex];
      this.dedications[dedicationIndex].week_number = prev_week_number;
      this.dedications[dedicationIndex].pct_dedication = prev_pct_dedication;
      this.dedications[dedicationIndex].isEditing = false;
    },
    close() {
      this.$emit("close");
    },
    async deleteDedication(dedicationIndex) {
      const success = await this.$store.dispatch("deleteDedication", this.dedications[dedicationIndex]);
      if (success) {
        this.getDedications();
      }
    },
    edit(dedicationIndex) {
      this.dedications[dedicationIndex].isEditing = true;
    },
    getDedications() {
      this.dedications = this.$store.state.dedications.filter(
        (item) => item.project_id === this.project.id
      );
      this.dedications = this.dedications.map((item) => {
        return {
          ...item,
          isEditing: false,
          prev_week_number: item.week_number,
          prev_pct_dedication: item.pct_dedication,
        };
      });
    },
    async saveEdit(dedicationIndex) {
      const success = await this.$store.dispatch(
        "editDedication",
        this.dedications[dedicationIndex]
      );
      if (success) {
        this.dedications[dedicationIndex].isEditing = false;
      }
    },
  },
  mounted() {
    this.getDedications();
  },
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
};
</script>
