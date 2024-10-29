<script lang="ts" setup>
// ======== PROPS & EMITS ======== //
const props = defineProps(["label", "description"])
</script>

<template>
  <div class="input-label">
    <div :data-nui-tooltip="props.description" class="input-label-top">
      <Icon class="text-purple-600 me-1 size-5" name="material-symbols:info-outline"/>
      <span class="text-muted-800 dark:text-white font-semibold"> {{ props.label }} </span>
    </div>
    <div class="input-label-bottom mt-1">
      <p class="label-description">
        {{ props.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.input-label {
  @apply inline-flex flex-col items-start text-xs mb-1;

  .input-label-top {
    @apply mb-1;
  }

  .input-label-bottom {
    .label-description {
      @apply text-slate-400/80;
    }
  }
}

</style>
