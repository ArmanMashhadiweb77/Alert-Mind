<script setup lang="ts">

//#region imports & Emit
const emits = defineEmits(['selected'])
//#endregion

//#region variables
const data = ref('');
//#endregion

//#region functions

//#endregion

//#region watch
watch(data, () => {
  emits('selected', data.value)
},{deep:true,immediate:true})
//#endregion

</script>

<template>
  <BaseCard rounded="sm" class="p-4">

    <!-- Heading -->
    <div class="mb-2 flex items-center justify-between">
      <AdminFormLabel
        label="زمان گزارش"
        description="بازه زمانی جستجوی گزارش را مشخص کنید"
      />
    </div>

    <!-- Body -->
    <div class="space-y-1 flex flex-col">
          <BaseRadioHeadless v-model="data" value="today">
            <BaseCard rounded="sm" class="dateCard">
              <div class="flex w-full items-center gap-2">
                <div>
                  <BaseHeading
                    as="h4"
                    size="sm"
                    weight="medium"
                    lead="none"
                  >
                    امروز
                  </BaseHeading>
                  <BaseText size="xs" class="text-muted-400 mt-1">
                    1403/02/01
                  </BaseText>
                </div>
                <div class="child text-muted-300 ms-auto">
                  <div class="size-3 rounded-full bg-current" />
                </div>
              </div>
            </BaseCard>
          </BaseRadioHeadless>
          <BaseRadioHeadless v-model="data" value="yesterday">
            <BaseCard rounded="sm" class="dateCard">
              <div class="flex w-full items-center gap-2">
                <div>
                  <BaseHeading
                    as="h4"
                    size="sm"
                    weight="medium"
                    lead="none"
                  >
                    دیروز
                  </BaseHeading>
                  <BaseText size="xs" class="text-muted-400 mt-1">
                    1403/01/31
                  </BaseText>
                </div>
                <div class="child text-muted-300 ms-auto">
                  <div class="size-3 rounded-full bg-current" />
                </div>
              </div>
            </BaseCard>
          </BaseRadioHeadless>
          <BaseRadioHeadless v-model="data" value="week">
            <BaseCard rounded="sm" class="dateCard">
              <div class="flex w-full items-center gap-2">
                <div>
                  <BaseHeading
                    as="h4"
                    size="sm"
                    weight="medium"
                    lead="none"
                  >
                    یک هفته گذشته
                  </BaseHeading>
                  <BaseText size="xs" class="text-muted-400 mt-1">
                    1403/01/25  - 1403/02/01
                  </BaseText>
                </div>
                <div class="child text-muted-300 ms-auto">
                  <div class="size-3 rounded-full bg-current" />
                </div>
              </div>
            </BaseCard>
          </BaseRadioHeadless>
          <BaseRadioHeadless v-model="data" value="month">
            <BaseCard rounded="sm" class="dateCard">
              <div class="flex w-full items-center gap-2">
                <div>
                  <BaseHeading
                    as="h4"
                    size="sm"
                    weight="medium"
                    lead="none"
                  >
                    یک ماه گذشته
                  </BaseHeading>
                  <BaseText size="xs" class="text-muted-400 mt-1">
                    1403/01/01  - 1403/02/01
                  </BaseText>
                </div>
                <div class="child text-muted-300 ms-auto">
                  <div class="size-3 rounded-full bg-current" />
                </div>
              </div>
            </BaseCard>
          </BaseRadioHeadless>
          <BaseRadioHeadless v-model="data" value="dates">
            <BaseCard rounded="sm" class="dateCard">
              <div class="flex w-full items-center gap-2">
                <div>
                  <BaseHeading
                    as="h4"
                    size="sm"
                    weight="medium"
                    lead="none"
                  >
                    بازه زمانی
                  </BaseHeading>
                  <BaseText size="xs" class="text-muted-400 mt-1">
                    یک بازه زمانی مشخص کنید
                  </BaseText>
                </div>
                <div class="child text-muted-300 ms-auto">
                  <div class="size-3 rounded-full bg-current" />
                </div>
              </div>
            </BaseCard>
          </BaseRadioHeadless>
    </div>
  </BaseCard>
</template>

<style scoped>
.dateCard{
  @apply peer-checked:!border-primary-500 peer-checked:[&_.child]:!text-primary-500 border-2 p-4 opacity-50 peer-checked:opacity-100;
}

</style>
