<script setup lang="ts">

import DatePicker from '@alireza-ab/vue3-persian-datepicker'

const emits = defineEmits(['getWorkTimes'])
const workTimes = ref([
  {
    name: 'saturday',
    title: 'شنبه',
    value: '',
  },
  {
    name: 'sunday',
    title: 'یک شنبه',
    value: '',
  },
  {
    name: 'monday',
    title: 'دو شنبه',
    value: '',
  },
  {
    name: 'tuesday',
    title: 'سه شنبه',
    value: '',
  },
  {
    name: 'wednesday',
    title: 'چهار شنبه',
    value: '',
  },
  {
    name: 'thursday',
    title: 'پنج شنبه',
    value: '',
  },
  {
    name: 'friday',
    title: 'جمعه',
    value: '',
  },
])
const timeShock = ref(true)


const uniteWorktimes = (value: any) =>{
  if(value && value != ''){
    timeShock.value = false
  for (var item of Object.values(workTimes.value)) {
    item.value = value
  }
  setTimeout(() => {
    timeShock.value = true
  }, 50);
  emits('getWorkTimes', workTimes)
  }
}

const addLabel = () => {
  setTimeout(() => {
    const pdp_moment = document.querySelector(".pdp-moment");

    // Function to create and style a label element
    const createLabel = (text) => {
      const label = document.createElement("p");
      label.style.fontSize = "15px";
      label.style.textAlign = "center";
      label.style.color = "#777";
      label.style.padding = "8px 0";
      label.innerText = text;
      return label;
    };

    // Add "از ساعت :" before the first div in pdp-moment
    const pdp_moment_first = document.querySelector(".pdp-moment > div:first-child");
    if (pdp_moment_first) {
      const pdp_moment_first_p = createLabel("از ساعت:");
      pdp_moment.insertBefore(pdp_moment_first_p, pdp_moment_first);
    }

    // Add "تا ساعت :" before the last div in pdp-moment
    const pdp_moment_last = document.querySelector(".pdp-moment > div:last-child");
    if (pdp_moment_last) {
      const pdp_moment_last_p = createLabel("تا ساعت:");
      pdp_moment.insertBefore(pdp_moment_last_p, pdp_moment_last);
    }

  }, 200);
};

// const emitWorkTimes = () => {
//   emits('getWorkTimes', workTimes.value)
// }
</script>
<template>
  <div>
    <div class="grid grid-cols-3 gap-2" v-if="timeShock === true">
      <div  v-for="item in workTimes" :key="item.name">
        <div class="col-span-12 sm:col-span-4">
          <div
            class="col-span-12  justify-start pt-1 sm:col-span-4"
          >
            <label class="nui-label text-[0.825rem]">{{ item.title }}</label>
            <BaseButtonIcon
              class="float-end mb-1"
              rounded="sm" 
              variant="outline"
              size="sm" 
              data-nui-tooltip="تایید برای همه"
              v-if="item.value != ''"
              @click="uniteWorktimes(item.value)">
              <Icon name="ic:round-content-copy" color="primary" class="-ms-1 size-4" />
            </BaseButtonIcon>
          </div>
          <div class="flex w-full flex-col gap-4 sm:flex-row">
            <date-picker
              v-model="item.value"
              :modal="true"
              type="time"
              format="HH:mm"
              input-format="HH:mm"
              @close="emits('getWorkTimes', workTimes)"
              @open="addLabel"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
