<script setup lang="ts">
import { Field } from 'vee-validate'

definePageMeta({
  title: 'داشبورد',
  // middleware: ['auth'],
})
</script>

<template>
  <div class="ptablet:grid-cols-2 grid gap-6 sm:grid-cols-4">
    <div class="relative">
      <!-- Widget -->
      <BaseCard rounded="lg" class="p-6 h-[450px]">
        <!-- Title -->
        <div class="mb-8 flex items-center justify-between">
          <BaseHeading
            as="h3"
            size="md"
            weight="semibold"
            lead="tight"
            class="text-muted-800 dark:text-white"
          >
            <span>دفترچه یادداشت</span>
          </BaseHeading>

        </div>

          <div class="relative flex gap-4 w-full top-[270px]">
            <BaseInput
              v-model.trim="message"
              :disabled="messageLoading"
              rounded="md"
              :classes="{
                  input: 'h-12 ps-6 pe-24',
                }"
              placeholder="متن یادداشت"
            />
            <div>
            <BaseButton color="primary" shadow="flat">
              ثبت
            </BaseButton>
            </div>
          </div>

        <div class="flex items-center gap-3 mt-[290px]">
          <Field
            v-slot="{ field, errorMessage, handleChange, handleBlur }"
            name="meeting.colorCode"
          >
            <BaseRadioHeadless
              name="color_code"
              value="color_code_1"
              :model-value="field.value"
              :error="errorMessage"
              :disabled="isSubmitting"
              @update:model-value="handleChange"
              @blur="handleBlur"
            >
              <div
                class="border-primary-500 peer-checked:bg-primary-500 size-8 rounded-full border-2 transition-colors duration-300"
              />
            </BaseRadioHeadless>
          </Field>

          <Field
            v-slot="{ field, errorMessage, handleChange, handleBlur }"
            name="meeting.colorCode"
          >
            <BaseRadioHeadless
              name="color_code"
              value="color_code_2"
              :model-value="field.value"
              :error="errorMessage"
              :disabled="isSubmitting"
              @update:model-value="handleChange"
              @blur="handleBlur"
            >
              <div
                class="border-info-500 peer-checked:bg-info-500 size-8 rounded-full border-2 transition-colors duration-300"
              />
            </BaseRadioHeadless>
          </Field>

          <Field
            v-slot="{ field, errorMessage, handleChange, handleBlur }"
            name="meeting.colorCode"
          >
            <BaseRadioHeadless
              name="color_code"
              value="color_code_3"
              :model-value="field.value"
              :error="errorMessage"
              :disabled="isSubmitting"
              @update:model-value="handleChange"
              @blur="handleBlur"
            >
              <div
                class="border-success-500 peer-checked:bg-success-500 size-8 rounded-full border-2 transition-colors duration-300"
              />
            </BaseRadioHeadless>
          </Field>

          <Field
            v-slot="{ field, errorMessage, handleChange, handleBlur }"
            name="meeting.colorCode"
          >
            <BaseRadioHeadless
              name="color_code"
              value="color_code_4"
              :model-value="field.value"
              :error="errorMessage"
              :disabled="isSubmitting"
              @update:model-value="handleChange"
              @blur="handleBlur"
            >
              <div
                class="border-danger-500 peer-checked:bg-danger-500 size-8 rounded-full border-2 transition-colors duration-300"
              />
            </BaseRadioHeadless>
          </Field>

          <Field
            v-slot="{ field, errorMessage, handleChange, handleBlur }"
            name="meeting.colorCode"
          >
            <BaseRadioHeadless
              name="color_code"
              value="color_code_5"
              :model-value="field.value"
              :error="errorMessage"
              :disabled="isSubmitting"
              @update:model-value="handleChange"
              @blur="handleBlur"
            >
              <div
                class="size-8 rounded-full border-2 border-lime-500 transition-colors duration-300 peer-checked:bg-lime-500"
              />
            </BaseRadioHeadless>
          </Field>

          <Field
            v-slot="{ field, errorMessage, handleChange, handleBlur }"
            name="meeting.colorCode"
          >
            <BaseRadioHeadless
              name="color_code"
              value="color_code_6"
              :model-value="field.value"
              :error="errorMessage"
              :disabled="isSubmitting"
              @update:model-value="handleChange"
              @blur="handleBlur"
            >
              <div
                class="size-8 rounded-full border-2 border-slate-950 transition-colors duration-300 peer-checked:bg-slate-950"
              />
            </BaseRadioHeadless>
          </Field>
        </div>

      </BaseCard>
    </div>





    <div class="relative">
      <BaseCheckboxHeadless  value="team_member_1">
        <BaseCard
          rounded="sm"
          class="peer-checked:!border-primary-500 peer-checked:[&_.child]:!text-primary-500 h-[100px] border-2 p-4 w-[630px]  opacity-50 peer-checked:opacity-100"
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
      </div>
  <div class="relative ltablet:overflow-visible top-[210px] left-[292px] flex justify-around gap-20 overflow-x-auto pb-8 lg:overflow-visible ">
    <NuxtLink to="/admin/dashbord/doctor" class="group flex flex-1 flex-col text-center">
      <div
        class="nui-mask nui-mask-hexed bg-muted-200 dark:bg-muted-700 group-hover:bg-red-600 dark:group-hover:bg-red-600 mx-auto flex size-20 scale-90 items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-90"
      >
        <div
          class="nui-mask nui-mask-hexed dark:bg-muted-800 flex size-16 scale-95 items-center justify-center bg-white"
        >
          <Icon
            name="ph:buildings-duotone"
            class="text-red-600 size-6"
          />
        </div>
      </div>
      <BaseHeading
        as="h5"
        size="md"
        weight="medium"
        lead="tight"
        class="text-muted-400 dark:text-muted-400 group-hover:text-muted-600 dark:group-hover:text-muted-200"
      >
        <span class="font-sans text-sm font-bold">فضاهای کاری</span>
      </BaseHeading>
    </NuxtLink>

    <NuxtLink to="/admin/" class="group flex flex-1 flex-col text-center">
      <div
        class="nui-mask nui-mask-hexed bg-muted-200 dark:bg-muted-700 mx-auto flex size-20 scale-90 items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-90 group-hover:bg-yellow-400 dark:group-hover:bg-yellow-400"
      >
        <div
          class="nui-mask nui-mask-hexed dark:bg-muted-800 flex size-16 scale-95 items-center justify-center bg-white"
        >
          <Icon name="ph:lightning-duotone" class="size-6 text-yellow-400" />
        </div>
      </div>
      <BaseHeading
        as="h5"
        size="md"
        weight="medium"
        lead="tight"
        class="text-muted-400 dark:text-muted-400 group-hover:text-muted-600 dark:group-hover:text-muted-200"
      >
        <span class="font-sans text-sm font-bold line-clamp-1">درخواست </span>
      </BaseHeading>
    </NuxtLink>
    <NuxtLink to="/admin/teams" class="group flex flex-1 flex-col text-center">
      <div
        class="nui-mask nui-mask-hexed bg-muted-200 dark:bg-muted-700 group-hover:bg-success-500 dark:group-hover:bg-success-500 mx-auto flex size-20 scale-90 items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-90"
      >
        <div
          class="nui-mask nui-mask-hexed dark:bg-muted-800 flex size-16 scale-95 items-center justify-center bg-white"
        >
          <Icon name="octicon:organization" class="text-success-500 size-6" />
        </div>
      </div>
      <BaseHeading
        as="h5"
        size="md"
        weight="medium"
        lead="tight"
        class="text-muted-400 dark:text-muted-400 group-hover:text-muted-600 dark:group-hover:text-muted-200"
      >
        <span class="font-sans text-sm font-bold">تیم ها</span>
      </BaseHeading>
    </NuxtLink>
    <NuxtLink to="/admin/organizations" class="group flex flex-1 flex-col text-center">
      <div
        class="nui-mask nui-mask-hexed bg-muted-200 dark:bg-muted-700 mx-auto flex size-20 scale-90 items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-90 group-hover:bg-indigo-500 dark:group-hover:bg-indigo-500"
      >
        <div
          class="nui-mask nui-mask-hexed dark:bg-muted-800 flex size-16 scale-95 items-center justify-center bg-white"
        >
          <Icon name="ph:bank-duotone" class="size-6 text-indigo-500" />
        </div>
      </div>
      <BaseHeading
        as="h5"
        size="md"
        weight="medium"
        lead="tight"
        class="text-muted-400 dark:text-muted-400 group-hover:text-muted-600 dark:group-hover:text-muted-200"
      >
        <span class="font-sans text-sm font-bold">لاگین هاب</span>
      </BaseHeading>
    </NuxtLink>

  </div>

    <!-- Column -->
    <div class="relative">
      <!-- Widget -->
      <BaseCard rounded="lg" class="p-6">
        <!-- Title -->
        <div class="mb-8 flex items-center justify-between">
          <BaseHeading
            as="h3"
            size="md"
            weight="semibold"
            lead="tight"
            class="text-muted-800 dark:text-white"
          >
            <span>خلاصه اطلاعات</span>
          </BaseHeading>

        </div>
        <DemoUserList />
      </BaseCard>
    </div>

    </div>
</template>

<style scoped>

</style>
