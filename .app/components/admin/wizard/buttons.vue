<script setup lang="ts">
const store = useWizardStore()

const goToPrev = () => {
  store.goToPrevStep();
}

const goToNext = () => {
  store.goToNextStep()
}
</script>

<template>
  <div>
    <Transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="translate-y-20 opacity-0"
      enter-to-class="translate-y-0 opacity-100" leave-active-class="transition-all duration-100 ease-in"
      leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-20 opacity-0">
      <div v-if="store.getCurrentStep > 1" class="fixed inset-x-0 bottom-6 z-20 mx-auto w-full max-w-[304px]">
        <BaseCard
          class="shadow-muted-300/30 dark:shadow-muted-800/30 flex items-center justify-between gap-2 rounded-2xl p-4 shadow-xl">
          <BaseButton @click="goToPrev()" rounded="lg" class="w-full">
            <span>قبلی</span>
          </BaseButton>

          <BaseButton v-if="store.getCurrentStep < 6" @click="goToNext()" rounded="lg" color="primary"
            class="w-full">
            <span>ادامه</span>
          </BaseButton>

          <BaseButton v-else type="submit" rounded="lg" color="primary" class="w-full" :loading="store.loading"
            :disabled="store.loading">
            <span>تمام</span>
          </BaseButton>

        </BaseCard>
      </div>
    </Transition>
  </div>
</template>
