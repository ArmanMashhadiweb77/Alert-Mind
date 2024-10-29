<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps(['heading'])
const emits = defineEmits(['ordering'])
// const decideChevron = (orderBy: string) => {
//   if (orderBy == '') return 'lucide:chevrons-up-down'
//   else if (orderBy == 'asc') return 'lucide:chevron-down'
//   else if (orderBy == 'desc') return 'lucide:chevron-up'
//   else return ''
// }
const decideChevron = (orderBy: string) => {
  return orderBy === 'asc' ? 'lucide:chevron-down' :
    orderBy === 'desc' ? 'lucide:chevron-up' :
      'lucide:chevrons-up-down';
};
// const ordering = (head: any) => {
//   let orderBy = ''
//   if (head.orderBy == '') orderBy = 'asc'
//   else if (head.orderBy == 'asc') orderBy = 'desc'
//   else if (head.orderBy == 'desc') orderBy = 'asc'
//
//   emits('ordering', { code: head.code, orderBy })
// }

const ordering = (head: any) => {
  const orderBy = head.orderBy === 'asc' ? 'desc' : 'asc';
  emits('ordering', { code: head.code, orderBy });
};
</script>

<template>
  <TairoTable shape="rounded" :scrollable="true">
    <template #header>
      <TairoTableHeading
        v-for="(head, i) in heading"
        :key="`heading_${i}`"
        spaced
        class="text-start"
        @click="head.isSortable ? ordering(head) : null"
      >
        <div class="flex flex-row text-center justify-center" :class="{ 'cursor-pointer': head.isSortable }">
          <Icon
            v-if="head.isSortable"
            :icon="decideChevron(head.orderBy)"
            class="ml-2 self-center"
            size="5"
          />

          <span class="text-xs">{{ head.title }}</span>
        </div>
      </TairoTableHeading>
    </template>

    <slot />
  </TairoTable>
</template>

<style scoped></style>
