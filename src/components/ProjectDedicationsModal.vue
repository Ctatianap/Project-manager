<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 h-screen w-full flex justify-center pt-10">
    <div class="relative h-105 bg-white rounded-lg shadow-lg" style="width:600px">
      <div class="p-4 mb-8">
        <h2 class="text-xl tertiary-1 font-medium text-center bg-indigo-200 -m-4 p-4 rounded-t-lg">{{ project.name }}</h2>
      </div>
      <div class="flex flex-row justify-center items-center mb-8 text-base">
        <div @click="show_reports = false" class="w-1/2 text-center border-purple-300 border-r-2 hover:underline cursor-pointer" :class="!show_reports ? 'tertiary-1 font-medium' : 'secondary-1'"> 
          <p class="px-3">Registrar mi % de dedicación</p>
        </div>
        <div @click="show_reports = true" class="w-1/2 text-center hover:underline cursor-pointer" :class="show_reports ? 'tertiary-1 font-medium' : 'secondary-1'"> 
          <p class="px-3">Mis reportes de dedicación</p>
        </div>
      </div>
      <div v-if="!show_reports" class="px-6 mt-10 gray-2 flex flex-col items-center">
        <p class="italic text-sm text-center mb-6">Escribe el número de la semana a lreportar y el porcentaje de dedicación que trabajaste en el proyecto durante esa semana.</p>
        <div class="flex flex-row">
          <span>
          Semana -
          <input  v-model.number="dedication.week_number" type="number" min="1"
            class="pr-4 w-20 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          Dedicación -
          <input  v-model.number="dedication.pct_dedication" type="number" min="1" 
            class=" w-20 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </span>
          <button @click="dedication.week_number > 0 && dedication.pct_dedication > 0 ? save() : ()=>{} " class="mx-10">
            <i class="fa-2x fas fa-save" :class="dedication.week_number > 0 && dedication.pct_dedication > 0 ? 'success' : 'gray-3'"></i>
          </button>
        </div>
        <p v-if="success" class="mt-3 font-bold success">Se tu información ha guardado exitosamente</p>
        <p v-if="isDuplicateWeek" class="mt-3 font-bold danger">Ya se ha ragistrado una dedicación con este número de semana</p>
      </div>
      <div v-if="show_reports" class="px-6 h-56 overflow-y-auto scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray">
        <div class="w-full">
          <ul v-if="dedications.length" class="divide-y divide-purple-300">
            <li v-for="(item, i) in dedications" class="p-4 gray-2 hover:bg-gray-50 flex items-center justify-between" :key="item.id">
              <span>
                Semana -
                <input v-if="item.isEditing" v-model.number="item.week_number" type="number" min="1"
                  class=" w-20 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                <span v-else>
                  {{ item.week_number }}
                </span>
                <br />
                Dedicación -
                <input v-if="item.isEditing" v-model.number="item.pct_dedication" type="number" min="1" 
                class=" w-20 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                <span v-else> {{ item.pct_dedication }}% </span>
              </span>
              <div>
                <button
                  v-if="item.isEditing"
                  @click="cancelEdit(i)"
                  class="mr-5">
                  <i class="fas fa-times tertiary-2"></i>
                </button>
                <button v-if="item.isEditing" @click="saveEdit(i)" class="mr-5">
                  <i class="fas fa-save success"></i>
                </button>
                <button v-else-if="!item.isEditing && canEdit(item.created_at)" @click="edit(i)" class="mr-5">
                  <i class="fas fa-edit tertiary-2"></i>
                </button>
                <button @click="deleteDedication(i)">
                  <i class="fas fa-trash danger"></i>
                </button>
              </div>
            </li>
          </ul>
          <img v-else
            class="h-56 mx-auto object-cotain object-center"
            :src="require('@/assets/images/empty.png')"
            alt="img empty"
          />
        </div>
      </div>
      <div @click="close" class="absolute bottom-0 left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3">
        <app-button class="mb-3" >Cerrar</app-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectDedicationsModal",
  data() {
    return {
      activeNotification: true,
      notificationType: 'success',
      show_reports: false,
      dedications: [],
      success: false,
      isDuplicateWeek: false,
      dedication: {
        project_id: this.project.id,
        week_number: null,
        pct_dedication: null,
      },
    };
  },
  methods: {
    canEdit(date) {
      return new Date(date).getMonth() === new Date().getMonth()
    },
    cancelEdit(dedicationIndex) {
      let { prev_week_number, prev_pct_dedication } = this.dedications[
        dedicationIndex
      ];
      this.dedications[dedicationIndex].week_number = prev_week_number;
      this.dedications[dedicationIndex].pct_dedication = prev_pct_dedication;
      this.dedications[dedicationIndex].isEditing = false;
    },
    close() {
      this.$emit("close");
    },
    async deleteDedication(dedicationIndex) {
      const success = await this.$store.dispatch(
        "deleteDedication",
        this.dedications[dedicationIndex]
      );
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
     async save() {
      this.isDuplicateWeek = false
      this.isDuplicateWeek = this.$store.state.dedications.some(item => item.week_number === this.dedication.week_number)
      if (this.isDuplicateWeek) return

      this.success = await this.$store.dispatch('createDedication', this.dedication)
      if (this.success) {
        this.getDedications();
        this.dedication.week_number = null
        this.dedication.pct_dedication = null
      } else {
        alert('Asegurate que los datos ingresados son correctos');
      }
    }
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
