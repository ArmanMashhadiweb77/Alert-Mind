<script setup lang="ts">
import useOrganizations from '~/composables/api/admin/useOrganizations'
// const props = defineProps(['step'])
const store = useWizardStore()
definePageMeta({
  title: 'مرحله 6',
})

useHead({
  title: 'پیش نمایش ثبت نام ',
})

const api = new useOrganizations()
const router = useRouter()
const folderName = ref('OrgLicense')
const goToPrev = () => {
  store.goToPrevStep()
}

// watch(
//   () => props.step,
//   () => {
//     if (props.step) {
//       store.goToStep(props.step)
//     }
//   },
//   { deep: true },
// )
const uploadFiles = async () => {
  let fileList = []
  if (store.wizardModel.logoFile) fileList.push(...[store.wizardModel.logoFile])
  if (store.wizardModel.isCompany && store.wizardModel.CEONationalCardFile) fileList.push(store.wizardModel.CEONationalCardFile[0])
  if (store.wizardModel.isCompany && store.wizardModel.foundedAdFile) fileList.push(store.wizardModel.foundedAdFile[0])
  if (!store.wizardModel.isCompany && store.wizardModel.nationalCodePicFile) fileList.push(store.wizardModel.nationalCodePicFile[0])

  const result = await api.uploadFile(fileList, folderName.value)
  let list = []
  if (result.result) {
    let nameList = []
    for (let i in result.urls) {
      const items = result.urls[i].split('/')
      let name = items[items.length - 1]
      name = name?.substring(0, name.lastIndexOf('_'))
      nameList.push({ index: i, name: name })
    }

    if (store.wizardModel.logoFile) {
      let index = nameList.find(item => item.name == store.wizardModel.logoFile.name.substring(0, store.wizardModel.logoFile.name.indexOf('.')))?.index
      if (index) list.push({ type: DocType.Logo, url: result.urls[index] })
    }
    if (store.wizardModel.isCompany) {
      if (store.wizardModel.CEONationalCardFile) {
        let index = nameList.find(item => item.name == store.wizardModel.CEONationalCardFile[0].name.substring(0, store.wizardModel.CEONationalCardFile[0].name.indexOf('.')))?.index
        if (index) list.push({ type: DocType.CEONationalCard, url: result.urls[index] })
      }
      if (store.wizardModel.foundedAdFile) {
        let index = nameList.find(item => item.name == store.wizardModel.foundedAdFile[0].name.substring(0, store.wizardModel.foundedAdFile[0].name.indexOf('.')))?.index
        if (index) list.push({ type: DocType.FoundedAd, url: result.urls[index] })
      }
    }
    if (!store.wizardModel.isCompany && store.wizardModel.nationalCodePicFile) {
      let index = nameList.find(item => item.name == store.wizardModel.nationalCodePicFile[0].name.substring(0, store.wizardModel.nationalCodePicFile[0].name.indexOf('.')))?.index
      if (index) list.push({ type: DocType.OnTheNationalCard, url: result.urls[index] })
    }
  }
  return list
}
const onSubmit = async () => {
  // const api = new useWizard()
  const files = await uploadFiles()
  if (store.wizardModel.organizationAccounts.length == 1)
    store.wizardModel.organizationAccounts[0].isDefault = true

  const result = await api.createOrganization(
    store.wizardModel.organizationName,
    store.wizardModel.isCompany,
    parseInt(store.wizardModel.type.Id.toString()),
    store.wizardModel.description,
    store.wizardModel.address,
    store.wizardModel.nationalId,
    store.wizardModel.location.lat,
    store.wizardModel.location.lng,
    store.wizardModel.fax,
    store.wizardModel.phone,
    store.wizardModel.CEOName,
    store.wizardModel.nationalId,
    store.wizardModel.postalCode,
    store.wizardModel.email,
    store.wizardModel.userName,
    store.wizardModel.password,
    parseInt(store.wizardModel.perOrNgo.Id.toString()),
    store.wizardModel.organizationAccounts,
    store.wizardModel.isShowInBankDisk,
    files)
  console.log('result', result)
  if (result.result) {
    toastSuccess(result.message)
    router.push(
      { path: '/admin/organizations' },
    )
  }
  else toastDanger(result.message)
}

const avatarPreview = useNinjaFilePreview(() => store.wizardModel.logoFile)
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
          <div>
            <div class="flex flex-col px-4">
              <div class="group relative mx-auto mb-2 flex w-16 items-center justify-center">
                <BaseAvatar
                  v-if="avatarPreview"
                  size="lg"
                  :src="avatarPreview"
                  class="dark:bg-muted-700/60 bg-white"
                />
                <BaseAvatar
                  v-else
                  size="lg"
                  text="لوگو"
                  class="bg-pink-500/10 text-pink-600"
                />
                <!-- Edit -->
                <div class="absolute bottom-0 end-0 z-10">
                  <BaseButtonIcon
                    small
                    rounded="full"
                    class="hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-500 dark:hover:text-primary-500 pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                    @click="store.goToStep(2)"
                  >
                    <Icon name="lucide:edit-2" class="pointer-events-none size-3" />
                  </BaseButtonIcon>
                </div>
              </div>
              <div class="mx-auto flex w-full flex-col gap-4">
                <!-- Title -->
                <h3 class="text-muted-800 dark:text-muted-100 text-center font-sans text-xl font-medium">
                  {{ store.wizardModel.organizationName }}
                </h3>

                <div class="grid grid-cols-12 gap-4">
                  <!-- Type -->
                  <div class="col-span-4">
                    <BaseCard rounded="sm" class="group relative p-6">
                      <!-- Edit -->
                      <div class="absolute end-3 top-3 z-10">
                        <BaseButtonIcon
                          small
                          rounded="full"
                          class="hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-500 dark:hover:text-primary-500 pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                          @click="store.goToStep(1)"
                        >
                          <Icon name="lucide:edit-2" class="pointer-events-none size-3" />
                        </BaseButtonIcon>
                      </div>
                      <div class="flex w-full items-center gap-2">
                        <!-- <BaseIconBox v-if="store.wizardModel.type.Id === 1" size="sm"
                          class="bg-primary-500/10 text-primary-600" color="none">
                          <Icon name="ph:briefcase-duotone" class="size-5" />
                        </BaseIconBox> -->
                        <BaseIconBox
                          size="sm"
                          class="bg-orange-500/10 text-orange-600"
                          color="none"
                        >
                          <Icon name="heroicons:building-office-2-solid" class="size-5" />
                        </BaseIconBox>
                        <div>
                          <div class="text-muted-400 text-xs">
                            <span>نوع شخص</span>
                          </div>
                          <div class="text-muted-800 dark:text-muted-100 text-sm font-medium capitalize">
                            <span v-if="store.wizardModel.isCompany">
                              حقوقی
                            </span>
                            <span v-else> حقیقی </span>
                          </div>
                        </div>
                      </div>
                    </BaseCard>
                  </div>
                  <!-- اطلاعات کاربری -->
                  <div class="col-span-4">
                    <BaseCard rounded="sm" class="group relative p-3">
                      <!-- Edit -->
                      <div class="absolute end-3 top-3 z-10">
                        <BaseButtonIcon
                          small
                          rounded="full"
                          class="hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-500 dark:hover:text-primary-500 pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                          @click="store.goToStep(2)"
                        >
                          <Icon name="lucide:edit-2" class="pointer-events-none size-3" />
                        </BaseButtonIcon>
                      </div>
                      <BaseHeading size="md" class="mb-4 uppercase">
                        <span class="text-muted-500 dark:text-muted-400">
                          اطلاعات عمومی
                        </span>
                      </BaseHeading>
                      <div>
                        <div class="text-muted-800 dark:text-muted-100 text-sm font-medium capitalize">
                          <span>
                            {{ store.wizardModel.type.name }} / {{ store.wizardModel.perOrNgo.name }}
                          </span>
                        </div>
                        <BaseParagraph
                          v-if="store.wizardModel.CEOName != ''"
                          size="sm"
                          class="text-muted-500 dark:text-muted-400"
                        >
                          نام مدیر عامل : {{ store.wizardModel.CEOName }}
                        </BaseParagraph>
                        <BaseParagraph
                          v-if="store.wizardModel.nationalId != ''"
                          size="sm"
                          class="text-muted-500 dark:text-muted-400"
                        >
                          کد ملی : {{ store.wizardModel.nationalId }}
                        </BaseParagraph>
                        <!-- <BaseParagraph
                          v-if="store.wizardModel.economicCode != ''"
                          size="sm"
                          class="text-muted-500 dark:text-muted-400"
                        >
                          کد اقتصادی حقیقی : {{ store.wizardModel.economicCode }}
                        </BaseParagraph> -->
                        <BaseParagraph
                          v-if="store.wizardModel.description != ''"
                          size="sm"
                          class="text-muted-500 dark:text-muted-400"
                        >
                          توضیحات : {{ store.wizardModel.description }}
                        </BaseParagraph>
                      </div>
                    </BaseCard>
                  </div>
                  <!-- اطللاعات تماس -->
                  <div class="col-span-4">
                    <BaseCard rounded="sm" class="group relative p-3">
                      <!-- Edit -->
                      <div class="absolute end-3 top-3 z-10">
                        <BaseButtonIcon
                          small
                          rounded="full"
                          class="hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-500 dark:hover:text-primary-500 pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                          @click="store.goToStep(3)"
                        >
                          <Icon name="lucide:edit-2" class="pointer-events-none size-3" />
                        </BaseButtonIcon>
                      </div>
                      <BaseHeading size="md" class="mb-4 uppercase">
                        <span class="text-muted-500 dark:text-muted-400">
                          اطلاعات تماس و آدرس
                        </span>
                      </BaseHeading>
                      <div>
                        <BaseParagraph
                          v-if="store.wizardModel.fax != ''"
                          size="sm"
                          class="text-muted-500 dark:text-muted-400"
                        >
                          فکس : {{ store.wizardModel.fax }}
                        </BaseParagraph>
                        <BaseParagraph
                          v-if="store.wizardModel.phone != ''"
                          size="sm"
                          class="text-muted-500 dark:text-muted-400"
                        >
                          شماره تماس : {{ store.wizardModel.phone }}
                        </BaseParagraph>
                        <BaseParagraph
                          v-if="store.wizardModel.postalCode != ''"
                          size="sm"
                          class="text-muted-500 dark:text-muted-400"
                        >
                          کد پستی : {{ store.wizardModel.postalCode }}
                        </BaseParagraph>
                        <BaseParagraph
                          v-if="store.wizardModel.email != ''"
                          size="sm"
                          class="text-muted-500 dark:text-muted-400"
                        >
                          ایمیل : {{ store.wizardModel.email }}
                        </BaseParagraph>
                        <BaseParagraph
                          v-if="store.wizardModel.address != ''"
                          size="sm"
                          class="text-muted-500 dark:text-muted-400"
                        >
                          ایمیل : {{ store.wizardModel.address }}
                        </BaseParagraph>
                      </div>
                    </BaseCard>
                  </div>

                  <!-- اطلاعات بانکی -->
                  <div class="col-span-12">
                    <BaseCard rounded="sm" class="group relative p-3">
                      <!-- Edit -->
                      <div class="absolute end-3 top-3 z-10">
                        <BaseButtonIcon
                          small
                          rounded="full"
                          class="hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-500 dark:hover:text-primary-500 pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                          @click="store.goToStep(5)"
                        >
                          <Icon name="lucide:edit-2" class="pointer-events-none size-3" />
                        </BaseButtonIcon>
                      </div>
                      <BaseHeading size="md" class="mb-4 uppercase">
                        <span class="text-muted-500 dark:text-muted-400">
                          اطلاعات حساب های بانکی
                        </span>
                      </BaseHeading>

                      <div>
                        <BaseParagraph
                          v-for="(account, index ) in store.wizardModel.organizationAccounts"
                          :key="account.accountNumber"
                          size="sm"
                          class="text-muted-500 dark:text-muted-400"
                        >
                          <div
                            class="border-muted-200 dark:border-success-700 dark:bg-muted-800 relative flex items-center gap-2 rounded-xl  bg-white p-1"
                          >
                            <div class="flex items-center gap-3" style="right: 10px; ">
                              <!-- <div class="shrink-0"> -->
                              <b>{{ index + 1 }}</b>
                              <span class="text-muted-800 dark:text-muted-100 line-clamp-1 block text-sm">
                                <b>نام بانک :</b> {{ account?.bankType == 1 ? 'ملی' : (account?.bankType == 2 ? 'ملت' :
                                  '') }}
                              </span>
                              <span class="text-muted-800 dark:text-muted-100 line-clamp-1 block text-sm">
                                <b>شماره حساب :</b> {{ account?.accountNumber }}
                              </span>
                              <span class="text-muted-800 block text-sm">
                                <b>شماره شبا :</b> {{ account?.shabaAccountNumber }}
                              </span>
                              <span class="text-muted-800 hidden text-sm">
                                <b>نمایش در دیسکت : </b>
                                <Icon
                                  v-if="!account?.isShowInBankDisk"
                                  name="lucide:x"
                                  class="size-4 text-rose-500"
                                />
                                <Icon
                                  v-else
                                  name="lucide:check"
                                  class="text-success-500 size-4"
                                />
                              </span>
                              <span class="text-muted-800 block text-sm">
                                <b>پیش فرض : </b>
                                <Icon
                                  v-if="!account?.isDefault"
                                  name="lucide:x"
                                  class="size-4 text-rose-500"
                                />
                                <Icon
                                  v-else
                                  name="lucide:check"
                                  class="text-success-500 size-4"
                                />
                              </span>

                              <!-- </div> -->
                            </div>
                          </div>
                        </BaseParagraph>
                      </div>
                    </BaseCard>
                  </div>
                  <!-- Files -->
                  <!-- <div class="col-span-12 sm:col-span-4">
                    <BaseCard rounded="lg" class="group relative p-6">

                      <div class="absolute end-3 top-3 z-10">
                        <BaseButtonIcon small rounded="full"
                          class="hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-500 dark:hover:text-primary-500 pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                          :to="getStep(3).to">
                          <Icon name="lucide:edit-2" class="pointer-events-none size-3" />
                        </BaseButtonIcon>
                      </div>
                      <div class="flex flex-col items-center justify-center text-center">
                        <div>
                          <span class="text-muted-800 dark:text-muted-100 mb-2 block font-sans text-2xl font-semibold">
                            {{ project.files?.length || 0 }}
                          </span>
                          <BaseHeading size="xs" class="mb-4 scale-90 uppercase">
                            <span class="text-muted-500 dark:text-muted-400">
                              Attached files
                            </span>
                          </BaseHeading>
                        </div>
                      </div>
                    </BaseCard>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
          <!-- <div v-else>
            <div class="mx-auto max-w-2xl px-4">
              <div class="mb-10 text-center">
                <BaseHeading tag="h1" size="2xl" class="text-muted-800 dark:text-white">
                  <span>Congrats! You're all set</span>
                </BaseHeading>
                <BaseParagraph size="sm" class="text-muted-500 dark:text-muted-400">
                  <span>Awesome, you just finished creating this project.</span>
                </BaseParagraph>
              </div>

              <BasePlaceholderPage title="Get ready for next steps"
                subtitle="You, and the team members you've added can already start working and creating tasks.">
                <template #image>
                  <img src="/img/illustrations/wizard/finish.svg" class="mx-auto max-w-[210px] rounded-full"
                    alt="Upload files">
                </template>
                <div class="mt-2 text-center">
                  <BaseButton to="/dashboards" rounded="lg" color="primary" class="w-48">
                    <span>View Project</span>
                  </BaseButton>
                </div>
              </BasePlaceholderPage>
            </div>
          </div> -->
          <div
            class=" inset-x-0 z-20 mx-auto flex w-full max-w-[500px] items-center justify-between gap-2 rounded-2xl py-5 "
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
              color="success"
              class="w-full"
              :loading="store.loading"
              :disabled="store.loading"
              @click="onSubmit()"
            >
              <span> ثبت و درخواست بررسی </span>
            </BaseButton>
          </div>
        </BaseCard>
      </div>
    </Transition>
  </div>
</template>
