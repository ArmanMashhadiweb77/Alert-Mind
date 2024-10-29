<script setup lang="ts">
//#region Imports
import useOrganizations from '~/composables/api/admin/useOrganizations'
import useLocations from '~/composables/api/admin/useLocations'
import useProducts from '~/composables/api/admin/useProducts'
//#endregion

//#region data
const organs = ref([]);
const locations = ref([]);
const products = ref([]);
const loading = ref({
  organ:true,
  location:false,
  product:false,
});

// let organs = ref([
//   { id: 0, title: 'همه موارد', description: 'شامل کلیه سازمان ها گردد', isSelected: false },
//   { id: 1, title: 'A', description: 'AAA', isSelected: false },
//   { id: 2, title: 'B', description: 'BBB', isSelected: false },
// ])
// let locations = ref([
//   { id: 0, title: 'همه موارد', description: 'شامل کلیه مکان ها گردد', isSelected: false, parentRef: 0 },
//   { id: 1, title: 'A', description: 'AAA', isSelected: false, parentRef: 1 },
//   { id: 2, title: 'B', description: 'BBB', isSelected: false, parentRef: 1 },
//   { id: 3, title: 'C', description: 'CCC', isSelected: false, parentRef: 1 },
//   { id: 4, title: 'D', description: 'DDD', isSelected: false, parentRef: 2 },
// ])
// let products = ref([
//   { id: 0, title: 'همه موارد', description: 'شامل کلیه محصولات گردد', isSelected: false, parentRef: 0 },
//   { id: 1, title: 'A', description: 'AAA', isSelected: false, parentRef: 1 },
//   { id: 2, title: 'B', description: 'BBB', isSelected: false, parentRef: 1 },
//   { id: 3, title: 'C', description: 'CCC', isSelected: false, parentRef: 2 },
//   { id: 4, title: 'D', description: 'DDD', isSelected: false, parentRef: 2 },
//   { id: 5, title: 'E', description: 'EEE', isSelected: false, parentRef: 3 },
//   { id: 6, title: 'F', description: 'FFF', isSelected: false, parentRef: 4 },
// ])
const formFilters = ref({
  date: {
    type: null,
    value: '1403-01-03',
  },
})
const listFiltering = (list:any[],listChild:any[]) => {
  let selectedList = list.filter((z: any) => z.isSelected).map((x: any) => x.id)
  return listChild.filter((z: any) => selectedList.includes(z.parentRef))
}
const isReadyForSearch = () => {
  return !!(formFilters.value.date.type != null
    && formFilters.value.date.value != null
    && listFiltering(organs.value,locations.value).length > 0
    && listFiltering(locations.value,products.value).length > 0
    && products.value.find(x => x.isSelected))
}
//#endregion

//#region Functions
const fillOrgans = async () => {
  loading.value.organ = true;
  const api = new useOrganizations()
  const data = await api.getAllForDisplay();
  console.log('data : ' , data)
  if (data.result && data.result.length > 0){
    organs.value = data.result.map((x:any)=>{ return {
      id:x.id,
      title : x.title,
      description : x.description,
      isSelected: false
    } });
    organs.value.splice(0,0,{ id: 0, title: 'همه موارد', description: 'شامل کلیه سازمان ها گردد', isSelected: false })
  }
  loading.value.organ = false;
}
const onSelectOrgan = async () => {
  loading.value.location = true;
  locations.value = [];
  const api = new useLocations()
  setTimeout(async () => {
    const selected = organs.value.filter((x: any) => x.isSelected).map((x: any) => [x.id]);
    for (const item of selected) {
      const data = await api.getUserLocations(1,999,'asc',null,null,+item)
      console.log('data : ' , data)
      if (data.result && data.result.length > 0) {

        locations.value = data.result.map((x: any) => {
          return {
            id: x.id,
            title: x.title,
            description: x.description,
            isSelected: false
          }
        });
      }
    }
    if (locations.value.length > 0){
      locations.value.splice(0,0,{ id: 0, title: 'همه موارد', description: 'شامل کلیه سازمان ها گردد',isSelected: false })
    }
    loading.value.location = false;
  },300)
}
const onSelectLocation = async () => {
  loading.value.product = true;
  products.value = [];
  const api = new useProducts()
  setTimeout(async () => {
    const selected = locations.value.filter((x: any) => x.isSelected).map((x: any) => [x.id]);
    for (const item of selected) {
      const data = await api.getUserProducts(1,999,'asc',null,+item)
      console.log('data : ' , data)
      if (data.result && data.result.length > 0) {
        products.value = data.result.map((x: any) => {
          return {
            id: x.id,
            title: x.title,
            description: x.description,
            isSelected: false
          }
        });
      }
    }
    if (products.value.length > 0){
      products.value.splice(0,0,{ id: 0, title: 'همه موارد', description: 'شامل کلیه محصولات گردد',isSelected: false })
    }
    loading.value.location = false;
  },300)
}

// const getAllProducts = async () => {
//   const api = new useProducts()
//   const data = await api.getAll()
//   if (data.result && data.result.length > 0){
//     locations.value = data.result.map((x:any)=>{ return {
//       id:x.id,
//       title : x.title,
//       description : x.description,
//       parentRef: x.organizationRef,
//       isSelected: false
//     } });
//     locations.value.splice(0,0,{ id: 0, title: 'همه موارد', description: 'شامل کلیه سازمان ها گردد',parentRef: 0, isSelected: false })
//   }
//   report.value.loading = false;
// }

const selectWatch = (data:any,list:any[],listChild:any[]) => {
  setTimeout(()=>{
    let item = list.find((z:any) => z.id === data.id);
    //if Select All Options
    if (item?.id === 0){
      //if Checked
      if (item?.isSelected) list.map((x: any) => x.isSelected = true)
      //if UnChecked
      else {
        list.map((x: any) => x.isSelected = false)
        listChild.map((y: any) => {y.isSelected = false})
      }
    }
    //if Select One Options
    else {
      list.forEach((x: any) => {
        //if Not Selected All
        if (x.id != 0) list[0].isSelected = false;
        //if Unchecked
        if (!x.isSelected){
          listChild.map((y: any) => {if (y.parentRef === x.id) y.isSelected = false})
        }
      })
    }
  },200)
}
//#endregion

//#region Constructors
onMounted(async () => {
  await fillOrgans()
})
//#endregion
</script>

<template>
<div>
  <BaseCard class="mb-3">
    <div shape="curved" class="w-full space-y-4 p-10">
      <div>
        <AdminFormLabel
          label="سازمان های شما"
          description="برای انتخاب مکان های مورد نظر ، ابتدا باید سازمان ( ها ) را مشخص نمایید"
        />
        <div class="flex mt-3 w-full text-center" v-if="!loading.organ && organs.length === 0"> اطلاعاتی جهت نمایش یافت نشد</div>
        <div class="flex mt-3 w-full text-center" v-if="loading.organ"> لطفا صبر کنید ، در حال دریافت اطلاعات ...  </div>
        <div class="mt-3 grid grid-cols-5 gap-3" v-else>
          <BaseCheckboxHeadless
            v-for="(item, i) in organs"
            :key="i"
            v-model="item.isSelected"
            :value="true"
            @click="onSelectOrgan"
          >
            <AdminFormCheckboxModel :title="item.title" :description="item.description"/>
          </BaseCheckboxHeadless>
        </div>
      </div> <!--Organs-->

      <div v-if="locations.length > 0">
        <AdminFormLabel
          label="محل های ثبت شده"
          description="مکان هایی که می خواهید بر اساس آن ها جستجو انجام شود انتخاب نمایید"
        />
        <div class="flex mt-3 w-full text-center" v-if="!loading.organ && organs.length === 0"> اطلاعاتی جهت نمایش یافت نشد</div>
        <div class="flex mt-3 w-full text-center" v-if="loading.location"> لطفا صبر کنید ، در حال دریافت اطلاعات ...  </div>
        <div class="mt-3 grid grid-cols-6 gap-3" v-else>
          <BaseCheckboxHeadless
            v-for="(item, i) in locations"
            :key="i"
            v-model="item.isSelected"
            :value="true"
            @click="onSelectLocation"
          >
            <AdminFormCheckboxModel :title="item.title" :description="item.description"/>
          </BaseCheckboxHeadless>
        </div>
      </div> <!--Locations-->

      <div v-if="listFiltering(locations,products).length > 0">
        <AdminFormLabel
          label="محصولات"
          description="محصولاتی که می خواهید بر اساس آن ها جستجو انجام شود انتخاب نمایید"
        />
        <div class="mt-3 grid grid-cols-6 gap-3">
          <BaseCheckboxHeadless
            v-for="(product, i) in listFiltering(locations,products)"
            :key="i"
            v-model="product.isSelected"
            :value="true"
          >
            <AdminFormCheckboxModel :title="product.title" :description="product.description"/>
          </BaseCheckboxHeadless>
        </div>
      </div> <!--Products-->

      <div v-if="listFiltering(organs,locations).length > 0 && listFiltering(locations,products).length > 0 && products.find((x)=> x.isSelected)">
        <AdminFormLabel
          label="زمان گزارش"
          description="بازه زمانی جستجوی گزارش را مشخص کنید"
        />
        <div class="mt-3 grid grid-cols-5 gap-3">
          <BaseRadioHeadless v-model="formFilters.date.type" value="today">
            <BaseCard rounded="sm" class="dateCard">
              <div class="flex w-full items-center gap-2">
                <div>
                  <BaseHeading
                    as="h4"
                    size="sm"
                    weight="medium"
                    lead="none"
                  >
                    امروز
                  </BaseHeading>
                  <BaseText size="xs" class="text-muted-400 mt-1">
                    1403/02/01
                  </BaseText>
                </div>
                <div class="child text-muted-300 ms-auto">
                  <div class="size-3 rounded-full bg-current" />
                </div>
              </div>
            </BaseCard>
          </BaseRadioHeadless>
          <BaseRadioHeadless v-model="formFilters.date.type" value="yesterday">
            <BaseCard rounded="sm" class="dateCard">
              <div class="flex w-full items-center gap-2">
                <div>
                  <BaseHeading
                    as="h4"
                    size="sm"
                    weight="medium"
                    lead="none"
                  >
                    دیروز
                  </BaseHeading>
                  <BaseText size="xs" class="text-muted-400 mt-1">
                    1403/01/31
                  </BaseText>
                </div>
                <div class="child text-muted-300 ms-auto">
                  <div class="size-3 rounded-full bg-current" />
                </div>
              </div>
            </BaseCard>
          </BaseRadioHeadless>
          <BaseRadioHeadless v-model="formFilters.date.type" value="week">
            <BaseCard rounded="sm" class="dateCard">
              <div class="flex w-full items-center gap-2">
                <div>
                  <BaseHeading
                    as="h4"
                    size="sm"
                    weight="medium"
                    lead="none"
                  >
                    یک هفته گذشته
                  </BaseHeading>
                  <BaseText size="xs" class="text-muted-400 mt-1">
                    1403/01/25  - 1403/02/01
                  </BaseText>
                </div>
                <div class="child text-muted-300 ms-auto">
                  <div class="size-3 rounded-full bg-current" />
                </div>
              </div>
            </BaseCard>
          </BaseRadioHeadless>
          <BaseRadioHeadless v-model="formFilters.date.type" value="month">
            <BaseCard rounded="sm" class="dateCard">
              <div class="flex w-full items-center gap-2">
                <div>
                  <BaseHeading
                    as="h4"
                    size="sm"
                    weight="medium"
                    lead="none"
                  >
                    یک ماه گذشته
                  </BaseHeading>
                  <BaseText size="xs" class="text-muted-400 mt-1">
                    1403/01/01  - 1403/02/01
                  </BaseText>
                </div>
                <div class="child text-muted-300 ms-auto">
                  <div class="size-3 rounded-full bg-current" />
                </div>
              </div>
            </BaseCard>
          </BaseRadioHeadless>
          <BaseRadioHeadless v-model="formFilters.date.type" value="dates">
            <BaseCard rounded="sm" class="dateCard">
              <div class="flex w-full items-center gap-2">
                <div>
                  <BaseHeading
                    as="h4"
                    size="sm"
                    weight="medium"
                    lead="none"
                  >
                    بازه زمانی
                  </BaseHeading>
                  <BaseText size="xs" class="text-muted-400 mt-1">
                    یک بازه زمانی مشخص کنید
                  </BaseText>
                </div>
                <div class="child text-muted-300 ms-auto">
                  <div class="size-3 rounded-full bg-current" />
                </div>
              </div>
            </BaseCard>
          </BaseRadioHeadless>
        </div>
      </div> <!--Dates-->

      <div v-if="isReadyForSearch()" class="searchBox">
        <BaseButton color="primary">
          جستجو
        </BaseButton>
      </div> <!--Do Search-->
    </div>
  </BaseCard> <!--Form-->
</div>
</template>

<style scoped>
.dateCard{
  @apply peer-checked:!border-primary-500 peer-checked:[&_.child]:!text-primary-500 border-2 p-4 opacity-50 peer-checked:opacity-100;
}
.searchBox{
  @apply flex flex-wrap items-center justify-center gap-4 pt-6
}
</style>
