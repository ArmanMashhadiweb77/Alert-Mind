<script setup lang="ts">
const props = defineProps(["title", "description"])

</script>

<template>
    <BaseCard rounded="sm" class="h-full peer-checked:!border-primary-500 peer-checked:[&_.child]:!text-primary-500 border-2 p-4 opacity-50 peer-checked:opacity-100">
      <div class="flex w-full items-center gap-2 h-full">
        <!--                  <BaseAvatar src="/img/avatars/10.svg" />-->
        <div>
          <BaseHeading
            as="h4"
            size="sm"
            weight="medium"
            lead="none"
          >
            {{ props.title }}
          </BaseHeading>

          <BaseText size="xs" class="text-muted-500 mt-1">
            {{ props.description }}
          </BaseText>
        </div>
        <div class="child text-muted-300 ms-auto">
          <div class="size-3 rounded-full bg-current" />
        </div>
      </div>
    </BaseCard>
</template>

<style scoped>

</style>
