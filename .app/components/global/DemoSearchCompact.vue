<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    rounded?: 'none' | 'sm' | 'md' | 'lg'
  }>(),
  {
    rounded: 'sm',
  },
)

const search = ref('')
</script>

<template>
  <div class="w-full">
    <div class="relative flex w-full items-center gap-2">
      <BaseInput
        v-model="search"
        icon="lucide:search"
        placeholder="جستجو کنید..."
        :rounded="props.rounded"
        :classes="{
          wrapper: 'w-full',
          input:
            'pe-24 !bg-muted-100 dark:!bg-muted-700 focus:!bg-white dark:focus:!bg-muted-900',
        }"
      />
      <button
        type="button"
        class="bg-primary-500 absolute end-1 top-1 inline-flex h-8 items-center justify-center px-4 font-sans text-sm text-white"
        :class="[
          props.rounded === 'sm' ? 'rounded' : '',
          props.rounded === 'md' ? 'rounded-md' : '',
          props.rounded === 'lg' ? 'rounded-lg' : '',
        ]"
      >
        <span>جستجو</span>
      </button>
    </div>

  </div>
</template>
