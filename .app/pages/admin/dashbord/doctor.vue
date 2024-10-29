<script setup lang="ts">

import { Field } from 'vee-validate'
const uploadedFiles = ref<FileList | null>(null)
definePageMeta({
  title: 'جلسات',
  // middleware: ['auth'],
})
</script>

<template>

  <form
    action=""
    method="POST"
    class="grid grid-cols-12 gap-6"
    @submit.prevent="onSubmit"
  >
    <div class="ltablet:col-span-8 col-span-12 lg:col-span-8">
      <BaseCard


        rounded="sm"
        elevated-hover
        class="p-6 w-[250px] h-[400px] absolute"
      >
        <div class="mb-3 flex w-full items-center justify-center">
          <BaseAvatar
            size="xl"
            src="/img/avatars/18.svg"
            :class="getRandomColor()"
          />
        </div>
        <div class="text-center">
          <BaseHeading
            tag="h3"
            size="md"
            weight="medium"
            lead="none"
          >
          Arman
          </BaseHeading>
          <BaseParagraph size="xs" class="text-muted-400">
          Mashhadi
          </BaseParagraph>
          <div class="mt-8 max-w-[240px]">
            <ul class="space-y-1 font-sans text-sm">
              <li>
                <NuxtLink
                  to="/admin/aboutus/box"
                  exact-active-class="!text-primary-500 !bg-primary-500/10"
                  class="text-muted-400 hover:text-muted-600 dark:hover:text-muted-200 hover:bg-teal-300 dark:hover:bg-muted-700/50 flex items-center gap-2 rounded-lg p-3 transition-colors duration-300"
                >
                  <Icon name="uil:schedule" class="size-4" />
                  <span class="text-slate-950">تقویم</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/layouts/profile-edit/experience"
                  exact-active-class="!text-primary-500 !bg-primary-500/10"
                  class="text-muted-400 hover:text-muted-600 dark:hover:text-muted-200 hover:bg-teal-300 dark:hover:bg-muted-700/50 flex items-center gap-2 rounded-lg p-3 transition-colors duration-300"
                >
                  <Icon name="uil:telegram" class="size-4" />
                  <span class="text-slate-950">دعوتنامه</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/layouts/profile-edit/skills"
                  exact-active-class="!text-primary-500 !bg-primary-500/10"
                  class="text-muted-400 hover:text-muted-600 dark:hover:text-muted-200 hover:bg-teal-300 dark:hover:bg-muted-700/50 flex items-center gap-2 rounded-lg p-3 transition-colors duration-300"
                >
                  <Icon name="uil:setting" class="size-4" />
                  <span class="text-slate-950">تنظیمات</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/layouts/profile-edit/settings"
                  exact-active-class="!text-primary-500 !bg-primary-500/10"
                  class="text-muted-400 hover:text-muted-600 dark:hover:text-muted-200 hover:bg-teal-300 dark:hover:bg-muted-700/50 flex items-center gap-2 rounded-lg p-3 transition-colors duration-300"
                >
                  <Icon name="uil:envelope-add" class="size-4" />
                  <span class="text-slate-950">جلسه جدید</span>
                </NuxtLink>
              </li>
            </ul>
          </div>

        </div>
          </BaseCard>




      <BaseCard rounded="sm" class="p-4 md:p-8 right-[300px] h-full w-[700px] ">
        <div class="grid grid-cols-1 gap-4 gap-y-2 text-sm lg:grid-cols-12 mr-20 w-full">

          <div class="ltablet:col-span-9 col-span-12 space-y-10 lg:col-span-9">
            <TairoFormGroup
              label="مشخصات جلسه"

            >
              <div class="grid grid-cols-12 gap-4 ">
                <div class="col-span-12 md:col-span-6">
                  <Field
                    v-slot="{ field, errorMessage, handleChange, handleBlur }"
                    name="doctor.firstName"
                  >
                    <BaseInput
                      label="عنوان"
                      icon="ph:user-duotone"
                      placeholder="عنوان"
                      :model-value="field.value"
                      :error="errorMessage"
                      :disabled="isSubmitting"
                      type="text"
                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    />
                  </Field>
                </div>

                <div class="col-span-12 md:col-span-6">
                  <Field
                    v-slot="{ field, errorMessage, handleChange, handleBlur }"
                    name="doctor.lastName"
                  >
                    <BaseInput
                      label="مکان"
                      icon="uil:location-point"
                      placeholder="مکان"
                      :model-value="field.value"
                      :error="errorMessage"
                      :disabled="isSubmitting"
                      type="text"
                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    />
                  </Field>
                </div>

                <div class="col-span-12 md:col-span-6 mt-4 gap-y-4">
                  <Field
                    v-slot="{ field, errorMessage, handleChange, handleBlur }"
                    name="doctor.email"
                  >
                    <BaseInput
                      label="تاریخ شروع"
                      icon="ph:calendar-blank-duotone"
                      placeholder="1403/2/15"
                      :model-value="field.value"
                      :error="errorMessage"
                      :disabled="isSubmitting"

                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    />
                  </Field>
                </div>

                <div class="col-span-12 md:col-span-6 mt-4">
                  <Field
                    v-slot="{ field, errorMessage, handleChange, handleBlur }"
                    name="doctor.speciality"
                  >
                    <BaseInput
                      label="مدت زمان اطلاع رسانی قبل از شروع جلسه "
                      icon="ph:calendar-blank-duotone"
                      placeholder="18:00"
                      :model-value="field.value"
                      :error="errorMessage"
                      :disabled="isSubmitting"

                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    />
                  </Field>
                </div>

                <div class="col-span-12">
                  <Field
                    v-slot="{ field, errorMessage, handleChange, handleBlur }"
                    name="doctor.phone"
                  >
                    <AddonInputPhone
                      ref="inputPhoneRef"
                      label="Emergency Phone"
                      placeholder="Ex: +1 555 555 5555"
                      icon="lucide:phone"
                      :model-value="field.value"
                      :error="errorMessage"
                      :disabled="isSubmitting"
                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    />
                  </Field>
                </div>

                <div class="col-span-12">
                  <Field
                    v-slot="{ field, errorMessage, handleChange, handleBlur }"
                    name="doctor.comments"
                  >
                    <BaseTextarea
                      label="توضیحات"
                      placeholder="توضیحات"
                      rows="3"
                      :model-value="field.value"
                      :error="errorMessage"
                      :disabled="isSubmitting"
                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    />
                  </Field>
                </div>

                <div class="col-span-12 md:col-span-4">
                  <Field
                    v-slot="{ field, errorMessage, handleChange, handleBlur }"
                    name="doctor.lastName"
                  >
                    <BaseInput
                      label="دستور جلسه"
                      icon="uil:envelope-download"
                      placeholder="عنوان"
                      :model-value="field.value"
                      :error="errorMessage"
                      :disabled="isSubmitting"
                      type="text"
                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    />
                  </Field>
                </div>

                <div class="col-span-12 md:col-span-4">
                  <Field
                    v-slot="{ field, errorMessage, handleChange, handleBlur }"
                    name="doctor.lastName"
                  >
                    <BaseInput
                      label="جدید ترین ها"
                      icon="uil:comments-alt"
                      placeholder="توضیحات"
                      :model-value="field.value"
                      :error="errorMessage"
                      :disabled="isSubmitting"
                      type="text"
                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    />
                  </Field>
                </div>

                <div class="col-span-12 md:col-span-4 mt-5 mr-16">
                  <BaseButton variant="solid" color="primary">
                   افزودن
                  </BaseButton>
                </div>
              </div>
            </TairoFormGroup>

            <TairoFormGroup
              label="ساعات برگزاری"

            >
              <div class=" flex flex-cols-2 gap-4">
                <div class="col-span-12">
                  <Field
                    v-slot="{ field, errorMessage, handleChange, handleBlur }"
                    name="doctor.lastName"
                  >
                    <BaseInput
                      label="از ساعت"
                      icon="uil:clock"
                      placeholder="08:00"
                      :model-value="field.value"
                      :error="errorMessage"
                      :disabled="isSubmitting"
                      type="text"
                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    />
                  </Field>
                </div>
                <div class="col-span-12">
                  <Field
                    v-slot="{ field, errorMessage, handleChange, handleBlur }"
                    name="doctor.lastName"
                  >
                    <BaseInput
                      label="تا لغایت ساعت"
                      icon="uil:clock-seven"
                      placeholder="16:00"
                      :model-value="field.value"
                      :error="errorMessage"
                      :disabled="isSubmitting"
                      type="text"
                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    />
                  </Field>
                </div>
          </div>
            </TairoFormGroup>

            <TairoFormGroup
              label="فایل های ضمیمه ای"

            />
            <BaseInputFileHeadless
              v-slot="{ open, remove, preview, drop, files }"
              v-model="uploadedFiles"
              multiple
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
                class="nui-focus border-muted-300 dark:border-muted-700 hover:border-muted-400 focus:border-muted-400 dark:hover:border-muted-600 dark:focus:border-muted-700 group cursor-pointer rounded-lg border-[3px] border-dashed p-8 transition-colors duration-300"
                tabindex="0"
                role="button"
                @click="open"
                @keydown.enter.prevent="open"
              >
                <div class="p-5 text-center">
                  <Icon
                    name="mdi-light:cloud-upload"
                    class="text-muted-400 group-hover:text-primary-500 group-focus:text-primary-500 mb-2 size-10 transition-colors duration-300"
                  />
                  <h4 class="text-muted-400 font-sans text-sm">
                   فایل مورد نظر را بکشید
                  </h4>
                  <div>
                        <span
                          class="text-muted-400 font-sans text-[0.7rem] font-semibold uppercase"
                        >
                          یا
                        </span>
                  </div>
                  <label
                    for="file"
                    class="text-muted-400 group-hover:text-primary-500 group-focus:text-primary-500 cursor-pointer font-sans text-sm underline underline-offset-4 transition-colors duration-300"
                  >
                    انتخاب کنید
                  </label>
                </div>
              </div>
              <ul v-else class="mt-6 space-y-2">
                <li v-for="file in files" :key="file.name">
                  <div
                    class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative flex items-center justify-end gap-2 rounded-xl border bg-white p-3"
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

                          alt="Image preview"
                        >
                      </div>
                      <div class="font-sans">
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
                        :value="0"
                        size="xs"
                        :color="'success'"
                      />
                    </div>
                    <div class="flex gap-2">
                      <button
                        class="border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-900 dark:hover:border-primary-500 dark:hover:text-primary-600 relative flex size-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled
                        type="button"
                        tooltip="Cancel"
                      >
                        <Icon name="lucide:slash" class="size-4" />
                        <span class="sr-only">Cancel</span>
                      </button>

                      <button
                        class="border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-900 dark:hover:border-primary-500 dark:hover:text-primary-600 relative flex size-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300"
                        type="button"
                        tooltip="Upload"
                      >
                        <Icon name="lucide:arrow-up" class="size-4" />
                        <span class="sr-only">Upload</span>
                      </button>
                      <button
                        class="border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-900 dark:hover:border-primary-500 dark:hover:text-primary-600 relative flex size-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300"
                        type="button"
                        tooltip="Remove"
                        @click.prevent="remove(file)"
                      >
                        <Icon name="lucide:x" class="size-4" />
                        <span class="sr-only">Remove</span>
                      </button>
                    </div>
                  </div>
                </li>
              </ul>

            </div>
              </BaseInputFileHeadless>
            <TairoFormGroup
              label="حاضرین در جلسه"

            />
            <Field
              v-slot="{ field, errorMessage, handleChange, handleBlur }"
              name="doctor.lastName"
            >
              <BaseInput
                label="جدید ترین ها"
                icon="lucide:search"
                placeholder="جست و جو کنید"
                :model-value="field.value"
                :error="errorMessage"
                :disabled="isSubmitting"
                type="text"
                @update:model-value="handleChange"
                @blur="handleBlur"
              />
            </Field>
            <BaseCheckboxHeadless  value="team_member_1">
              <BaseCard
                rounded="sm"
                class="peer-checked:!border-primary-500 peer-checked:[&_.child]:!text-primary-500 h-[100px] border-2 p-4 w-full opacity-50 peer-checked:opacity-100"
              >
                <div class="flex w-full items-center gap-4">
                  <BaseAvatar
                    rounded="full"
                    text="AM"
                    size="md"
                    src="/img/avatars/8.svg"
                    class="bg-red-100 text-red-500 dark:bg-red-500 dark:text-white"
                  />

                  <div class="pt-3">
                    <BaseHeading
                      as="h1"
                      size="xl"
                      weight="extrabold"
                      lead="none"
                    >
                      Arman Mashhadi
                    </BaseHeading>

                    <BaseText size="xl" class="text-muted-400">
                      خوش امدید
                    </BaseText>
                  </div>

                  <div class="child text-muted-300 ms-auto">
                    <div class="size-3 rounded-full bg-current" />
                  </div>
                </div>
              </BaseCard>
            </BaseCheckboxHeadless>
            <div class="text-right md:col-span-5">
              <div
                class="-mt-4 inline-flex w-full items-center justify-end gap-2 sm:w-auto"
              >

                <BaseButton
                  type="submit"
                  color="success"
                  class="!h-12 w-full sm:w-40 mr-40"
                >
                  ثبت
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  </form>

</template>

<style scoped>

</style>
