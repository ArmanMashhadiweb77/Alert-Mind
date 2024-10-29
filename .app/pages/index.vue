<script setup lang="ts">
import Buttons from '~/components/admin/wizard/buttons.vue'
import UseWorkspace from '~/composables/api/workspace/useWorkspace'
import UseProjects from '~/composables/api/projects/useProjects'
definePageMeta({
  title: 'پروژه ها',
  // middleware: ['auth'],
})

//#region Import
// import useLocations from '~/composables/api/admin/useLocations'
//#endregion

//#region Instance
// const api = new useLocations()
//#endregion

//#region Variables
const loading = ref(true)
const workspaces = ref<any>([])
const projects = ref<any>([])
const useWorkspace = new UseWorkspace()
const useProject = new UseProjects()
// const classes = ref<ClassesData>({})
const isProjectModal = ref<boolean>(false)
const isWorkspaceModal = ref<boolean>(false)
const projectId = ref<number>(0)
//#endregion
//#region Functions
const getUserLocations = async () => {
  // const data = await api.getUserLocations(
  //   1,
  //   6,
  //   'desc'
  // )
  // loading.value = false
  // if (data) {
  //   if (data.result && data.totalCount && data.totalCount > 0) locations.value = data.result
  // }
}
const getAllWorkspace =async ()=> {
  const temp = await useWorkspace.getAll('',1,1000)
  if(temp.result){
    workspaces.value= temp.data.items
  }else{
    console.log("erorr")
  }
  console.log(temp)
}
const getAllProject =async ()=> {
  const temp = await useProject.getAll('',1,1000)
  if(temp.result){
    projects.value= temp.data.items
  }else{
    console.log("erorr")
  }
  console.log(temp)
}


onMounted(async () => {
  await getAllWorkspace()
  await getAllProject()

})

//#endregionconst fields = reactive({

const closeModal = () => {
  isProjectModal.value = false
}

const closeWork = () => {
  isWorkspaceModal.value = false
}
</script>
<template>
   <div class="space-y-4">
    <DemoSearchCompact/>
     <div class="grid grid-cols-4" >
       <div class="selection-workspaces col-span-1  ">
         <BaseCard
           rounded="sm"
           shadow="hover"
           class="p-6 w-[270px] "
         >
           <BaseHeading
             as="h4"
             size="lg"
             weight="semibold"
             lead="tight"
             class="text-muted-800 mt-2 dark:text-white  "
           >
             فضاهای کاری
           </BaseHeading>
           <div class="gap-y-4 flex flex-col mt-6 ">
             <BaseRadio
               v-for="(a,i) in workspaces"
               :key="i"
               name="checkbox_base"
               value="primary"
               color="primary"
               :label="a.title"

             />
           </div>
           <div @click="isWorkspaceModal=true" class="text-center mt-5">
             <BaseButton variant="solid" color="primary">
               ایجاد
             </BaseButton>
           </div>
         </BaseCard>
       </div>
       <div class="workspaces col-span-3 grid grid-cols-3 gap-2">
         <BaseCard
           v-for="(a,i) in projects"
           :key="i"
           rounded="sm"
           shadow="hover"
           class="col-span-1 flex flex-col items-center p-4 justify-between h-[300px]"
         >
           <div class="!ml-auto">
             <BaseSwitchBall
               v-model="value"
               color="primary"
               dir="rtl"
               title="سووییج"

             />
           </div>
           <BaseAvatar
             text="CT"
             size="xl"
             rounded="lg"
             class="bg-muted-200 dark:bg-muted-600 text-muted-800 dark:text-muted-300"
             src="/img/avatars/html5.svg"
           />
           <BaseHeading
             as="h4"
             size="lg"
             weight="semibold"
             lead="tight"
             class="text-muted-800 dark:text-white"

           >

              {{a.title}}
           </BaseHeading>
           <BaseParagraph
             size="sm"
             lead="tight"
             class="text-muted-400"
           >
             {{a.description}}

           </BaseParagraph>
           <div class="flex gap-3">
             <BaseButton rounded="sm" class="gap-2">
               <icon name="tdesign:browse"/>
               مشاهده
             </BaseButton>
             <BaseButton
               rounded="sm"
               @click="isProjectModal=true"
               class="gap-2">
               <icon name="tdesign:edit" />
               <span class="text-blue-600">ویرایش</span>
             </BaseButton>
           </div>
         </BaseCard>
       </div>
     </div>
     <div class="new-workspace fixed left-8 bottom-8 ">
       <div @click="isProjectModal=true" data-nui-tooltip="افزودن پروژه"  class="flex justify-center items-center rounded-full h-16 w-16 bg-red-600 cursor-pointer ease-in-out transition-all duration-100 hover:scale-110 active:scale-90">
         <Icon name="material-symbols:add-rounded" class="size-9 text-white" />
       </div>
     </div>
     <WorkspaceModalAddOrEdit
       :isOpen="isWorkspaceModal"
       @close="closeWork"
     />
     <ProjectModalAddOrEdit
       :isOpen="isProjectModal"
       :workspaces="workspaces"
       @close="closeModal"
     />
   </div>
</template>
<style>
.nui-switch-ball .nui-switch-ball-input:checked ~ .nui-switch-ball-handle {
  --tw-translate-x: -100% !important;
}

</style>




