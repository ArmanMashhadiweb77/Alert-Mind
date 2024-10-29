<script setup lang="ts">
import { Calendar } from 'v-calendar'

const generateCalendar = () => {
  // Logic to calculate days of the month
  // For simplicity, let's assume 30 days in this example
  const daysInMonth = 30;

  const calendarRows = [];
  for (let i = 1; i <= daysInMonth; i++) {
    calendarRows.push(i);
  }

  return calendarRows;
};
definePageMeta({
  title: 'درباره ما',
  // middleware: ['auth'],
})
</script>

<template>

  <BaseCard rounded="sm" class="p-6 h-[1600px]">


    <div class="relative  right-96">
    <TairoLogo class="size-[384px]" />
    </div>
    <BaseHeading
      as="h4"
      size="2xl"
      weight="semibold"
      lead="loose"
      class="text-muted-800 mt-8 dark:text-white relative right-[515px]"
    >
     ذهن هوشیار
    </BaseHeading>

<div class="grid gap-y-4 mt-4 ">
      <p

        class="text-muted-400 w-full  relative right-[155px] text-lg leading-8  ">
        ذهن هوشیار‍, یک نرم افزار تحت وب و متمرکز برروی مدیریت و کنترل پروژه میباشد,
        شما میتوانید فعالیت های خودرا در از  ذهن
      </p>
    <p

      class="text-muted-400 relative right-[150px] text-lg leading-8 ">
         هوشیار با ساختن دسته بندی ها و پروژه های متفاوت تعریف نمایید;
        کاربران و کارمندان خود را ایجاد و یا به سامانه دعوت نمایید
    </p>
    <p  class="text-muted-400 relative right-[195px] text-lg leading-8">
      انها را به وضایف خود در پروژه های تعریف شده تخصیص دهید و گزارش های متنوعی را از فعالیت انها دریافت نمایید.
    </p>
    <p  class="text-muted-400 relative right-[190px] text-lg leading-8 ">
      ـ همچنین میتوانید با استفاده از نرم افزاری ویندوزی <span class="text-amber-500"> " هوشیار پلاس "</span> فعالیت هر کارمند خودرا زیر نظر داشته باشید.
    </p>
    <p  class="text-muted-400 relative right-[225px] text-lg leading-8">
      ذهن هوشیار در مرداد ماه سال ۱۴۰۰ توسط <span class="text-amber-500">" استودیو برنامه نویسی چشم انداز پارسیان "</span> متولد شده است
    </p>
  <div class="border border-zinc-200 w-[800px] relative right-[200px] "></div>
</div>

    <div class=" mt-10 grid grid-cols-2 mr-[200px]">
      <div>
      <BaseHeading
        as="h3"
        size="md"
        weight="semibold"
        lead="tight"
        class="text-muted-800 mb-4 dark:text-white"
      >
        <span>نسخه 2.0</span>
      </BaseHeading>
      <DemoTimelineCompact rounded="full" />
      </div>
      <div class="mt-[37px]">


        <DemoTimeline rounded="full" />
      </div>

    </div>



  </BaseCard>


</template>

<style scoped>

</style>
