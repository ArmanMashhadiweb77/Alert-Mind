<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'rounded' | 'curved' | 'full'
  }>(),
  {
    shape: 'rounded',
  },
)

const items = [
  {
    icon: 'ph:phone-duotone',
    image: undefined,
    title: 'افزونه جلسات : مشاهده لیست دعوتنامه ها',
    description: 'تاریخ برگزاری 1402/06/08',
  },
  {
    icon: 'ph:phone-duotone',
    image: undefined,
    title: 'افزونه جلسات : مشاهده جلسه روی تقویم',
    description: '  تاریخ برگزاری 1402/06/08',
  },
  {
    icon: 'ph:chat-circle-duotone',
    image: undefined,
    title: 'افزونه جلسات : امکان حذف جلسه ',
    description: ' تاریخ برگزاری 1402/06/08',
  },
  {
    icon:'ph:chat-circle-duotone',
    image: undefined,
    title: 'افزونه جلسات : امکان مشاهده جلسه',
    description: ' تاریخ برگزاری 1402/06/08',
  },
  {
    icon: 'ph:envelope-duotone',
    image: undefined,
    title: 'اضافه  شدن افزونه جلسات ',
    description: ' تاریخ برگزاری 1402/05/16',
  },
  {
    icon: 'ph:selection-all-duotone',
    image: undefined,
    title: 'افزونه جلسات : تقویم جلسات',
    description: 'تاریخ برگزاری 1402/05/16',
  },
  {
    icon: 'ph:note-duotone',
    image: undefined,
    title: 'افزونه جلسات : اعلان های دعوت به جلسه',
    description: ' تاریخ برگزاری 1402/05/16',
  },
  {
    icon: 'ph:note-duotone',
    image: undefined,
    title: 'افزونه جلسات : تنظیمات جلسات',
    description: ' تاریخ برگزاری 1402/05/16',
  },
  {
    icon: 'ph:note-duotone',
    image: undefined,
    title: 'افزونه جلسات : ثبت جلسه جدید',
    description: ' تاریخ برگزاری 1402/05/16',
  },


]
</script>

<template>
  <div>
    <!-- Item -->
    <div
      v-for="item in items"
      :key="item.title"
      class="after:border-muted-300 dark:after:border-muted-600 relative flex pb-8 after:absolute after:start-4 after:top-10 after:h-[calc(100%_-_36px)] after:w-px after:border-l after:content-['']"
    >
      <div
        class="border-muted-200 text-muted-400 after:border-muted-300 dark:border-muted-600 dark:bg-muted-700 dark:after:border-muted-600 relative flex size-9 items-center justify-center border bg-white shadow-lg after:absolute after:-end-8 after:top-4 after:h-px after:w-5 after:border-t after:content-['']"
        :class="[
          props.shape === 'rounded' ? 'rounded-md' : '',
          props.shape === 'curved' ? 'rounded-xl' : '',
          props.shape === 'full' ? 'rounded-full' : '',
        ]"
      >
        <Icon
          v-if="item.icon"
          :name="item.icon"
          class=""
        />
        <img
          v-if="item.image"
          :src="item.image"
          class="max-w-full object-cover shadow-sm dark:border-transparent"
          :class="[
            props.shape === 'rounded' ? 'rounded-md' : '',
            props.shape === 'curved' ? 'rounded-xl' : '',
            props.shape === 'full' ? 'rounded-full' : '',
          ]"
          :alt="item.title"
        >
      </div>
      <div class="ms-10">
        <h6
          class="font-heading text-muted-800 text-sm font-bold dark:text-white"
        >
          {{ item.title }}
        </h6>
        <p class="text-red-600 mt-2 font-sans text-xs">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>
