<script setup lang="ts">
import moment from 'moment-jalaali'

const dayP = moment().format('jD')
const monthP = new Intl.DateTimeFormat('fa-IR', { month: 'short' }).format(new Date())
const yearP = moment().format('jYYYY')
const dateE = moment().format('YYYY/M/D')

</script>
<template>
  <div>
    <div class="mb-6 items-center justify-between text-center">
      <BaseHeading
        as="h3"
        weight="semibold"
        lead="tight"
        class="text-muted-800 dark:text-white"
      >
        <p class="mb-4 text-center" style="font-size: xx-large;">
          {{ dayP }}
        </p>
        <span class="text-center">{{ monthP }}  {{ yearP }}</span>
      </BaseHeading>
    </div>
    <!-- <div class="mb-6" /> -->
    <div class="mt-auto">
      <div
        class="border-muted-200 dark:border-muted-700 flex w-full border-t pt-4 text-center"
      >
        <div
          class="border-muted-200 dark:border-muted-700 flex-1 border-r px-2"
        >
          <!-- <span class="text-muted-400 font-sans text-xs">
            Completed
          </span> -->
          <p
            class="text-muted-800 dark:text-muted-100 font-sans text-lg font-medium"
          >
            {{ dateE }}
          </p>
        </div>
        <!-- <div class="flex-1 px-2">
          <span class="text-muted-400 font-sans text-xs">
            In Progress
          </span>
          <p
            class="text-muted-800 dark:text-muted-100 font-sans text-lg font-medium"
          >
            219
          </p>
        </div> -->
      </div>
    </div>
  </div>
</template>
