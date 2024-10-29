<script setup lang="ts">

definePageMeta({
  layout: 'empty',
  // middleware: ['auth'],
})

const route = useRoute()

const title = ref('')
const subtitle = ref('')
const src = ref('')

//#region Constractors
onMounted(async () => {
  var type = route.query.type ? parseInt(route.query.type.toString()) : null

})

</script>
<template>
  <div class="Estedad_FD_Light font-common">
    <BasePlaceholderPage
      :title="title"
      subtitle="برای استفاده از پنل نیاز است حداقل یک کسب و کار ثبت کنید."
    >
      <template #image>
        <img
          class="block dark:hidden"
          src="/img/placeholder/flat/placeholder-search-4.svg"
          alt="Placeholder image"
        >
        <img
          class="hidden dark:block"
          src="/img/placeholder/flat/placeholder-search-4-dark.svg"
          alt="Placeholder image"
        >
      </template>
      <div class="mx-auto mt-4 flex w-full max-w-[280px] justify-between gap-2">
        <BaseButton
          color="primary"
          rounded="lg"
          class="h-11 w-full"
        >
          داشبورد
          <Icon name="lucide:chevron-left" class="-ms-1 size-6" />
        </BaseButton>
        <!-- <BaseButton
          rounded="lg"
          class="h-11 w-full"
          @click="$router.back()"
        >
          بازگشت
        </BaseButton> -->
      </div>
    </BasePlaceholderPage>
  </div>
</template>
