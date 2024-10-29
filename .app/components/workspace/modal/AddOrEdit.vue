<script setup lang="ts">
import UseWorkspace from '~/composables/api/workspace/useWorkspace'

const props = defineProps<{
  isOpen: boolean,
  workspaces:any,
}>()


const emits = defineEmits(['close'])

const closeWork = () => {
  emits ("close")
  resetValue()
}
const title = ref<string>('')

const useWorkspace = new UseWorkspace()
const checkError  = () =>{
  if(title.value.trim() == ''){
    return false
  }
  return true
}

const resetValue = () =>{
  title.value=""
}
const loading = ref<boolean>(false)

const create = async () => {
  if(checkError()){
    loading.value=true
    // setTimeout(() => {
    // }, 3000)
    const response = await useWorkspace.create(null, title.value)

    if(response.result){
      closeWork()
      showToast("success" , response.message)
    }else{
      showToast("unsuccess" , "خطا در ایجاد فضای کاری")

    }
    loading.value=false
  }
}
//#region TOAST
const toaster = useToaster()
const showToast = (status: string, message: string) => {
  toaster.show({
    title: status === 'success' ? "انجام شد" : "خطا",
    message: message,
    color: status === 'success' ? 'success' : 'danger',
    icon: status === 'success' ? 'lucide:check' : 'ic:baseline-error-outline',
    closable: true,
  })
}
// region

</script>

<template>
  <TairoModal
    :open="props.isOpen"
    size="md"

    footer-align="start"

  >
    <template #header>
      <!-- Header -->
      <div class="flex w-full items-center justify-between p-4 md:p-6">
        <h4 class="Estedad_FD_Light text-muted-900 text-xl text-muted-800 font-bold leading-6 dark:text-white">
         افزودن پروژه
        </h4>

        <BaseButtonClose
          size="md"
          rounded="full"
          color="muted"
          @click ="closeWork"
        />

      </div>
    </template>
    <!-- Body -->
    <div class="px-4">

      <div class=" w-full ">
        <div class="  Estedad_FD_Light ">

          <BaseInput
            v-model="title"
            rounded="sm"
            label="عنوان "
            placeholder=""
            :disabled="loading"
          />

        </div>

      </div>
    </div>

    <template #footer>
      <!-- Footer -->
      <div class="p-4 md:p-6 ">
        <div class="flex gap-x-2 items-end ">
          <BaseButton
            class="Estedad_FD_Light"
            color="primary"
            variant="solid"
            @click="create"
            :disabled="loading"
          >
            ثبت
          </BaseButton>
          <BaseButton
            class="Estedad_FD_Light"
            @click="closeWork"
            :disabled="loading"
          >
            انصراف
          </BaseButton>


        </div>
      </div>
    </template>
  </TairoModal>
</template>

<style scoped>

</style>

