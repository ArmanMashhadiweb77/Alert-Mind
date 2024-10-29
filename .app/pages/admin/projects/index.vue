<script setup lang="ts">
import { Field } from 'vee-validate'
import { DatePicker } from 'v-calendar'

definePageMeta({
  // title: 'داشبورد',
  // middleware: ['auth'],
})
</script>

<template>
<div class= "grid grid-cols-2">
  <BaseCard rounded="lg" class=" relative px-4 py-10 sm:p-10 md:mx-0 right-72">
    <div class="mx-auto max-w-md">
      <div class="flex items-center gap-4">
        <div
          class="bg-primary-500/20 text-primary-500 flex size-14 shrink-0 items-center justify-center rounded-full font-sans text-2xl"
        >
          <Icon name="ph:calendar-blank-duotone" class="size-5" />
        </div>
        <div class="block text-xl font-semibold text-gray-700">
          <BaseHeading
            as="h3"
            size="lg"
            weight="bold"
          >
            ثبت تیم جدید
          </BaseHeading>
          <BaseText
            size="sm"
            class="text-muted-400"
          >
           ایجاد کردن ماموریت در حوزه های مختلف
          </BaseText>
        </div>
      </div>
      <div class="divide-y divide-gray-200">
        <div class="grid grid-cols-12 gap-4 py-8">
          <div class="col-span-12">
            <Field
              v-slot="{ field, errorMessage, handleChange, handleBlur }"
              name="event.title"
            >
              <BaseInput
                label="عنوان"
                rounded="lg"
                icon="lucide:type"
                placeholder="عنوان"
                :classes="{
                    input: '!h-11 !ps-11',
                    icon: '!h-11 !w-11',
                  }"
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
              name="event.shortDesc"
            >

            </Field>

              <Field
                v-slot="{ field, errorMessage, handleChange, handleBlur }"
                name="event.participants"
              >
                <BaseAutocomplete
                  :items="people"
                  rounded="lg"
                  icon="lucide:notebook-pen"
                  placeholder="توضیحات"
                  label="توضیحات"
                  multiple
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
              name="event.shortDesc"
            >

            </Field>

            <Field
              v-slot="{ field, errorMessage, handleChange, handleBlur }"
              name="event.participants"
            >
              <BaseAutocomplete
                :items="people"
                rounded="lg"
                icon="lucide:contact"
                placeholder="نام کاربری اختصاصی"
                label="نام کاربری اختصاصی"
                multiple
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
              name="event.longDesc"
            >

            </Field>
          </div>

          <div class="col-span-12 sm:col-span-6">
            <Field
              v-slot="{ field, errorMessage, handleChange, handleBlur }"
              name="event.color"
            >
              <BaseInput
                type="color"
                list="eventColors"
                label="انتخاب رنگ"
                rounded="lg"
                icon="ph:drop-half-duotone"
                placeholder="Pick an event color..."
                :classes="{
                    input: '!h-11 !ps-11 appearance-none',
                    icon: '!h-11 !w-11',
                  }"
                :model-value="field.value"
                :error="errorMessage"
                :disabled="isSubmitting"
                @update:model-value="handleChange"
                @blur="handleBlur"
              />
              <datalist id="eventColors">
                <option value="#84cc16" />
                <option value="#22c55e" />
                <option value="#0ea5e9" />
                <option value="#6366f1" />
                <option value="#8b5cf6" />
                <option value="#d946ef" />
                <option value="#f43f5e" />
                <option value="#facc15" />
                <option value="#fb923c" />
                <option value="#9ca3af" />
              </datalist>
            </Field>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <Field
              v-slot="{ field, errorMessage, handleChange, handleBlur }"
              name="event.category"
            >
              <BaseInput
                list="eventCategories"
                label="اعضای تیم"
                rounded="lg"
                icon="ph:ticket-duotone"
                placeholder="مقداری وارد کنید"
                :classes="{
                    input: '!h-11 !ps-11',
                    icon: '!h-11 !w-11',
                  }"
                :model-value="field.value"
                :error="errorMessage"
                :disabled="isSubmitting"
                @update:model-value="handleChange"
                @blur="handleBlur"
              />
              <datalist id="eventCategories">
                <option value="Chrome" />
                <option value="Firefox" />
                <option value="Opera" />
                <option value="Safari" />
                <option value="Microsoft Edge" />
              </datalist>
            </Field>
          </div>
        </div>
        <div class="flex items-center gap-4 pt-4">
          <BaseButton rounded="lg" class="!h-12 w-full">
           انصراف
          </BaseButton>
          <BaseButton
            type="submit"
            rounded="lg"
            color="primary"
            class="!h-12 w-full"
          >
            ثبت
          </BaseButton>
        </div>
      </div>
    </div>
  </BaseCard>
  </div>
</template>

<style scoped>

</style>
