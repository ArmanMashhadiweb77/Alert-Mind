<script setup lang="ts">

import DatePicker from '@alireza-ab/vue3-persian-datepicker'
// const props = defineProps(['step'])
const store = useWizardStore()

definePageMeta({
  title: 'مرحله 2',
})
useHead({
  title: 'اطلاعات کسب و کار',
})

const formFields = ref(
  {
    name: {
      value: store.wizardModel.organizationName,
      title: !store.wizardModel.isCompany ? 'نام و نام خانوادگی*' : 'عنوان شرکت / سازمان*',
      placeHolder: !store.wizardModel.isCompany ? 'نام و نام خانوادگی را وارد کنید' : 'عنوان شرکت / سازمان را وارد کنید',
      required: true,
      touched: false,
      isValid: store.wizardModel.organizationName.toString().trim() != '' ? true : false,
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
    userName: {
      value: store.wizardModel.userName,
      title: 'نام کاربری دسترسی به به پرداخت ملت',
      placeHolder: 'نام کاربری را وارد کنید',
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
    password: {
      value: store.wizardModel.password,
      title: 'گذرواژه دسترسی به به پرداخت ملت',
      placeHolder: 'گذرواژه را وارد کنید',
      required: false,
      touched: false,
      isValid: true,
      min: 6,
      max: 30,
      regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      type: 'Password',
      errors: {
        regex: 'از حروف انگلیسی استفاده کنید. حداقل یک کارکتر عدد یک کارکتر از حروف و یک کارکتر خاص برای گذرواژه استفاده کنید. ',
        len: 'طول صحیح کارکتر رعایت نشده است. (حداقل 6 کارکتر)',
        empty: 'مقدار خالی است',
        type: 'نوع داده اشتباه است',
      },
    },
    passwordConfirmation: {
      value: store.wizardModel.passwordConfirmation,
      title: 'تکرار گذرواژه',
      placeHolder: 'گذرواژه را تکرار کنید',
      required: false,
      touched: false,
      isValid: true,
      min: 6,
      max: 30,
      regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      type: 'PasswordConfirmation',
      errors: {
        regex: 'از حروف انگلیسی استفاده کنید. حداقل یک کارکتر عدد یک کارکتر از حروف و یک کارکتر خاص برای گذرواژه استفاده کنید.',
        len: 'طول صحیح کارکتر رعایت نشده است. (حداقل 6 کارکتر)',
        empty: 'مقدار خالی است',
        type: '',
      },
    },
    CEOName: {
      value: store.wizardModel.CEOName,
      title: 'نام مدیر عامل*',
      placeHolder: 'نام مدیر عامل را وارد کنید',
      required: store.wizardModel.isCompany ? true : false,
      touched: false,
      isValid: store.wizardModel.isCompany && store.wizardModel.CEOName.toString().trim() == '' ? false : true,
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
    typeId: {
      value: store.wizardModel.type.Id,
      title: 'ماهیت خدمات*',
      placeHolder: 'ماهیت خدمات را مشخص کنید',
      required: true,
      touched: false,
      isValid: store.wizardModel.type.Id.toString().trim() != '' ? true : false,
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
    perOrNgo: {
      value: !store.wizardModel.isCompany ? 2 : store.wizardModel.perOrNgo.Id  ,
      title: 'نوع شرکت / سازمان*',
      placeHolder: 'نوع را مشخص کنید',
      required: true,
      touched: false,
      isValid: store.wizardModel.perOrNgo.toString().trim() != '' ? true : false,
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
    nationalId: {
      value: store.wizardModel.nationalId,
      title: 'شناسه ملی*',
      placeHolder: 'شناسه ملی را وارد کنید',
      required: true,
      touched: false,
      isValid: store.wizardModel.nationalId.toString().trim() == '' ? false : true,
      min: 10,
      max: 10,
      regex: null,
      type: 'NationalId',
      errors: {
        regex: 'شناسه ملی وارد شده صحیح نمی باشد',
        len: 'طول صحیح کارکتر رعایت نشده است',
        empty: 'مقدار خالی است',
        type: 'نوع داده اشتباه است',
      },
    },
    // economicCode: {
    //   value: store.wizardModel.economicCode,
    //   title: 'کد اقتصادی حقیقی',
    //   placeHolder: 'کد اقتصادی حقیقی را وارد کنید',
    //   required: true,
    //   touched: false,
    //   isValid: store.wizardModel.economicCode.toString().trim() != '' ? true : false,
    //   min: null,
    //   max: null,
    //   regex: null,
    //   type: 'Number',
    //   errors: {
    //     regex: '',
    //     len: '',
    //     empty: 'مقدار خالی است',
    //     type: 'نوع داده اشتباه است',
    //   },
    // },
    avatar: {
      value: store.wizardModel.logo,
      title: 'لوگو',
      placeHolder: 'لوگو',
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
    description: {
      value: store.wizardModel.description,
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
    isShowInBankDisk: {
      value: true,
      title: 'نمایش در دیسکت',
      placeHolder: 'نمایش در دیسکت',
      required: true,
      touched: false,
      isValid: true,
      min: null,
      max: null,
      regex: null,
      type: 'Boolean',
      errors: {
        regex: '',
        len: '',
        empty: 'مقدار خالی است',
        type: 'نوع داده اشتباه است',
      },
    },
    birthDate: {
      value: store.wizardModel.birthDate,
      title: !store.wizardModel.isCompany ? 'تاریخ تولد*' : 'تاریخ ثبت*',
      placeHolder: !store.wizardModel.isCompany ? 'تاریخ تولد را انتخاب کنید' : 'تاریخ ثبت را انتخاب کنید',
      required: true,
      touched: false,
      isValid: store.wizardModel.birthDate =='' ? false : true,
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

const fillFields = () => {
  if (formFields.value.password.value.toString().trim() === formFields.value.passwordConfirmation.value.toString().trim()) {
    store.wizardModel.organizationName = formFields.value.name.value
    store.wizardModel.CEOName = formFields.value.CEOName.value
    // store.wizardModel.economicCode = formFields.value.economicCode.value
    store.wizardModel.description = formFields.value.description.value
    store.wizardModel.nationalId = formFields.value.nationalId.value
    store.wizardModel.logo = formFields.value.avatar.value
    store.wizardModel.type.Id = formFields.value.typeId.value
    store.wizardModel.userName = formFields.value.userName.value
    store.wizardModel.password = formFields.value.password.value
    store.wizardModel.type.name = formFields.value.typeId.value.toString() == '1' ? 'خدمات دهنده' : (formFields.value.typeId.value.toString() == '2' ? 'خدمات گیرنده' : '')
    store.wizardModel.perOrNgo.Id = formFields.value.perOrNgo.value
    store.wizardModel.perOrNgo.name = formFields.value.perOrNgo.value.toString() == '1' ? 'دولتی' : (formFields.value.perOrNgo.value.toString() == '2' ? 'خصوصی' : '')
    store.wizardModel.isShowInBankDisk = formFields.value.isShowInBankDisk.value
    store.wizardModel.birthDate = formFields.value.birthDate.value
  }
  else toastDanger('تکرار گذرواژه اشتباه است')
}
const goToPrev = () => {
  fillFields()
  store.goToPrevStep()
}
const goToNext = () => {
  for (var item of Object.values(formFields.value)) {
    if (!item.isValid) {
      setToched(item)
      checkValidation(item)
      return
    }
  }
  fillFields()
  store.goToNextStep()
}

// watch(
//   () => props.step,
//   () => {
//     if (props.step > 0) {
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

const avatarPreview = useNinjaFilePreview(() => store.wizardModel.logoFile)
// BaseInputFileHeadless gives us a listfile input, but we need to
// extract the file from the list and set it to the form
const inputFile = ref<FileList | null>(null)
watch(inputFile, (value: any) => {
  const file = value?.item(0) || null
  if (file)
    if (!file.type.startsWith('image')) {
      inputFile.value = null
      toastDanger('فرمت فایل انتخابی اشتباه است')
    }
    else if (file.size > 700000) {
      inputFile.value = null
      toastDanger('سایز فایل انتخابی بیشتر از 700 KB است')
    }
    else
      store.wizardModel.logoFile = file
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
          class="shadow-muted-300/30 dark:shadow-muted-800/30 items-center justify-between gap-1  rounded-2xl p-4 shadow-xl"
        >
          <div class="flex items-center justify-center">
            <BaseFullscreenDropfile
              icon="ph:image-duotone"
              :filter-file-dropped="(file: any) => file.type.startsWith('image')"
              @drop="(value) => {
                inputFile = value
              }
              "
            />
            <BaseInputFileHeadless
              v-slot="{ open, remove, files }"
              v-model="inputFile"
              accept="image/*"
            >
              <div class="relative size-20">
                <img
                  v-if="avatarPreview"
                  :src="avatarPreview"
                  alt="Upload preview"
                  class="bg-muted-200 dark:bg-muted-700/60 size-20 rounded-full object-cover object-center"
                >
                <img
                  v-else
                  src="/img/placeholder/placeholder-file.png"
                  alt="Upload preview"
                  class="bg-muted-200 dark:bg-muted-700/60 size-20 rounded-full object-cover object-center"
                >
                <div v-if="files?.length && files.item(0)" class="absolute bottom-0 end-0 z-20">
                  <BaseButtonIcon
                    size="sm"
                    rounded="full"
                    tooltip="حذف لوگو"
                    @click="remove(files.item(0)!)"
                  >
                    <Icon name="lucide:x" class="size-4" />
                  </BaseButtonIcon>
                </div>
                <div v-else class="absolute bottom-0 end-0 z-20">
                  <div class="relative" tooltip="آپلود لوگو">
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
          </div>

          <div class="my-4 text-center ">
            <p class="text-muted-500 text-sm">
              لوگو را انتخاب کنید
            </p>
            <p class="text-muted-400 text-xs">
              سایز فایل بیشتر از 700KB نمیتواند باشد
            </p>
          </div>
          <div class="grid gap-3 md:max-w-4xl md:grid-cols-3">
            <BaseInput
              v-model="formFields.name.value"
              rounded="sm"
              size="sm"
              :placeholder="formFields.name.placeHolder"
              :label="formFields.name.title"
              :classes="{
                input: 'h-12 text-base text-center',
              }"
              :error="checkValidation(formFields.name)"
              @input="setToched(formFields.name)"
            />
            <BaseInput
              v-if="store.wizardModel.isCompany == true"
              v-model="formFields.CEOName.value"
              rounded="sm"
              size="sm"
              :placeholder="formFields.CEOName.placeHolder"
              :label="formFields.CEOName.title"
              :classes="{
                input: 'h-12 text-base text-center',
              }"
              :error="checkValidation(formFields.CEOName)"
              @focus="setToched(formFields.CEOName)"
            />
            <BaseInput
              v-model="formFields.nationalId.value"
              rounded="sm"
              size="sm"
              :placeholder="formFields.nationalId.placeHolder"
              :label="formFields.nationalId.title"
              :classes="{
                input: 'h-12 text-base text-center',
              }"
              :error="checkValidation(formFields.nationalId)"
              @focus="setToched(formFields.nationalId)"
            />
            <div hidden>
              <BaseInput
                v-model="formFields.userName.value"
                rounded="sm"
                size="sm"
                :placeholder="formFields.userName.placeHolder"
                :label="formFields.userName.title"
                :classes="{
                  input: 'h-12 text-base text-center',
                }"
                :error="checkValidation(formFields.userName)"
                @focus="setToched(formFields.userName)"
              />
            </div>
            <div hidden>
              <BaseInput
                v-model="formFields.password.value"
                rounded="sm"
                size="sm"
                type="password"
                :placeholder="formFields.password.placeHolder"
                :label="formFields.password.title"
                :classes="{
                  input: 'h-12 text-base text-center',
                }"
                :error="checkValidation(formFields.password)"
                @focus="setToched(formFields.password)"
              />
            </div>
            <div hidden>
              <BaseInput
                :ref="formFields.password.value"
                v-model="formFields.passwordConfirmation.value"
                rounded="sm"
                size="sm"
                type="password"
                :placeholder="formFields.passwordConfirmation.placeHolder"
                :label="formFields.passwordConfirmation.title"
                :classes="{
                  input: 'h-12 text-base text-center',
                }"
                :error="checkValidation(formFields.passwordConfirmation)"
                @focus="setToched(formFields.passwordConfirmation)"
              />
            </div>
            <!-- <multiselect v-model="organization.typeId" :options="orgOptions" :searchable="false" :multiple="true" :taggable="true" @tag="addTag" track-by="id" label="title"
           placeholder="Pick a value"></multiselect> -->
            <BaseSelect
              v-model="formFields.typeId.value"
              rounded="sm"
              size="sm"
              :label="formFields.typeId.title"
              :error="checkValidation(formFields.typeId)"
              @focus="setToched(formFields.typeId)"
            >
              <!-- <option value="" /> -->
              <option value="1">
                خدمات دهنده
              </option>
              <option value="2">
                خدمات گیرنده
              </option>
            </BaseSelect>
            <BaseSelect
              v-if="store.wizardModel.isCompany"
              v-model="formFields.perOrNgo.value"
              rounded="sm"
              size="sm"
              :disabled="!store.wizardModel.isCompany"
              :label="formFields.perOrNgo.title"
              :error="checkValidation(formFields.perOrNgo)"
              @focus="setToched(formFields.perOrNgo)"
            >
              <!-- <option value="" /> -->
              <option value="1">
                دولتی
              </option>
              <option value="2">
                خصوصی
              </option>
            </BaseSelect>
            <div class="nui-input-wrapper nui-input-default nui-input-sm nui-input-curved nui-has-icon">
              <label
                class="nui-input-label"
              >{{ formFields.birthDate.title }}</label>
              <div class="nui-input-outer" style="height: 2rem;line-height: 1rem;">
                <DatePicker
                  v-model="formFields.birthDate.value"
                  :column="1"
                  mode="single"
                  type="date"
                  required
                  input-format="jYYYY/jMM/jDD"
                  :auto-submit="true"
                  @submit="checkValidation(formFields.birthDate)"
                  @focus="setToched(formFields.birthDate)"
                  @keypress="checkValidation(formFields.birthDate)"
                  style="border-radius: 0.25rem 0 0 0.25rem;padding: 0.5rem 0.25rem ;"
                />
                <span class="nui-input-error-text">{{ checkValidation(formFields.birthDate) != false ? checkValidation(formFields.birthDate) : '' }}</span> 
              </div>
            </div>
            <!-- <BaseInput
              v-model="formFields.economicCode.value"
              rounded="lg"
              size="lg"
              :placeholder="formFields.economicCode.placeHolder"
              :label="formFields.economicCode.title"
              :classes="{
                input: 'h-12 text-base text-center',
              }"
              :error="checkValidation(formFields.economicCode)"
              @focus="setToched(formFields.economicCode)"
            /> -->
            <div hidden>
              <BaseCheckbox
                v-model="formFields.isShowInBankDisk.value"
                rounded="sm"
                size="sm"
                :label="formFields.isShowInBankDisk.title"
                color="muted"
              />
            </div>
            <div class="col-span-2">
             <BaseTextarea
              v-model="formFields.description.value"
              rounded="sm"
              size="sm"
              :placeholder="formFields.description.placeHolder"
              :label="formFields.description.title"
              :error="checkValidation(formFields.description)"
              @focus="setToched(formFields.description)"
            />
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
<!-- <style src="vue-multiselect/dist/vue-multiselect.min.css"></style> -->
