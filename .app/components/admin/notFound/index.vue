<script setup lang="ts">

</script>

<template>
  <div class="flex h-[400px] w-full items-center justify-center">
    <BasePlaceholderPage
      title="موردی یافت نشد"
      subtitle="به نظر می‌رسد ما نتوانستیم هیچ نتیجه منطبقی برای عبارات جستجوی شما پیدا کنیم. سایر عبارات جستجو را امتحان کنید.">
      <template #image>
        <img
          class="block dark:hidden"
          src="/img/illustrations/404-1.png"
          alt="Placeholder image"
        >
        <img
          class="hidden dark:block"
          src="/img/illustrations/404-1.png"
          alt="Placeholder image"
        >
      </template>
    </BasePlaceholderPage>
  </div>
</template>

<style scoped>

</style>
