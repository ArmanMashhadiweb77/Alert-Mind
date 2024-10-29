<script setup lang="ts">
definePageMeta({
  // middleware: ['auth'],
})
</script>
<template>
  <ClientOnly fallback-tag="span" fallback="لطفا صبر کنید">
    <TairoSidebarLayout class="Estedad_FD_Light font-common">
    <slot />
  </TairoSidebarLayout>
    </ClientOnly>
</template>
