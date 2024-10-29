<script setup lang="ts">

//#region imports & Emit
const emits = defineEmits(['change'])
//#endregion

//#region variables
const filters = ref({
  organs : [],
  locations : [],
  products : [],
  date : '',
})
//#endregion

//#region watch
watch(filters, () => {
  emits('change', filters.value)
},{deep:true,immediate:true})
//#endregion

</script>

<template>
  <div class="relative flex flex-col col-span-1 gap-4">
    <AdminReportFilterOrgan @selected="(data)=>{filters.organs = data}"/>
    <AdminReportFilterLocation @selected="(data)=>{filters.locations = data}"/>
    <AdminReportFilterProduct @selected="(data)=>{filters.products = data}"/>
    <AdminReportFilterDate @selected="(data)=>{filters.date = data}"/>
  </div>
</template>
