<script setup lang="ts">
// const props = defineProps(['step'])
definePageMeta({
  title: 'Wizard — Step 1',

})
useHead({
  title: 'نوع کاربری',
})
const store = useWizardStore()

const goToNextStep = (isCompany: boolean) => {
  if (isCompany == undefined)
    toastDanger('لطفا نوع کاربری را مشخص کنید!')
  store.wizardModel.isCompany = isCompany
  store.goToNextStep()
}
// watch(
//   () => props.step,
//   () => {
//     if (props.step) {
//       store.goToStep(props.step)
//     }
//   },
//   { deep: true },
// )
</script>

<template>
  <div>
    <!-- مرحله 1 : نوع کاربری' -->
    <AdminWizardStepTitle />
    <div class="mx-auto w-full max-w-4xl px-4 text-center">
      <div class="ltablet:grid-cols-2 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        <!-- Choice -->
        <div
          class="dark:hover:bg-muted-800 hover:shadow-muted-300/30 dark:hover:shadow-muted-800/30 group rounded-sm p-5 transition-all duration-300 hover:bg-white hover:shadow-xl"
          :class="[
            store.wizardModel.isCompany === true
              ? 'dark:bg-muted-800 shadow-muted-300/30 dark:shadow-muted-800/30 bg-white shadow-xl'
              : '',
          ]"
        >
          <img
            class="rounded-sm"
            src="/img/illustrations/Work-Two-Person.jpg"
            alt="legal"
          >
          <div class="my-3">
            <BaseHeading
              tag="h4"
              weight="medium"
              size="lg"
              class="text-muted-800 dark:text-muted-100 mb-1"
            >
              <span>شخص حقوقی</span>
            </BaseHeading>
            <BaseParagraph class="text-muted-500" size="xs">
              <span>
                اگر مالک کسب و کار شما، شخص حقوقی است این مورد را انتخاب کنید.
              </span>
            </BaseParagraph>
          </div>
          <div class="mb-3 flex flex-col items-center">
            <BaseButton
              color="primary"
              rounded="sm"
              class="w-36"
              @click="goToNextStep(true)"
            >
              <span>
                {{ store.wizardModel.isCompany === true ? 'انتخاب شده' : 'انتخاب' }}
              </span>
            </BaseButton>
            <!-- <div class="mt-3 text-center">
              <NuxtLink
                to="#"
                class="text-muted-400 hover:text-primary-500  text-[0.65rem] uppercase opacity-0 transition-all duration-300 group-hover:opacity-100"
              >
                <span>اطلاعات بیشتر</span>
              </NuxtLink>
            </div> -->
          </div>
        </div>
        <!-- Choice -->
        <div
          class="dark:hover:bg-muted-800 hover:shadow-muted-300/30 dark:hover:shadow-muted-800/30 group rounded-sm p-5 transition-all duration-300 hover:bg-white hover:shadow-xl"
          :class="[
            store.wizardModel.isCompany === false
              ? 'dark:bg-muted-800 shadow-muted-300/30 dark:shadow-muted-800/30 bg-white shadow-xl'
              : '',
          ]"
        >
          <img
            class="rounded-sm"
            src="/img/illustrations/Work-One-Person.jpg"
            alt="real"
          >
          <div class="my-3">
            <BaseHeading
              tag="h4"
              weight="medium"
              size="lg"
              class="text-muted-800 dark:text-muted-100 mb-1"
            >
              <span>شخص حقیقی</span>
            </BaseHeading>
            <BaseParagraph class="text-muted-500" size="xs">
              <span>
                اگر مالک کسب و کار شما، شخص حقیقی است این مورد را انتخاب کنید.
              </span>
            </BaseParagraph>
          </div>
          <div class="mb-3 flex flex-col items-center">
            <BaseButton
              color="primary"
              rounded="sm"
              class="w-36"
              @click="goToNextStep(false)"
            >
              <span>
                {{ store.wizardModel.isCompany === false ? 'انتخاب شده' : 'انتخاب' }}
              </span>
            </BaseButton>
            <!-- <div class="mt-3 text-center">
              <NuxtLink
                to="#"
                class="text-muted-400 hover:text-primary-500  text-[0.65rem] uppercase opacity-0 transition-all duration-300 group-hover:opacity-100"
              >
                <span>اطلاعات بیشتر...</span>
              </NuxtLink>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
