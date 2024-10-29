<script lang="ts" setup>
import MyComment from "~/component/MyComment.vue";
import Checkbox from "~/component/checkbox.vue";
import Inter from "~/component/global/Inter.vue";

definePageMeta({
  layout:"sidebar",
  title:"داشبورد",


})
</script>


<template>
  <div class="flex items-center gap-2">
    <base-theme-toggle/>
    <BaseAvatar
        rounded="full"
        text="A"
        size="sm"
        class="bg-teal-100 text-teal-500 dark:bg-teal-500 dark:text-white cursor-pointer"
    />
  </div>
  <MyComment/>
  <div class="flex mt-[100px] ">
    <BaseCheckbox
        label="alertmind"
        rounded="none"
        color="primary"
    />

  </div>
  <div class="flex mt-4 ">
    <BaseCheckbox
        label="دفتر چشم انداز"
        rounded="none"
        color="primary"
    />
  </div>




</template>


<style scoped>

</style>
