<script setup lang="ts">
// const props = defineProps(['step'])
const store = useWizardStore()
definePageMeta({
  title: 'مرحله 4',
})

useHead({
  title: 'مدارک و مستندات',
})

const CEONationalCardFile = ref<FileList | null>(store.wizardModel.CEONationalCardFile)
const foundedAdFile = ref<FileList | null>(store.wizardModel.foundedAdFile)
const nationalCodePicFile = ref<FileList | null>(store.wizardModel.nationalCodePicFile)
const toggled = ref(Boolean(CEONationalCardFile?.value?.length || nationalCodePicFile?.value?.length || foundedAdFile?.value?.length))

const formFields = ref(
  {
    CEONationalCard: {
      value: '',
      title: 'کارت ملی مدیر عامل',
      placeHolder: 'کارت ملی مدیر عامل',
      required: store.wizardModel.isCompany ? true : false,
      touched: false,
      isValid: store.wizardModel.isCompany ? false : true,
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
    foundedAd: {
      value: '',
      title: 'آگهی تاسیس',
      placeHolder: 'آگهی تاسیس',
      required: store.wizardModel.isCompany ? true : false,
      touched: false,
      isValid: store.wizardModel.isCompany ? false : true,
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
    nationalCodePic: {
      value: 0,
      title: 'تصویر کارت ملی',
      placeHolder: 'تصویر کارت ملی',
      required: !store.wizardModel.isCompany ? true : false,
      touched: false,
      isValid: !store.wizardModel.isCompany ? false : true,
      min: null,
      max: null,
      regex: null,
      type: 'Number',
      errors: {
        regex: '',
        len: '',
        empty: 'مقدار خالی است',
        type: 'نوع داده اشتباه است',
      },
    },
  },
)
const fillFields = () => {
  store.wizardModel.CEONationalCardFile = CEONationalCardFile.value
  store.wizardModel.foundedAdFile = foundedAdFile.value
  store.wizardModel.nationalCodePicFile = nationalCodePicFile.value
}
const goToPrev = () => {
  fillFields()
  store.goToPrevStep()
}
const goToNext = () => {
  fillFields()
  store.goToNextStep()
}
// watch(
//   () => props.step,
//   () => {
//     if (props.step) {
//       for (var item of Object.values(formFields.value)) {
//         if (!item.isValid) {
//           setToched(item)
//           checkValidation(item)
//           return
//         }
//       }
//       fillFields()
//       store.goToStep(props.step)
//     }
//   },
//   { deep: true },
// )
watch(CEONationalCardFile, (value: any) => {
  let file = value?.item(0) || null
  if (file)
    if (!file.type.startsWith('image')) {
      CEONationalCardFile.value = null
      toastDanger('فرمت فایل انتخابی اشتباه است')
    }
    else
      if (file.size > 1000000) {
        CEONationalCardFile.value = null
        toastDanger('سایز فایل انتخابی بیشتر از 1 MB است')
      }
})

watch(foundedAdFile, (value: any) => {
  let file = value?.item(0) || null
  if (file)
    if (!file.type.startsWith('image')) {
      foundedAdFile.value = null
      toastDanger('فرمت فایل انتخابی اشتباه است')
    }
    else if (file.size > 1000000) {
      foundedAdFile.value = null
      toastDanger('سایز فایل انتخابی بیشتر از 1 MB است')
    }
})

watch(nationalCodePicFile, (value: any) => {
  let file = value?.item(0) || null
  if (file)
    if (!file.type.startsWith('image')) {
      nationalCodePicFile.value = null
      toastDanger('فرمت فایل انتخابی اشتباه است')
    }
    else if (file.size > 1000000) {
      nationalCodePicFile.value = null
      toastDanger('سایز فایل انتخابی بیشتر از 1 MB است')
    }
})

</script>

<template>
  <div>
    <AdminWizardStepTitle />
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="translate-y-20 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition-all duration-100 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-20 opacity-0"
    >
      <div class="mx-auto flex w-full max-w-5xl flex-col px-4">
        <BaseCard
          class="shadow-muted-300/30 dark:shadow-muted-800/30 items-center justify-between gap-1  rounded-2xl p-2 shadow-xl"
        >
          <div class="px-4 text-center">
            <div>
              <img
                  src="/img/illustrations/wizard/upload.svg"
                  class="mx-auto max-w-[130px] rounded-full"
                  alt="Upload files"
                >
            </div>
            <!-- <BasePlaceholderPage
              v-if="!toggled"
              title="مدارک و مستندات"
              subtitle="مدارک و مستندات کسب و کار خود را اینجا بارگذاری کنید."
            >
              <template #image>
                <img
                  src="/img/illustrations/wizard/upload.svg"
                  class="mx-auto max-w-[210px] rounded-full"
                  alt="Upload files"
                >
              </template>
              <div class="mt-2 text-center">
                <button
                  type="button"
                  class="text-primary-500 font-sans underline underline-offset-4"
                  @click="toggled = true"
                >
                  آپلود فایل
                </button>
              </div>
            </BasePlaceholderPage> -->

            <div class="relative mx-auto max-w-3xl">
              <div class="grid gap-3 md:max-w-4xl md:grid-cols-2">
                <div>
                  <label
                v-if="store.wizardModel.isCompany"
                class="text-muted-500 dark:text-muted-400 text-md my-2 block font-semibold"
                for="CEONationalCardFile"
                  >{{ formFields.CEONationalCard.title }}</label>
                  <BaseInputFileHeadless
                v-if="store.wizardModel.isCompany"
                v-slot="{ open, remove, preview, drop, files }"
                v-model="CEONationalCardFile"
                accept="image/*"
              >
                <!-- Controls -->
                <!-- <div class="mb-4 flex items-center gap-2">
                  <button type="button"
                    class="nui-focus border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-800 dark:hover:border-primary-500 dark:hover:text-primary-600 relative flex size-10 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300"
                    tooltip="انتخاب فایل" @click="open">
                    <Icon name="lucide:plus" class="size-4" />
                    <span class="sr-only">انتخاب فایل</span>
                  </button>
                  <button type="button"
                    class="nui-focus border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-800 dark:hover:border-primary-500 dark:hover:text-primary-600 relative flex size-10 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300"
                    tooltip="در حال آپلود...">
                    <Icon name="lucide:arrow-up" class="size-4" />
                    <span class="sr-only">در حال آپلود...</span>
                  </button>
                </div> -->

                <div
                  role="button"
                  tabindex="-1"
                  class=""
                  @dragenter.stop.prevent
                  @dragover.stop.prevent
                  @drop="drop"
                >
                  <div
                    v-if="!files?.length"
                    class="nui-focus border-muted-300 dark:border-muted-800 hover:border-muted-400 focus:border-muted-400 dark:hover:border-muted-700 dark:focus:border-muted-700 group cursor-pointer rounded-lg border-[3px] border-dashed p-3 transition-colors duration-300"
                    tabindex="0"
                    role="button"
                    @click="open"
                    @keydown.enter.prevent="open"
                  >
                    <div class="text-center">
                      <Icon
                        name="mdi-light:cloud-upload"
                        class="text-muted-400 group-hover:text-primary-500 group-focus:text-primary-500 size-12 transition-colors duration-300"
                      />
                      <h4 class="text-muted-400 font-sans text-base">
                        فایل را بکشید و رها کنید
                      </h4>
                      <div>
                        <span class="text-muted-400 font-sans text-xs font-semibold uppercase">
                          یا
                        </span>
                      </div>
                      <label
                        for="file"
                        class="text-muted-400 group-hover:text-primary-500 group-focus:text-primary-500 cursor-pointer font-sans text-base underline underline-offset-4 transition-colors duration-300"
                      >
                        فایل را انتخاب کنید
                      </label>
                    </div>
                  </div>
                  <ul v-else class="mt-6 space-y-2">
                    <li :key="files.item(0)!.name">
                      <div
                        class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative flex items-center justify-end gap-2 rounded-xl border bg-white p-1"
                      >
                        <div class="flex items-center gap-2">
                          <div class="shrink-0">
                            <img
                              v-if="files.item(0)!.type.startsWith('image')"
                              class="size-14 rounded-xl object-cover object-center"
                              :src="preview(files.item(0)).value"
                              alt="Image preview"
                            >
                            <img
                              v-else
                              class="size-14 rounded-xl object-cover object-center"
                              src="/img/placeholder/placeholder-file.png"
                              alt="Image preview"
                            >
                          </div>
                          <div class="font-sans">
                            <span class="text-muted-800 dark:text-muted-100 line-clamp-1 block text-sm">
                              {{ files.item(0)!.name }}
                            </span>
                            <span class="text-muted-400 block text-xs">
                              {{ formatFileSize(files.item(0)!.size) }}
                            </span>
                          </div>
                        </div>

                        <div class="ms-auto w-32 px-4 transition-opacity duration-300" :class="'opacity-100'">
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
                          </button> -->

                          <!-- <button
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
                            @click.prevent="remove(files.item(0)!)"
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

                <div>
                  <label
                v-if="store.wizardModel.isCompany"
                class="text-muted-500 dark:text-muted-400 text-md my-2 block font-semibold"
                for="foundedAdFile"
                  >{{ formFields.foundedAd.title }}</label>
                  <BaseInputFileHeadless
                v-if="store.wizardModel.isCompany"
                v-slot="{ open, remove, preview, drop, files }"
                v-model="foundedAdFile"
                accept="image/*"
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
                    v-if="!files?.length"
                    class="nui-focus border-muted-300 dark:border-muted-800 hover:border-muted-400 focus:border-muted-400 dark:hover:border-muted-700 dark:focus:border-muted-700 group cursor-pointer rounded-lg border-[3px] border-dashed p-3 transition-colors duration-300"
                    tabindex="0"
                    role="button"
                    @click="open"
                    @keydown.enter.prevent="open"
                  >
                    <div class="text-center">
                      <Icon
                        name="mdi-light:cloud-upload"
                        class="text-muted-400 group-hover:text-primary-500 group-focus:text-primary-500 size-12 transition-colors duration-300"
                      />
                      <h4 class="text-muted-400 font-sans text-base">
                        فایل را بکشید و رها کنید
                      </h4>
                      <div>
                        <span class="text-muted-400 font-sans text-xs font-semibold uppercase">
                          یا
                        </span>
                      </div>
                      <label
                        for="file"
                        class="text-muted-400 group-hover:text-primary-500 group-focus:text-primary-500 cursor-pointer font-sans text-base underline underline-offset-4 transition-colors duration-300"
                      >
                        فایل را انتخاب کنید
                      </label>
                    </div>
                  </div>
                  <ul v-else class="mt-6 space-y-2">
                    <li :key="files.item(0)!.name">
                      <div
                        class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative flex items-center justify-end gap-2 rounded-xl border bg-white p-1"
                      >
                        <div class="flex items-center gap-2">
                          <div class="shrink-0">
                            <img
                              v-if="files.item(0)!.type.startsWith('image')"
                              class="size-14 rounded-xl object-cover object-center"
                              :src="preview(files.item(0)).value"
                              alt="Image preview"
                            >
                            <img
                              v-else
                              class="size-14 rounded-xl object-cover object-center"
                              src="/img/placeholder/placeholder-file.png"
                              alt="Image preview"
                            >
                          </div>
                          <div class="font-sans">
                            <span class="text-muted-800 dark:text-muted-100 line-clamp-1 block text-sm">
                              {{ files.item(0)!.name }}
                            </span>
                            <span class="text-muted-400 block text-xs">
                              {{ formatFileSize(files.item(0)!.size) }}
                            </span>
                          </div>
                        </div>

                        <div class="ms-auto w-32 px-4 transition-opacity duration-300" :class="'opacity-100'">
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
                          </button> -->

                          <!-- <button
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
                            @click.prevent="remove(files.item(0)!)"
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

                <div>
                  <label
                v-if="!store.wizardModel.isCompany"
                class="text-muted-500 dark:text-muted-400 text-md my-2 block font-semibold"
                for="nationalCodePicFile"
                  >{{ formFields.nationalCodePic.title }}</label>
                  <BaseInputFileHeadless
                    v-if="!store.wizardModel.isCompany"
                    v-slot="{ open, remove, preview, drop, files }"
                    v-model="nationalCodePicFile"
                    accept="image/*"
                  >
                    <div
                      role="button"
                      tabindex="-1"
                      class=""
                      @dragenter.stop.prevent
                      @dragover.stop.prevent
                      @drop="drop"
                    >
                      <div
                        v-if="!files?.length"
                        class="nui-focus border-muted-300 dark:border-muted-800 hover:border-muted-400 focus:border-muted-400 dark:hover:border-muted-700 dark:focus:border-muted-700 group cursor-pointer rounded-lg border-[3px] border-dashed p-3 transition-colors duration-300"
                        tabindex="0"
                        role="button"
                        @click="open"
                        @keydown.enter.prevent="open"
                      >
                        <div class="text-center">
                          <Icon
                            name="mdi-light:cloud-upload"
                            class="text-muted-400 group-hover:text-primary-500 group-focus:text-primary-500 size-12 transition-colors duration-300"
                          />
                          <h4 class="text-muted-400 font-sans text-base">
                            فایل را بکشید و رها کنید
                          </h4>
                          <div>
                            <span class="text-muted-400 font-sans text-xs font-semibold uppercase">
                              یا
                            </span>
                          </div>
                          <label
                            for="file"
                            class="text-muted-400 group-hover:text-primary-500 group-focus:text-primary-500 cursor-pointer font-sans text-base underline underline-offset-4 transition-colors duration-300"
                          >
                            فایل را انتخاب کنید
                          </label>
                        </div>
                      </div>
                      <ul v-else class="mt-6 space-y-2">
                        <li :key="files.item(0)!.name">
                          <div
                            class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative flex items-center justify-end gap-2 rounded-xl border bg-white p-1"
                          >
                            <div class="flex items-center gap-2">
                              <div class="shrink-0">
                                <img
                                  v-if="files.item(0)!.type.startsWith('image')"
                                  class="size-14 rounded-xl object-cover object-center"
                                  :src="preview(files.item(0)).value"
                                  alt="Image preview"
                                >
                                <img
                                  v-else
                                  class="size-14 rounded-xl object-cover object-center"
                                  src="/img/placeholder/placeholder-file.png"
                                  alt="Image preview"
                                >
                              </div>
                              <div class="font-sans">
                                <span class="text-muted-800 dark:text-muted-100 line-clamp-1 block text-sm">
                                  {{ files.item(0)!.name }}
                                </span>
                                <span class="text-muted-400 block text-xs">
                                  {{ formatFileSize(files.item(0)!.size) }}
                                </span>
                              </div>
                            </div>
                          
                            <div class="ms-auto w-32 px-4 transition-opacity duration-300" :class="'opacity-100'">
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
                              </button> -->
                            
                              <!-- <button
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
                                @click.prevent="remove(files.item(0)!)"
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

          <div
            class=" inset-x-0 z-20 mx-auto flex w-full max-w-[304px] items-center justify-between gap-2 rounded-2xl py-5 "
          >
            <BaseButton
              rounded="sm"
              class="w-full"
              variant="outline"
              @click="goToPrev()"
            >
              <span>قبلی</span>
            </BaseButton>
            <BaseButton
              rounded="sm"
              color="primary"
              class="w-full"
              @click="goToNext()"
            >
              <span>ادامه</span>
            </BaseButton>
          </div>
        </BaseCard>
      </div>
    </Transition>
  </div>
</template>
