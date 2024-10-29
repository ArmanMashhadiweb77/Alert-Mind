<template>
  <div>
    <BasePlaceholderPage
      title="نتیجه ای یافت نشد!"
      subtitle="به نظر می‌رسد ما نتوانستیم هیچ نتیجه منطبقی برای جستجوی شما پیدا کنیم. سایر عبارات جستجو را امتحان کنید."
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
    </BasePlaceholderPage>
  </div>
</template>
