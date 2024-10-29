<script setup lang="ts">
// ================ PROPS & EMITS ================
const props = defineProps(['isModalOpen', 'category'])
const emits = defineEmits(['closeModal', 'newCategory'])

const icons = ref([
  'solar:dumbbell-large-minimalistic-bold-duotone',
  'solar:flash-drive-bold-duotone',
  'solar:notebook-bookmark-bold-duotone',
  'solar:perfume-bold-duotone',
  'solar:airbuds-case-open-bold-duotone',
  'solar:armchair-2-bold-duotone',
  'solar:backpack-bold-duotone',
  'solar:bed-bold-duotone',
  'solar:cart-3-bold-duotone',
  'solar:chef-hat-heart-bold-duotone',
  'solar:city-bold-duotone',
  'solar:cup-paper-bold-duotone',
  'solar:donut-bitten-bold-duotone',
  'solar:rolling-pin-bold-duotone',
  'solar:shop-bold-duotone',
  'solar:trellis-bold-duotone',
  'solar:users-group-two-rounded-bold-duotone',
  'solar:wallet-money-bold-duotone',
])
const formFields = ref(
  {
    title: {
      value: props.category?.title,
      title: 'عنوان',
      placeHolder: 'عنوان دسته بندی را وارد کنید',
      required: true,
      touched: false,
      isValid: false,
      min: null,
      max: null,
      regex: null,
      type: 'String',
      errors: {
        regex: '',
        len: '',
        empty: 'مقدار خالی است',
        type: 'نوع داده اشتباه است',
      },
    },
    description: {
      value: props.category?.description,
      title: 'توضیحات',
      placeHolder: 'توضیحات را وارد کنید',
      required: false,
      touched: false,
      isValid: true,
      min: null,
      max: null,
      regex: null,
      type: 'String',
      errors: {
        regex: '',
        len: '',
        empty: 'مقدار خالی است',
        type: 'نوع داده اشتباه است',
      },
    },
    icon: {
      value: props.category?.icon,
      title: 'نشانه',
      placeHolder: 'نشانه را وارد کنید',
      required: false,
      touched: false,
      isValid: true,
      min: null,
      max: null,
      regex: null,
      type: 'String',
      errors: {
        regex: '',
        len: '',
        empty: 'مقدار خالی است',
        type: 'نوع داده اشتباه است',
      },
    },
  },
)
// const uploadedFiles = ref<FileList | null>(props.category?.icon)

const save = () => {
  emits('newCategory', {
    id: 'new',
    title: formFields.value.title.value,
    description: formFields.value.description.value,
    icon: formFields.value.icon.value,
    isNew: true,
  })
  close()
}

const close = () => {
  emits('closeModal', true)
}

watch(() => props.category, () => {
  formFields.value = {
    title: {
      value: props.category?.title,
      title: 'عنوان',
      placeHolder: 'عنوان دسته بندی را وارد کنید',
      required: true,
      touched: props.category?.title ? true : false,
      isValid: props.category?.title ? true : false,
      min: null,
      max: null,
      regex: null,
      type: 'String',
      errors: {
        regex: '',
        len: '',
        empty: 'مقدار خالی است',
        type: 'نوع داده اشتباه است',
      },
    },
    description: {
      value: props.category?.description,
      title: 'توضیحات',
      placeHolder: 'توضیحات را وارد کنید',
      required: false,
      touched: false,
      isValid: true,
      min: null,
      max: null,
      regex: null,
      type: 'String',
      errors: {
        regex: '',
        len: '',
        empty: 'مقدار خالی است',
        type: 'نوع داده اشتباه است',
      },
    },
    icon: {
      value: props.category?.icon,
      title: 'نشانه',
      placeHolder: 'نشانه را وارد کنید',
      required: false,
      touched: false,
      isValid: true,
      min: null,
      max: null,
      regex: null,
      type: 'String',
      errors: {
        regex: '',
        len: '',
        empty: 'مقدار خالی است',
        type: 'نوع داده اشتباه است',
      },
    },
  }
  // uploadedFiles.value = props.category?.icon
  console.log('props.category', props.category)
}, { deep: true },
)

// const removeFile = () => {
//   const filesArray = Array.from(uploadedFiles.value)
//   filesArray.splice(uploadedFiles.value?.length - 1, 1)

//   const newFileList = new DataTransfer()
//   filesArray.forEach((file) => {
//     newFileList.items.add(file)
//   })
//   uploadedFiles.value = newFileList.files
// }

// watch(uploadedFiles, (value: any) => {
//   let file = value?.item(uploadedFiles.value?.length - 1) || null
//   if (file)
//     if (!file.type.startsWith('image') && uploadedFiles.value.length > 0) {
//       removeFile()
//       toastDanger('فرمت فایل انتخابی اشتباه است')
//     }
//     else if (file.size > 1000000) {
//       removeFile()
//       toastDanger('سایز فایل انتخابی بیشتر از 1 MB است')
//     }
//   console.log('uploadedFiles', uploadedFiles.value)
// })

</script>
<template>
  <TairoModal
    :open="props.isModalOpen"
    size="xl"
    @close="close"
  >
    <template #header>
      <!-- Header -->
      <div class="font-common Estedad_FD_Light flex w-full items-center justify-between p-4 md:p-6">
        <h3 class=" text-muted-900 text-lg font-medium leading-6 dark:text-white">
          افزودن دسته بندی
        </h3>
        <BaseButtonClose
          size="xs"
          rounded="lg"
          color="muted"
          @click="close"
        />
      </div>
    </template>

    <!-- Body -->
    <div class="font-common Estedad_FD_Light">
      <div class="mx-auto w-full max-w-lg text-center">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 ">
            <BaseInput
              v-model="formFields.title.value"
              rounded="sm"
              size="sm"
              :placeholder="formFields.title.placeHolder"
              :label="formFields.title.title"
              :classes="{
                input: 'h-12 text-base text-center',
              }"
              :error="checkValidation(formFields.title)"
              @focus="setToched(formFields.title)"
            />
          </div>
          <div class="col-span-12 ">
            <BaseTextarea
              v-model="formFields.description.value"
              :placeholder="formFields.description.placeHolder"
              :label="formFields.description.title"
              rounded="sm"
              :error="checkValidation(formFields.description)"
              @focus="setToched(formFields.description)"
            />
          </div>
          <div class="col-span-12">
            <div
              class="col-span-12 flex flex-col justify-start pb-1 sm:col-span-3"
            >
              <label class="nui-label text-[0.825rem]">نشانه</label>
            </div>
            <div class="col-span-12 sm:col-span-9">
              <div class="grid gap-4 sm:grid-cols-6">
                <div
                  v-for="item in icons"
                  :key="item"
                  class="relative"
                >
                  <BaseRadioHeadless
                    v-model="formFields.icon.value"
                    name="radio_custom"
                    :value="item"
                  >
                    <BaseCard
                      rounded="sm"
                      class="peer-checked:!border-success-500 peer-checked:!bg-success-500/10 relative border-2 p-2 peer-checked:[&_.child]:!opacity-100 "
                    >
                      <div class="flex w-full items-center justify-center">
                        <Icon
                          :name="item"
                          color="#4c4c4c"
                          class="size-8 flex-none rounded-full object-contain"
                        />
                      </div>
                    </BaseCard>
                  </BaseRadioHeadless>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <!-- Footer -->
      <div class="font-common Estedad_FD_Light p-4 md:p-6">
        <div class="flex gap-x-2">
          <BaseButton @click="close">
            انصراف
          </BaseButton>

          <BaseButton
            color="primary"
            variant="solid"
            :disabled="!formFields.title.value || formFields.title.value == ''"
            @click="save"
          >
            ذخیره
          </BaseButton>
        </div>
      </div>
    </template>
  </TairoModal>
</template>
