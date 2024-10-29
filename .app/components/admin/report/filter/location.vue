<script setup lang="ts">

//#region imports & Emit
const emits = defineEmits(['selected'])
import useLocations from '~/composables/api/admin/useLocations'
//#endregion

//#region variables
const loading = ref(true);
const data = ref([])
const filter = ref('')
const filteredData = computed(() => {
  if (!filter.value) return data.value
  return data.value.filter((item) => item.title.includes(filter.value))
})
const selectedData = computed(() => {
  return data.value.filter((item) => item.isSelected)
})
//#endregion

//#region functions
const fillData = async () => {
  const api = new useLocations()
  const response = await api.getAllForDisplay()
  if (response.result && response.result.length > 0){
    data.value = response.result.map((x:any)=>{ return {
      id:x.id,
      title : x.title,
      description : x.description,
      isSelected: false
    } });
  }
  loading.value = false;
}
const unChecked = (index:number) => {
  selectedData.value[index].isSelected = false;
}
const changeAll = (state:boolean) => {
  data.value.map((item) => item.isSelected = state)
}
//#endregion

//#region watch
watch(selectedData, () => {
  emits('selected', selectedData.value)
},{deep:true,immediate:true})
//#endregion

//#region constructors
onMounted(async () => {
  await fillData()
})
//#endregion

</script>

<template>
  <BaseCard rounded="sm" class="p-4">

    <!-- Heading -->
    <div class="mb-2 flex items-center justify-between">
      <!-- Title -->
      <AdminFormLabel
        label="محل های شما"
        description="یک یا چند مکان را انتخاب کنید"
      />

      <!-- Select / DeSelect All -->
      <BaseButtonIcon v-if="selectedData.length != data.length" size="sm" rounded="md" data-nui-tooltip="انتخاب همه" @click="changeAll(true)">
        <Icon name="ion:checkmark" class="size-4" />
      </BaseButtonIcon>
      <BaseButtonIcon v-else size="sm" rounded="md" data-nui-tooltip="عدم انتخاب همه" @click="changeAll(false)">
        <Icon name="ic:round-clear" class="size-4" />
      </BaseButtonIcon>
    </div>

    <!-- Body -->
    <div class="mb-2 space-y-1 flex flex-col">

      <!-- Search -->
      <div class="relative mb-4" v-if="data.length > 5">
        <BaseInput
          v-model="filter"
          size="sm"
          icon="lucide:search"
          placeholder="مکان را جستجو کنید ..."
          rounded="sm">
          <template #action>
            <button
              v-if="filter != ''"
              type="button"
              data-nui-tooltip="پاک کردن"
              @click="filter = ''"
              class="text-muted-400 hover:text-primary-500 absolute end-0 top-0 z-[1] flex size-8 items-center justify-center transition-colors duration-300"
            >
              <Icon name="ic:round-clear" class="size-4" />
            </button>
          </template>
        </BaseInput>
      </div>

      <!-- Not Found -->
      <div class="mb-2" v-if="filteredData.length === 0">
        <div class="flex flex-col items-center py-10 text-center">
          <Icon name="pepicons-print:person" class="text-primary-500 size-10 mb-2" />
          <BaseHeading
            as="h4"
            size="sm"
            weight="medium"
            lead="tight"
          >
            <span>اطلاعاتی جهت نمایش وجود ندارد</span>
          </BaseHeading>
          <BaseParagraph size="xs" class="text-muted-400 mx-auto max-w-[240px] mt-2">
          <span>
            به نظر می رسد داده ای با توجه به جستجوی شما یافت نشد.
          </span>
          </BaseParagraph>
        </div>
      </div>

      <!-- List -->
      <div v-else>
        <BaseFocusLoop class="grid grid-cols-1 gap-4">
          <BaseCheckbox
            v-for="(item,i) in filteredData" :key="`Location_${i}`"
            v-model="item.isSelected"
            :label="item.title"
            rounded="sm"
            color="primary"
          />
        </BaseFocusLoop>
      </div>

      <div v-if="selectedData.length !== 0" class="flex flex-wrap items-end gap-2 pt-3 border-muted-200 dark:border-muted-800 w-full overflow-x-auto border-t !mt-3">
        <BaseSnack
          v-for="(item,i) in selectedData" :key="`selectedLocation_${i}`"
          :label="item.title"
          color="default"
          size="xs"
          @delete="unChecked(i)"
        />
      </div>
    </div>
  </BaseCard>
</template>
