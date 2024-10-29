<script setup lang="ts">
import { Field } from 'vee-validate'

definePageMeta({
  title: 'افزونه ها',
  // middleware: ['auth'],
})

</script>

<template>
  <div class="min-h-screen overflow-hidden">
    <div class="grid gap-8 sm:grid-cols-12">
      <div class="col-span-12 sm:col-span-4">
        <div class="flex w-full items-center gap-2">
          <BaseAvatar
            :src="data?.personalInfo.picture"
            :badge-src="data?.personalInfo.badge"
            size="md"
          />
          <div class="">
            <BaseHeading
              tag="h2"
              size="md"
              weight="medium"
              lead="none"
            >
              {{ data?.personalInfo.firstName }}
              {{ data?.personalInfo.lastName }}
            </BaseHeading>
            <BaseParagraph size="xs" class="text-muted-400">
              {{ data?.personalInfo.role }}
            </BaseParagraph>
          </div>
        </div>
        <div class="mt-8 max-w-[240px]">
          <ul class="space-y-1 font-sans text-sm">
            <li>
              <NuxtLink
                to="/layouts/profile-edit"
                exact-active-class="!text-primary-500 !bg-primary-500/10"
                class="text-muted-400 hover:text-muted-600 dark:hover:text-muted-200 hover:bg-muted-50 dark:hover:bg-muted-700/50 flex items-center gap-2 rounded-lg p-3 transition-colors duration-300"
              >
                <Icon name="ph:user-duotone" class="size-4" />
                <span>General</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/layouts/profile-edit/experience"
                exact-active-class="!text-primary-500 !bg-primary-500/10"
                class="text-muted-400 hover:text-muted-600 dark:hover:text-muted-200 hover:bg-muted-50 dark:hover:bg-muted-700/50 flex items-center gap-2 rounded-lg p-3 transition-colors duration-300"
              >
                <Icon name="ph:buildings-duotone" class="size-4" />
                <span>Experience</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/layouts/profile-edit/skills"
                exact-active-class="!text-primary-500 !bg-primary-500/10"
                class="text-muted-400 hover:text-muted-600 dark:hover:text-muted-200 hover:bg-muted-50 dark:hover:bg-muted-700/50 flex items-center gap-2 rounded-lg p-3 transition-colors duration-300"
              >
                <Icon name="ph:sketch-logo-duotone" class="size-4" />
                <span>Skills & Tools</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/layouts/profile-edit/settings"
                exact-active-class="!text-primary-500 !bg-primary-500/10"
                class="text-muted-400 hover:text-muted-600 dark:hover:text-muted-200 hover:bg-muted-50 dark:hover:bg-muted-700/50 flex items-center gap-2 rounded-lg p-3 transition-colors duration-300"
              >
                <Icon name="ph:gear-six-duotone" class="size-4" />
                <span>Settings</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-8">
        <RouterView v-slot="{ Component }">
          <Transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="translate-y-20 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-20 opacity-0"
          >
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
  <form
    method="POST"
    action=""
    class="w-full pb-16"
    @submit.prevent="onSubmit"
  >
    <BaseCard>
      <div class="flex items-center justify-between p-4">
        <div>
          <BaseHeading
            tag="h2"
            size="sm"
            weight="medium"
            lead="normal"
            class="uppercase tracking-wider"
          >
            General info
          </BaseHeading>
          <BaseText size="xs" class="text-muted-400">
            Edit your account's general information
          </BaseText>
        </div>
        <div class="flex items-center gap-2">
          <BaseButton class="w-24" to="/layouts/profile">
            Cancel
          </BaseButton>
          <BaseButton
            type="submit"
            color="primary"
            class="w-24"
            :disabled="isSubmitting"
            :loading="isSubmitting"
          >
            Save
          </BaseButton>
        </div>
      </div>
      <div class="p-4">
        <div class="mx-auto max-w-lg space-y-12 py-8">
          <BaseMessage v-if="success" @close="success = false">
            Your profile has been updated!
          </BaseMessage>
          <BaseMessage
            v-if="fieldsWithErrors"
            type="danger"
            @close="() => setErrors({})"
          >
            This form has {{ fieldsWithErrors }} errors, please check them
            before submitting
          </BaseMessage>

          <TairoFormGroup
            label="Profile picture"
            sublabel="This is how others will recognize you"
          >
            <div
              class="relative flex flex-col items-center justify-center gap-4"
            >
              <BaseFullscreenDropfile
                icon="ph:image-duotone"
                :filter-file-dropped="(file) => file.type.startsWith('image')"
                @drop="
                  (value) => {
                    inputFile = value
                  }
                "
              />
              <BaseInputFileHeadless
                v-slot="{ open, remove, preview, files }"
                v-model="inputFile"
                accept="image/*"
              >
                <div class="relative size-24">
                  <img
                    v-if="files?.length && files.item(0)"
                    :src="preview(files.item(0)!).value"
                    alt="Upload preview"
                    class="bg-muted-200 dark:bg-muted-700/60 size-24 rounded-full object-cover object-center"
                  >
                  <img
                    v-else
                    :src="currentAvatar"
                    alt="Upload preview"
                    class="bg-muted-200 dark:bg-muted-700/60 size-24 rounded-full object-cover object-center"
                  >
                  <div
                    v-if="files?.length && files.item(0)"
                    class="absolute bottom-0 end-0 z-20"
                  >
                    <BaseButtonIcon
                      size="sm"
                      rounded="full"
                      data-nui-tooltip="Remove image"
                      @click="remove(files.item(0)!)"
                    >
                      <Icon name="lucide:x" class="size-4" />
                    </BaseButtonIcon>
                  </div>
                  <div v-else class="absolute bottom-0 end-0 z-20">
                    <div class="relative" data-nui-tooltip="Upload image">
                      <BaseButtonIcon
                        size="sm"
                        rounded="full"
                        @click="open"
                      >
                        <Icon name="lucide:plus" class="size-4" />
                      </BaseButtonIcon>
                    </div>
                  </div>
                </div>
              </BaseInputFileHeadless>
              <div
                v-if="fileError"
                class="text-danger-600 inline-block font-sans text-[.8rem]"
              >
                {{ fileError }}
              </div>
            </div>
          </TairoFormGroup>

          <TairoFormGroup
            label="Profile Info"
            sublabel="Others diserve to know you more"
          >
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12 sm:col-span-6">
                <Field
                  v-slot="{ field, errorMessage, handleChange, handleBlur }"
                  name="profile.firstName"
                >
                  <BaseInput
                    :model-value="field.value"
                    :error="errorMessage"
                    :disabled="isSubmitting"
                    type="text"
                    icon="ph:user-duotone"
                    placeholder="First name"
                    @update:model-value="handleChange"
                    @blur="handleBlur"
                  />
                </Field>
              </div>
              <div class="col-span-12 sm:col-span-6">
                <Field
                  v-slot="{ field, errorMessage, handleChange, handleBlur }"
                  name="profile.lastName"
                >
                  <BaseInput
                    :model-value="field.value"
                    :error="errorMessage"
                    :disabled="isSubmitting"
                    type="text"
                    icon="ph:user-duotone"
                    placeholder="Last name"
                    @update:model-value="handleChange"
                    @blur="handleBlur"
                  />
                </Field>
              </div>
              <div class="col-span-12">
                <Field
                  v-slot="{ field, errorMessage, handleChange, handleBlur }"
                  name="profile.role"
                >
                  <BaseInput
                    :model-value="field.value"
                    :error="errorMessage"
                    :disabled="isSubmitting"
                    type="text"
                    icon="ph:suitcase-duotone"
                    placeholder="Job title"
                    @update:model-value="handleChange"
                    @blur="handleBlur"
                  />
                </Field>
              </div>
              <div class="col-span-12">
                <Field
                  v-slot="{ field, errorMessage, handleChange, handleBlur }"
                  name="profile.location"
                >
                  <BaseInput
                    :model-value="field.value"
                    :error="errorMessage"
                    :disabled="isSubmitting"
                    type="text"
                    icon="ph:map-pin-duotone"
                    placeholder="Location"
                    @update:model-value="handleChange"
                    @blur="handleBlur"
                  />
                </Field>
              </div>
              <div class="col-span-12">
                <Field
                  v-slot="{ field, errorMessage, handleChange, handleBlur }"
                  name="profile.bio"
                >
                  <BaseTextarea
                    :model-value="field.value"
                    :error="errorMessage"
                    :disabled="isSubmitting"
                    rows="4"
                    placeholder="About you / Short bio..."
                    @update:model-value="handleChange"
                    @blur="handleBlur"
                  />
                </Field>
              </div>
            </div>
          </TairoFormGroup>

          <TairoFormGroup
            label="Professional Info"
            sublabel="This can help you to win some opportunities"
          >
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12 sm:col-span-6">
                <Field
                  v-slot="{ field, errorMessage, handleChange, handleBlur }"
                  name="info.experience"
                >
                  <BaseListbox
                    :model-value="field.value"
                    :error="errorMessage"
                    :disabled="isSubmitting"
                    :items="experience"
                    placeholder="Experience"
                    rounded="sm"
                    @update:model-value="handleChange"
                    @blur="handleBlur"
                  />
                </Field>
              </div>
              <div class="col-span-12 sm:col-span-6">
                <Field
                  v-slot="{ field, errorMessage, handleChange, handleBlur }"
                  name="info.firstJob"
                >
                  <BaseListbox
                    :model-value="field.value"
                    :error="errorMessage"
                    :disabled="isSubmitting"
                    :items="answers"
                    :properties="{ label: 'label', value: 'value' }"
                    placeholder="Is this your first job?"
                    rounded="sm"
                    @update:model-value="handleChange"
                    @blur="handleBlur"
                  />
                </Field>
              </div>
              <div class="col-span-12 sm:col-span-6">
                <Field
                  v-slot="{ field, errorMessage, handleChange, handleBlur }"
                  name="info.flexible"
                >
                  <BaseListbox
                    :model-value="field.value"
                    :error="errorMessage"
                    :disabled="isSubmitting"
                    :items="answers"
                    :properties="{ label: 'label', value: 'value' }"
                    placeholder="Are you flexible?"
                    rounded="sm"
                    @update:model-value="handleChange"
                    @blur="handleBlur"
                  />
                </Field>
              </div>
              <div class="col-span-12 sm:col-span-6">
                <Field
                  v-slot="{ field, errorMessage, handleChange, handleBlur }"
                  name="info.remote"
                >
                  <BaseListbox
                    :model-value="field.value"
                    :error="errorMessage"
                    :disabled="isSubmitting"
                    :items="answers"
                    :properties="{ label: 'label', value: 'value' }"
                    placeholder="Do you work remotely?"
                    rounded="sm"
                    @update:model-value="handleChange"
                    @blur="handleBlur"
                  />
                </Field>
              </div>
            </div>
          </TairoFormGroup>

          <TairoFormGroup
            label="Social Profiles"
            sublabel="This can help others finding you on social media"
          >
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12 sm:col-span-6">
                <Field
                  v-slot="{ field, errorMessage, handleChange, handleBlur }"
                  name="social.facebook"
                >
                  <BaseInput
                    :model-value="field.value"
                    :error="errorMessage"
                    :disabled="isSubmitting"
                    type="text"
                    icon="fa6-brands:facebook-f"
                    placeholder="Facebook URL"
                    @update:model-value="handleChange"
                    @blur="handleBlur"
                  />
                </Field>
              </div>
              <div class="col-span-12 sm:col-span-6">
                <Field
                  v-slot="{ field, errorMessage, handleChange, handleBlur }"
                  name="social.twitter"
                >
                  <BaseInput
                    :model-value="field.value"
                    :error="errorMessage"
                    :disabled="isSubmitting"
                    type="text"
                    icon="fa6-brands:twitter"
                    placeholder="Twitter URL"
                    @update:model-value="handleChange"
                    @blur="handleBlur"
                  />
                </Field>
              </div>
              <div class="col-span-12 sm:col-span-6">
                <Field
                  v-slot="{ field, errorMessage, handleChange, handleBlur }"
                  name="social.dribbble"
                >
                  <BaseInput
                    :model-value="field.value"
                    :error="errorMessage"
                    :disabled="isSubmitting"
                    type="text"
                    icon="fa6-brands:dribbble"
                    placeholder="Dribbble URL"
                    @update:model-value="handleChange"
                    @blur="handleBlur"
                  />
                </Field>
              </div>
              <div class="col-span-12 sm:col-span-6">
                <Field
                  v-slot="{ field, errorMessage, handleChange, handleBlur }"
                  name="social.instagram"
                >
                  <BaseInput
                    :model-value="field.value"
                    :error="errorMessage"
                    :disabled="isSubmitting"
                    type="text"
                    icon="fa6-brands:instagram"
                    placeholder="Instagram URL"
                    @update:model-value="handleChange"
                    @blur="handleBlur"
                  />
                </Field>
              </div>
              <div class="col-span-12 sm:col-span-6">
                <Field
                  v-slot="{ field, errorMessage, handleChange, handleBlur }"
                  name="social.github"
                >
                  <BaseInput
                    :model-value="field.value"
                    :error="errorMessage"
                    :disabled="isSubmitting"
                    type="text"
                    icon="fa6-brands:github"
                    placeholder="Github URL"
                    @update:model-value="handleChange"
                    @blur="handleBlur"
                  />
                </Field>
              </div>
              <div class="col-span-12 sm:col-span-6">
                <Field
                  v-slot="{ field, errorMessage, handleChange, handleBlur }"
                  name="social.gitlab"
                >
                  <BaseInput
                    :model-value="field.value"
                    :error="errorMessage"
                    :disabled="isSubmitting"
                    type="text"
                    icon="fa6-brands:gitlab"
                    placeholder="Gitlab URL"
                    @update:model-value="handleChange"
                    @blur="handleBlur"
                  />
                </Field>
              </div>
            </div>
          </TairoFormGroup>
        </div>
      </div>

        <div class="relative flex">
          <div class="flex grow flex-col gap-1">
            <TairoTocAnchor label="Example Anchor level 1" level="1" />

            <TairoTocAnchor label="Example Anchor level 2" level="2" />

            <TairoTocAnchor label="Example Anchor level 3" level="3" />

            <BaseHeading
              as="h4"
              size="sm"
              weight="medium"
            >
              <TairoTocAnchor
                label="Example Anchor level 4"
                level="4"
                prefix="•"
                prefix-classes="opacity-30 group-hover/toc:opacity-100 group-focus/toc:opacity-100 group-visible/toc:opacity-100 text-primary-500 absolute -start-3 -top-0.5"
              />
            </BaseHeading>
          </div>

          <TairoToc />
        </div>


    </BaseCard>
    <TairoFormSave
      :disabled="isSubmitting"
      :loading="isSubmitting"
      @reset="resetForm"
    />
  </form>

</template>

<style scoped>

</style>
