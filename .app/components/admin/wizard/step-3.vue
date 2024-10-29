<script setup lang="ts">

import useOrganizations from '~/composables/api/admin/useOrganizations'
// const props = defineProps(['step'])
definePageMeta({
  title: 'مرحله 3',
})
useHead({
  title: 'اطلاعات تماس و آدرس کسب و کار',
})

const store = useWizardStore()
const api = new useOrganizations()

const geo = ref<number[]>([store.wizardModel.location.lat, store.wizardModel.location.lng])

const formFields = ref(
  {
    fax: {
      value: store.wizardModel.fax,
      title: 'شماره فکس*',
      placeHolder: 'شماره فکس را وارد کنید',
      required: true,
      touched: false,
      isValid: store.wizardModel.fax.toString().trim() != '' ? true : false,
      min: 11,
      max: 11,
      regex: /^\d+$/,
      type: 'String',
      errors: {
        regex: 'فرمت صحیح رعایت نشده است',
        len: 'طول صحیح رعایت نشده است',
        empty: 'مقدار خالی است',
        type: 'نوع داده اشتباه است',
      },
    },
    phone: {
      value: store.wizardModel.phone,
      title: 'شماره تلفن*',
      placeHolder: 'شماره تلفن را وارد کنید',
      required: true,
      touched: false,
      isValid: store.wizardModel.phone.toString().trim() != '' ? true : false,
      min: 11,
      max: 11,
      regex: /^(\+\d{1,3}[- ]?)?\d{11}$/,
      type: 'String',
      errors: {
        regex: 'فرمت صحیح رعایت نشده است',
        len: 'طول صحیح رعایت نشده است',
        empty: 'مقدار خالی است',
        type: 'نوع داده اشتباه است',
      },
    },
    postalCode: {
      value: store.wizardModel.postalCode,
      title: 'کد پستی*',
      placeHolder: 'کد پستی 10 رقمی را وارد کنید',
      required: true,
      touched: false,
      isValid: store.wizardModel.postalCode.toString().trim() != '' ? true : false,
      min: 10,
      max: 10,
      regex: /^\d+$/,
      type: 'String',
      errors: {
        regex: 'فرمت صحیح رعایت نشده است',
        len: 'طول صحیح رعایت نشده است',
        empty: 'مقدار خالی است',
        type: 'نوع داده اشتباه است',
      },
    },
    email: {
      value: store.wizardModel.email,
      title: 'ایمیل',
      placeHolder: 'ایمیل را وارد کنید',
      required: false,
      touched: false,
      isValid: true,
      min: null,
      max: null,
      regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      type: 'String',
      errors: {
        regex: 'فرمت صحیح رعایت نشده است',
        len: 'طول صحیح رعایت نشده است',
        empty: 'مقدار خالی است',
        type: 'نوع داده اشتباه است',
      },
    },
    address: {
      value: store.wizardModel.address,
      title: 'تکمیل آدرس',
      placeHolder: 'آدرس را تکمیل کنید',
      required: false,
      touched: false,
      isValid: true,
      min: null,
      max: null,
      regex: null,
      type: 'String',
      errors: {
        regex: 'فرمت صحیح رعایت نشده است',
        len: 'طول صحیح رعایت نشده است',
        empty: 'مقدار خالی است',
        type: 'نوع داده اشتباه است',
      },
    },
  },
)

const fillFields = () => {
  store.wizardModel.phone = formFields.value.phone.value
  store.wizardModel.fax = formFields.value.fax.value
  store.wizardModel.postalCode = formFields.value.postalCode.value
  store.wizardModel.email = formFields.value.email.value
  store.wizardModel.address = formFields.value.address.value
}

const goToPrev = () => {
  fillFields()
  store.goToPrevStep()
}

const goToNext = () => {
  for (var item of Object.values(formFields.value)) {
    if (item.isValid == false) {
      setToched(item)
      checkValidation(item)
      return
    }
  }
  fillFields()
  store.goToNextStep()
}

const getLatLng = async(latlng: any) => {
  geo.value = latlng
  store.wizardModel.location.lat = geo.value[0]
  store.wizardModel.location.lng = geo.value[1]

  let addressResult = await api.getAddressByCoordinates(store.wizardModel.location.lat, store.wizardModel.location.lng);
  if(addressResult.result)
    formFields.value.address.value = addressResult.result
}

const getMapData = (map: any) => {
  setTimeout(() => {
    map.invalidateSize()
  }, 3000)
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
          <div class="grid gap-3 md:max-w-4xl md:grid-cols-3">
            <BaseInput
            v-model="formFields.fax.value"
            rounded="sm"
            size="sm"
            :placeholder="formFields.fax.placeHolder"
            :label="formFields.fax.title"
            :classes="{
              input: 'h-12 text-base text-center',
            }"
            :error="checkValidation(formFields.fax)"
            @focus="setToched(formFields.fax)"
            />
            <BaseInput
              v-model="formFields.phone.value"
              rounded="sm"
              size="sm"
              :placeholder="formFields.phone.placeHolder"
              :label="formFields.phone.title"
              :classes="{
                input: 'h-12 text-base text-center',
              }"
              :error="checkValidation(formFields.phone)"
              @focus="setToched(formFields.phone)"
            />
            <BaseInput
              v-model="formFields.postalCode.value"
              rounded="sm"
              size="sm"
              :placeholder="formFields.postalCode.placeHolder"
              :label="formFields.postalCode.title"
              :classes="{
                input: 'h-12 text-base text-center',
              }"
              :error="checkValidation(formFields.postalCode)"
              @focus="setToched(formFields.postalCode)"
            />
            <BaseInput
              v-model="formFields.email.value"
              rounded="sm"
              size="sm"
              :placeholder="formFields.email.placeHolder"
              :label="formFields.email.title"
              :classes="{
                input: 'h-12 text-base text-center',
              }"
              :error="checkValidation(formFields.email)"
              @focus="setToched(formFields.email)"
            />
            <div class="col-span-2">
              <BaseTextarea
                v-model="formFields.address.value"
                rounded="sm"
                size="sm"
                :disabled="!store.wizardModel.location.lat || !store.wizardModel.location.lng"
                :placeholder="formFields.address.placeHolder"
                :label="formFields.address.title"
                :error="checkValidation(formFields.address)"
                @focus="setToched(formFields.address)"
              />
            </div>
            
            <!-- <BaseInput v-model="formFields.address.value" rounded="lg" size="lg"
              :placeholder="formFields.address.placeHolder" :label="formFields.address.title" :classes="{
                input: 'h-12 text-base text-center',
              }" :error="checkValidation(formFields.address)" @focus="setToched(formFields.address)" /> -->

            <!-- <div class="absolute end-3 top-3 z-10">
              <BaseButtonIcon small rounded="full"
                class="hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-500 dark:hover:text-primary-500 pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                @click="toggleMap">
                <Icon name="flowbite:map-pin-alt-outline" class="pointer-events-none size-3" />
              </BaseButtonIcon>
            </div> -->

          </div>
          <div class="mx-auto mt-3 flex w-full max-w-lg flex-col gap-3">
            <MapLeafletMap
              :location-point="geo"
              @get-lat-lng="getLatLng"
              @map="(data) => getMapData(data)"
            />
          </div>
          <div
            class="inset-x-0 z-20 mx-auto flex w-full max-w-[304px] items-center justify-between gap-2 rounded-2xl py-3"
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
