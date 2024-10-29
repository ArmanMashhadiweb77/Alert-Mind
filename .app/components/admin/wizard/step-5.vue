<script setup lang="ts">
// const props = defineProps(['step'])
const store = useWizardStore()
definePageMeta({
  title: 'مرحله 5',
})

useHead({
  title: 'حساب های بانکی',
})

const organizationAccounts = ref(store.wizardModel.organizationAccounts)
const addBankAccount = ref(false)
const editAccount = ref(null)
const editAccountIndex = ref(undefined)
const onEditMode = ref(false)

const fillFields = () => {
  store.wizardModel.organizationAccounts = organizationAccounts
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
//       fillFields()
//       store.goToStep(props.step)
//     }
//   },
//   { deep: true },
// )
const addNewAccount = () => {
  if (!addBankAccount.value && !onEditMode.value) {
    addBankAccount.value = true
    editAccount.value = null
  }
  else
    toastDanger('مورد دیگری در حال پردازش است!')
}

const addAccount = (account: any) => {
  
  let isDefault = organizationAccounts.value.findIndex(elem => elem.isDefault == true)
  if(isDefault < 0)
      account.isDefault = true
  else if(isDefault >= 0 && account.isDefault == true && (editAccountIndex.value == undefined || isDefault != editAccountIndex.value)){
        organizationAccounts.value[isDefault].isDefault = false
  }
  
  if (account != null && !onEditMode.value){
    organizationAccounts.value.push(account)
  }
  else if (account != null && editAccountIndex.value >= 0 && onEditMode.value){
    organizationAccounts.value[editAccountIndex.value] = account
  }
    
  editAccount.value = null
  addBankAccount.value = false
  onEditMode.value = false
  editAccountIndex.value = undefined
}

const onEditAccount = (account: any, index: number) => {
  if (!addBankAccount.value && !onEditMode.value) {
    editAccount.value = account
    addBankAccount.value = true
    onEditMode.value = true
    editAccountIndex.value = index
  }
  else if (addBankAccount.value)
    toastDanger('مورد دیگری در حال پردازش است!')
}

const deleteAccount = (index: number) => {
  organizationAccounts.value.splice(index, 1)
}
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
          class="shadow-muted-300/30 dark:shadow-muted-800/30 items-center justify-between gap-1  rounded-2xl p-4 shadow-xl"
        >
          <div>
            <div v-if="addBankAccount == true || onEditMode == true">
              <AdminWizardBankAccount :account="editAccount" @new-account="addAccount" />
            </div>
            <div v-else>
              <div class="mx-auto flex w-full flex-col max-w-[210px] gap-2">
                <BaseButton
                  type="button"
                  class="text-muted-500 border-primery-700 flex w-full flex-col items-center border "
                  style="min-height: 80px;"
                  variant="outline" color="muted"
                  @click="addNewAccount"
                >
                  <span class="text-md">
                    <Icon
                      name="ph:plus"
                      class="text-primery-500 me-1 size-9"
                      style="color: rgb(129 140 248 / 1);"
                    /><br>
                    افزودن حساب
                  </span>
                </BaseButton>
              </div>
            </div>
            <ul v-if="organizationAccounts.length > 0" class="my-6 space-y-2">
              <li v-for="(account, index ) in organizationAccounts" :key="account.accountNumber">
                <div
                  class="border-muted-200 dark:border-success-700 dark:bg-muted-800 relative flex items-center justify-end gap-2 rounded-sm border bg-white p-3"
                >
                  <div class="flex items-center gap-3" style="right: 10px; position: absolute;">
                    <!-- <div class="shrink-0"> -->
                    <span class="text-muted-800 dark:text-muted-100 line-clamp-1 block text-sm">
                      <b>نام بانک :</b> {{ account?.bankType == 1 ? 'ملی' : (account?.bankType == 2 ? 'ملت' : '') }}
                    </span>
                    <span class="text-muted-800 dark:text-muted-100 line-clamp-1 block text-sm">
                      <b>شماره حساب :</b> {{ account?.accountNumber }}
                    </span>
                    <span class="text-muted-800 block text-sm">
                      <b>شماره شبا :</b> {{ account?.shabaAccountNumber }}
                    </span>
                    <span class="text-muted-800 text-sm" hidden>
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

                  <div class="flex gap-2 ">
                    <button
                      class="border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-900 dark:hover:border-primary-500 dark:hover:text-primary-600 relative flex size-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300"
                      type="button"
                      tooltip="ویرایش"
                      @click="onEditAccount(account, index)"
                    >
                      <Icon name="ph:pencil-simple-line" class="size-4" />
                      <span class="sr-only">ویرایش</span>
                    </button>
                    <button
                      class="border-muted-200 hover:border-danger-500 text-muted-700 dark:text-muted-200 hover:text-danger-600 dark:border-muted-700 dark:bg-muted-900 dark:hover:border-danger-500 dark:hover:text-danger-600 relative flex size-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300"
                      type="button"
                      tooltip="حذف"
                      @click="deleteAccount(index)"
                    >
                      <Icon name="ph:trash" class="size-4" />
                      <span class="sr-only">حذف</span>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div
            v-if="addBankAccount == false && onEditMode == false"
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
              <span v-if="organizationAccounts.length > 0">ادامه</span>
              <span v-else>بعدا تکمیل میکنم</span>
            </BaseButton>
          </div>
        </BaseCard>
      </div>
    </Transition>
  </div>
</template>
