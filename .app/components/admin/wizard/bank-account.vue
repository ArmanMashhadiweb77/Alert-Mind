<script setup lang="ts">
const props = defineProps(['account'])
const emits = defineEmits(['newAccount'])
const bankType = ref()

const formFields = ref(
  {
    accountNumber: {
      value: props.account?.accountNumber,
      title: 'شماره حساب',
      placeHolder: 'شماره حساب را وارد کنید',
      required: true,
      touched: false,
      isValid: props.account?.accountNumber ? true : false,
      min: bankType.value === 1 ? 13 : 10,
      max: bankType.value === 1 ? 13 : 10,
      regex: null,
      type: 'String',
      errors: {
        regex: '',
        len: 'طول صحیح کارکتر رعایت نشده است. ' + (bankType.value === 1 ? '(13 کارکتر)' : '(10 کارکتر)'),
        empty: 'مقدار خالی است',
        type: 'نوع داده اشتباه است',
      },
    },
    shabaAccountNumber: {
      value: props.account?.shabaAccountNumber,
      title: 'شماره شبا',
      placeHolder: 'شماره شبا را وارد کنید',
      required: true,
      touched: false,
      isValid: props.account?.shabaAccountNumber ? true : false,
      min: 24,
      max: 24,
      regex: null,
      type: 'String',
      errors: {
        regex: '',
        len: 'طول صحیح کارکتر رعایت نشده است. (24 کارکتر)',
        empty: 'مقدار خالی است',
        type: 'نوع داده اشتباه است',
      },
    },
    bankType: {
      value: props.account?.bankType,
      title: 'بانک را مشخص کنید',
      placeHolder: 'بانک',
      required: true,
      touched: false,
      isValid: props.account?.bankType ? true : false,
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
    isShowInBankDisk: {
      value: props.account?.isShowInBankDisk ?? true,
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
    isDefault: {
      value: props.account?.isDefault,
      title: 'پیش فرض',
      placeHolder: 'پیش فرض',
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
  },
)

watch(formFields.value.bankType, () => {
  if (formFields.value.bankType.value) {
    bankType.value = formFields.value.bankType.value,
    formFields.value.accountNumber.min = bankType.value == '1' ? 13 : 10
    formFields.value.accountNumber.max = bankType.value == '1' ? 13 : 10
    formFields.value.accountNumber.errors.len = 'طول صحیح کارکتر رعایت نشده است. ' + (bankType.value == '1' ? '(13 کارکتر)' : '(10 کارکتر)')
  }
})

onMounted(
  () => {
    if (props.account)
      for (var item of Object.values(formFields.value)) {
        if (!item.isValid) {
          setToched(item)
          checkValidation(item)
        }
      }
  },
)

const cancel = () => {
  emits('newAccount', null)
}

const save = () => {
  for (var item of Object.values(formFields.value)) {
    if (!item.isValid) {
      setToched(item)
      checkValidation(item)
      return
    }
  }
  const account = {
    accountNumber: formFields.value.accountNumber.value,
    shabaAccountNumber: formFields.value.shabaAccountNumber.value,
    bankType: formFields.value.bankType.value,
    isShowInBankDisk: formFields.value.isShowInBankDisk.value,
    isDefault: formFields.value.isDefault.value,
  }
  emits('newAccount', account)
}
</script>
<template>
  <div class="border-muted-200 dark:border-success-700 dark:bg-muted-800 rounded-sm border p-3">
    <div class="grid gap-3 md:max-w-4xl md:grid-cols-7">
      <BaseSelect
        v-model="formFields.bankType.value"
        rounded="sm"
        size="sm"
        :label="formFields.bankType.title"
        :classes="{ input: 'h-12 text-base text-center' }"
        :error="checkValidation(formFields.bankType)"
        @focus="setToched(formFields.bankType)"
      >
        <option value="">
          بانک را انتخاب کنید
        </option>
        <option value="1">
          ملی
        </option>
        <option value="2">
          ملت
        </option>
      </BaseSelect>

      <div class="col-span-2">
        <BaseInput
        v-model="formFields.accountNumber.value"
        rounded="sm"
        size="sm"
        :placeholder="formFields.accountNumber.placeHolder"
        :label="formFields.accountNumber.title"
        :classes="{ input: 'h-12 text-base text-center' }"
        :error="checkValidation(formFields.accountNumber)"
        @focus="setToched(formFields.accountNumber)"
      />
      </div>
      <div class="col-span-2">
        <BaseInput
        v-model="formFields.shabaAccountNumber.value"
        rounded="sm"
        size="sm"
        :placeholder="formFields.shabaAccountNumber.placeHolder"
        :label="formFields.shabaAccountNumber.title"
        :classes="{ input: 'h-12 text-base text-center' }"
        :error="checkValidation(formFields.shabaAccountNumber)"
        @focus="setToched(formFields.shabaAccountNumber)"
      />
      </div>
     

      <div hidden>
        <BaseCheckbox
          v-model="formFields.isShowInBankDisk.value"
          rounded="sm"
          size="sm"
          :label="formFields.isShowInBankDisk.title"
          color="muted"
        />
      </div>
      <div class="mt-6">
        <BaseCheckboxHeadless v-model="formFields.isDefault.value" >
        <BaseCard
          rounded="sm"
          
          class="peer-checked:!border-success-500 peer-checked:[&_.child]:!text-success-500 border-2 p-2 opacity-50 peer-checked:opacity-100"
        >
          <div class="flex w-full items-center gap-2">
            
            <div>
              <BaseHeading
                as="h6"
                size="sm"
                weight="medium"
                lead="none"
              >
              {{formFields.isDefault.title}}
              </BaseHeading>

              <!-- <BaseText size="xs" class="text-muted-400">
                Software Engineer
              </BaseText> -->
            </div>

            <div class="child text-muted-300 ms-auto">
              <div class="size-3 rounded-full bg-current" />
            </div>
          </div>
        </BaseCard>
      </BaseCheckboxHeadless></div>
      
      <!-- <BaseCheckbox
        v-model="formFields.isDefault.value"
        rounded="sm"
        size="sm"
        :label="formFields.isDefault.title"
        color="info"
      /> -->
      <div class="flex items-center max-w-[304px] justify-between gap-2 mt-6">
        <BaseButton
          rounded="sm"
          color="danger"
          class="w-full"
          size="sm"
          @click="cancel()"
        >
        <Icon name="lucide:x" class="size-5" />
          <!-- <span>انصراف</span> -->
        </BaseButton>
        <BaseButton
          rounded="sm"
          color="success"
          class="w-full"
          size="sm"
          @click="save()"
        >
        <Icon name="lucide:save" class="size-5" />
          <!-- <span>ذخیره</span> -->
        </BaseButton>
      </div>
    </div>
  </div>
</template>
