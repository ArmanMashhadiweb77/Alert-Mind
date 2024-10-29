<script setup lang="ts">
// ================ PROPS & EMITS ================
const props = defineProps(['isModalOpen', 'collection'])
const emits = defineEmits(['closeModal', 'newCollection'])

const formFields = ref(
  {
    title: {
      value: props.collection?.title,
      title: 'عنوان',
      placeHolder: 'عنوان محدوده جغرافیایی را وارد کنید',
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
      value: props.collection?.description,
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
  },
)
const uploadedFiles = ref<FileList | null>(props.collection?.files)

const save = () => {
  emits('newCollection', {
    id: 0,
    title: formFields.value.title.value,
    description: formFields.value.description.value,
    files: uploadedFiles,
    rate: null,
  })
  close()
}

const close = () => {
  emits('closeModal', true)
}
const cancel = () => {
  close()
}
const removeFile = () => {
  const filesArray = Array.from(uploadedFiles.value)
  filesArray.splice(uploadedFiles.value?.length - 1, 1)

  const newFileList = new DataTransfer()
  filesArray.forEach((file) => {
    newFileList.items.add(file)
  })
  uploadedFiles.value = newFileList.files
}

watch(uploadedFiles, (value: any) => {
  let file = value?.item(uploadedFiles.value?.length - 1) || null
  if (file)
    if (!file.type.startsWith('image') && uploadedFiles.value.length > 0) {
      removeFile()
      toastDanger('فرمت فایل انتخابی اشتباه است')
    }
    else if (file.size > 1000000) {
      removeFile()
      toastDanger('سایز فایل انتخابی بیشتر از 1 MB است')
    }
  console.log('uploadedFiles', uploadedFiles.value)
})

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
          افزودن محدوده جغرافیایی
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
        </div>
        <div class="col-span-12 sm:col-span-6">
          <div
            class="col-span-12 flex flex-col justify-start pt-4 sm:col-span-3"
          >
            <label class="nui-label text-[0.825rem]"> تصویر ها</label>
          </div>
          <div class="col-span-12 sm:col-span-9">
            <BaseInputFileHeadless
              v-slot="{ open, remove, preview, drop, files }"
              v-model="uploadedFiles"
              multiple
            >
              <!-- Controls -->
              <div
                role="button"
                tabindex="-1"
                class=""
                @dragenter.stop.prevent
                @dragover.stop.prevent
                @drop="drop"
              >
                <div
                  class="nui-focus border-muted-300 dark:border-muted-700 hover:border-muted-400 focus:border-muted-400 dark:hover:border-muted-600 dark:focus:border-muted-700 group m-3 cursor-pointer rounded-lg border-[3px] border-dashed p-1 transition-colors duration-300"
                  tabindex="0"
                  role="button"
                  @click="open"
                  @keydown.enter.prevent="open"
                >
                  <div class="p-1 text-center">
                    <Icon
                      name="mdi-light:cloud-upload"
                      class="text-muted-400 group-hover:text-primary-500 group-focus:text-primary-500 mb-1 size-10 transition-colors duration-300"
                    />
                    <h4 class="text-muted-400 text-sm">
                      فایل را بکشید و رها کنید
                    </h4>
                    <div>
                      <span
                        class="text-muted-400 text-[0.7rem] font-semibold uppercase"
                      >
                        یا
                      </span>
                    </div>
                    <label
                      for="file"
                      class="text-muted-400 group-hover:text-primary-500 group-focus:text-primary-500 cursor-pointer text-sm underline underline-offset-4 transition-colors duration-300"
                    >
                      انتخاب کنید
                    </label>
                  </div>
                </div>
                <ul v-if="files?.length" class="mt-3 space-y-2">
                  <li v-for="file in files" :key="file.name">
                    <div
                      class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative flex items-center justify-end gap-2 rounded-md border bg-white p-2"
                    >
                      <div class="flex items-center gap-2">
                        <div class="shrink-0">
                          <img
                            v-if="file.type.startsWith('image')"
                            class="size-14 rounded-xl object-cover object-center"
                            :src="preview(file).value"
                            alt="Image preview"
                          >
                          <img
                            v-else
                            class="size-14 rounded-xl object-cover object-center"
                            src="/img/illustrations/wizard/upload.svg"
                            alt="Image preview"
                          >
                        </div>
                        <div>
                          <span
                            class="text-muted-800 dark:text-muted-100 line-clamp-1 block text-sm"
                          >
                            {{ file.name }}
                          </span>
                          <span class="text-muted-400 block text-xs">
                            {{ formatFileSize(file.size) }}
                          </span>
                        </div>
                      </div>

                      <div
                        class="ms-auto w-32 px-4 transition-opacity duration-300"
                        :class="'opacity-100'"
                      >
                        <BaseProgress
                          :value="100"
                          size="xs"
                          :color="'success'"
                        />
                      </div>
                      <div class="flex gap-2">
                        <!-- <button
                          class="border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-900 dark:hover:border-primary-500 dark:hover:text-primary-600 relative flex size-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60"
                          disabled
                          type="button"
                          tooltip="انصراف"
                        >
                          <Icon name="lucide:slash" class="size-4" />
                          <span class="sr-only">انصراف</span>
                        </button>

                        <button
                          class="border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-900 dark:hover:border-primary-500 dark:hover:text-primary-600 relative flex size-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300"
                          type="button"
                          tooltip="آپلود"
                        >
                          <Icon name="lucide:arrow-up" class="size-4" />
                          <span class="sr-only">آپلود</span>
                        </button> -->
                        <button
                          class="border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-900 dark:hover:border-primary-500 dark:hover:text-primary-600 relative flex size-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300"
                          type="button"
                          tooltip="حذف"
                          @click.prevent="remove(file)"
                        >
                          <Icon name="lucide:x" class="size-4" />
                          <span class="sr-only">حذف</span>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </BaseInputFileHeadless>
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
