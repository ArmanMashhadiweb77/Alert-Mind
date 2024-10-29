<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  }>(),
  {
    rounded: 'sm',
  },
)


const users = [
  {
    id: 0,
    icon: 'octicon:x',
    name: 'تعداد درخواست های',
    position: 'بررسی نشده',
    progress: 0,
    class:"bg-rose-500 shadow-rose-500/50 shadow-lg  text-white font-black text-xl",

  },
  {
    id: 1,
    icon: 'octicon:home',
    name: 'تعداد فروشگاه ها',
    position: 'در حال فعالیت',
    progress: 0,
    class:"bg-orange-500 text-white shadow-lg shadow-orange-500/50",

  },
  {
    id: 2,
    icon: 'octicon:person-fill-16',
    name: 'تعداد بازرس ها ',
    position: 'مرخصی',
    progress: 0,
    class:"bg-primary-500 shadow-primary-500/50 text-white shadow-lg",

  },
  {
    id: 3,
    icon: 'octicon:calendar',
    name: 'تعداد ماموریت های ',
    position: 'انجام شده',
    progress: 0,
    class:"bg-green-500 text-white shadow-lg shadow-green-500/50",

  },
  {
    id: 4,
    icon: 'octicon:calendar-16',
    name: 'تعداد ماموریت های',
    position: 'باقی مانده این هفته',
    progress: 0,
    class:"bg-blue-500 text-white text-muted-800  shadow-lg shadow-blue-500/50 mask-hex",

  },

]
type MaskData = "hex" | "hexed" | "deca" | "blob" | "diamond" | undefined

const mask = ref<MaskData>()
</script>

<template>
  <div class="space-y-6">
    <div
      v-for="user in users"
      :key="user.id"
      class="flex items-center gap-2"
    >
      <BaseIconBox
        size="md"
        rounded="lg"
        color="none"
        :class="user.class"
        :mask="mask"

      >
        <Icon :name="user.icon"  class="size-5" />
      </BaseIconBox>
      <div>
        <BaseHeading
          as="h1"
          size="sm"
          weight="extrabold"
          lead="tight"
          class="text-muted-800 dark:text-muted-100"
        >
          <span>{{ user.name }}</span>
        </BaseHeading>
        <BaseText size="xs" class="text-muted-400">
          <span>{{ user.position }}</span>
        </BaseText>
      </div>
      <div class="ms-auto flex items-center justify-end gap-4">
        <BaseParagraph
          size="sm"
          weight="semibold"
          :class="user.progress > 0 ? 'text-success-500' : ''"
        >
          <span>{{ user.progress }}</span>
        </BaseParagraph>
<!--        <BaseButtonIcon-->
<!--          to="#"-->
<!--          muted-->
<!--          small-->
<!--          :rounded="props.rounded"-->
<!--        >-->
<!--          <Icon name="lucide:chevron-right" class="size-4" />-->
<!--        </BaseButtonIcon>-->
      </div>
    </div>
  </div>
</template>
