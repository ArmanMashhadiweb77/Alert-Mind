<script setup lang="ts">
definePageMeta({
  title: 'تیم ها',
  // middleware: ['auth'],
})
const fields = reactive({
  first: '',
  second: '',
  third: '',
  fourth: '',
})
</script>

<template>
  <div class="w-80 flex " >


  <BaseInput
    v-model="fields.second"
    icon="lucide:search"
    size="md"
    rounded="md"
    placeholder="جست و جو"
  />
    <div class="relative right-[960px]">
      <NuxtLink
      to="/admin/teams/registration" >
    <BaseButton rounded="sm" color="primary"  class="gap-2  ">
      <icon name="octicon:plus"/>

       جدید
    </BaseButton>
      </NuxtLink>
    </div>
  </div>
  <BaseCheckboxHeadless  value="team_member_1">
    <BaseCard
      rounded="sm"
      class="peer-checked:!border-primary-500 peer-checked:[&_.child]:!text-primary-500 border-2 p-4 w-60 mt-16 opacity-50 peer-checked:opacity-100"
    >
      <div class="flex w-full items-center gap-2">
        <BaseAvatar
          rounded="full"
          text="AM"
          size="md"
          class="bg-red-100 text-red-500 dark:bg-red-500 dark:text-white"
          src="/img/avatars/18.svg"
        />

        <div>
          <BaseHeading
            as="h4"
            size="sm"
            weight="medium"
            lead="none"
          >
          Arman Mashhadi
          </BaseHeading>

          <BaseText size="xs" class="text-muted-400">
            programmer
          </BaseText>
        </div>

        <div class="child text-muted-300 ms-auto">
          <div class="size-3 rounded-full bg-current" />
        </div>
      </div>
    </BaseCard>
  </BaseCheckboxHeadless>

</template>

<style scoped>

</style>
