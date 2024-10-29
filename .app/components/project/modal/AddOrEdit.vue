<script setup lang="ts">
import UseProjects from '~/composables/api/projects/useProjects'
const props = defineProps<{
  isOpen: boolean,
  workspaces:any,
  projectId:any,
  useProject:any,
}>()
const workspaceId =ref<number>(0)
const loading = ref<boolean>(false)
// const allIdProject =ref <number>(0)

const idPro = () => {
 
}
const emits = defineEmits(['close'])

const closeWork = () => {
  emits ("close")
  resetValue()
}
const title = ref<string>('')
const description = ref<string>('')

const useProjects = new UseProjects()
const checkError  = () =>{
  if(title.value.trim() == ''){
    return false
  }
  return true
}
const getId =async ()=> {
  const temp = await useProjects.getById(0,)
  if(temp.result){

  }else{
    console.log("erorr")
  }
  console.log(temp)
}

watch(
  () => props.isOpen,
  async () => {
    if (props.isOpen && props.projectId ==0){
      workspaceId.value = props.workspaces[0].id
    }else if (props.isOpen && props.projectId !=0){
    await getId()
    }
  }
)

const resetValue = () =>{
  title.value=""
  description.value=""
}



const create = async () => {
  if(checkError()){
    loading.value=true
    // setTimeout(() => {
    // }, 3000)
    console.log("description:",description.value)
    const response = await useProjects.create(workspaceId.value, title.value,  description.value )

    if(response.result){
      closeWork()
      showToast("success" , response.message)
    }else{
      showToast("unsuccess" , "خطا در ایجاد فضای کاری")

    }
    loading.value=false
  }
}
const getById = async () => {
  if(checkError()){
    loading.value=true
    // setTimeout(() => {
    // }, 3000)
    console.log("description:",description.value)
    const response = await useProjects.getById(projectsId.value, )

    if(response.result){
      closeWork()
      showToast("success" , response.message)
    }else{
      showToast("unsuccess" , "خطا در ایجاد فضای کاری")

    }
    loading.value=false
  }
}
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
// interface IDad {
//   id: number,
//   title: string
// }
//
// onMounted(()=>{
//   const dad = ref<IDad>({
//     id: 1,
//     title: 'My Journey with Vue'
//   })
//   console.log(dad.value.)
// })
onMounted(async () => {
  await getId()
})

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
        <div class=" space-y-6 Estedad_FD_Light ">

          <BaseSelect
            v-model="workspaceId"
            rounded="sm"
            label="فضای کاری"
          >
            <option
              v-for="(workspace,i) in props.workspaces"
              :key="i"
              :value="workspace.id"
            >
              {{workspace.title}}
            </option>
          </BaseSelect>
          <BaseInput
            rounded="sm"
            label="عنوان"
            placeholder=""
            v-model="title"
            :disabled="loading"
          />
          <BaseInput
            rounded="sm"
            label="توضیحات"
            placeholder=""
            v-model="description"
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

