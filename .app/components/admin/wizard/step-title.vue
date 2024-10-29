<script setup lang="ts">

const store = useWizardStore()
const currentStepData = computed(() =>
   store?.getCurrentStepInfo
)
</script>

<template>
  <div class="mb-6 text-center">
    <BaseHeading
      tag="h1" size="xl" class="text-muted-800 dark:text-white">
      <span>{{ store?.getCurrentStepInfo?.title }}</span>
    </BaseHeading>
    <BaseParagraph size="sm" class="text-muted-500 dark:text-muted-400 mt-2">
      <span>{{ store?.getCurrentStepInfo?.subtitle }}</span>
    </BaseParagraph>
  </div>
</template>
