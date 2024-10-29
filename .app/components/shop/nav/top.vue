<script setup lang="ts">
// import type { ShopSearch } from '#build/components';

const isSearchOpen = useState('search-open', () => false)

// const auth = new useAuth()
const route = useRoute()
const loading = ref(false)
const isLogin = ref(false)

onMounted(async () => {
  const capAuth = new useCapAuth();
  if (Object.keys(route.query).length > 0) {
    loading.value = true
    // let loginStatus = await auth.useCheckLogin(route.query)
    let loginStatus = await capAuth.checkLogin(route.query.state, route.query.code);

    loading.value = false

    // کاربر بدون مشکل لاگین کرد
    if (loginStatus.result) {
      isLogin.value = true

    }else{
      toastDanger(loginStatus.message)
    }
  }
})
const login = async () => {
  const capAuth = new useCapAuth()
  await capAuth.login()
}
</script>

<template>
  <div class="flex flex-row  ">
    <div class="flex flex-wrap items-end gap-2">
      <div class="group/nav ltablet:max-w-[1000px] ptablet:max-w-[47rem] fixed inset-x-0 top-0 z-50 mx-auto max-w-[350px] group-[&.scrolled]/landing:mt-2 group-[&:not(.scrolled)]/landing:mt-4 motion-safe:transition-all motion-safe:duration-200 lg:max-w-7xl">
        <div class="group-[&.scrolled]/landing:dark:bg-muted-950/95 group-[&.scrolled]/landing:border-muted-200 group-[&.scrolled]/landing:dark:border-muted-700 group-[&.scrolled]/landing:motion-safe:shadow-muted-300/30 group-[&.scrolled]/landing:motion-safe:dark:shadow-muted-800/20 m-5 flex items-center justify-between rounded-2xl border bg-slate-50 p-4 group-[&:not(.scrolled)]/landing:border-transparent group-[&.scrolled]/landing:bg-white/95 motion-safe:transition-all motion-safe:duration-200 group-[&.scrolled]/landing:motion-safe:shadow-xl">
          <div class="flex w-1/2 items-center justify-start gap-4 md:w-1/5">
            <div class="px-6 ">
              <button
                type="button"
                class="group-[&.scrolled]/landing:bg-muted-100  group-[&.scrolled]/landing:dark:bg-muted-900 group-[&.scrolled]/landing:border-muted-100 group-[&.scrolled]/landing:dark:border-muted-800 group-[&.scrolled]/landing:text-muted-400 group-[&.scrolled]/landing:dark:text-muted-500 group-[&.scrolled]/landing:hover:text-primary-500 group-[&.scrolled]/landing:dark:hover:text-primary-500 group-[&:not(.scrolled)]/landing:text-muted-800 group-[&:not(.scrolled)]/landing:dark:text-muted-200 group flex items-center gap-2 rounded-lg border bg-slate-100 py-1 pe-1 ps-3 group-[&.scrolled]/landing:border"
                aria-label="Open search"
                @click="isSearchOpen = true"
              >
                <Icon
                  name="lucide:search"
                  class="size-4 motion-safe:transition-colors motion-safe:duration-300"
                />
                <span
                  class="group-[&.scrolled]/landing:dark:bg-muted-800 group-[&.scrolled]/landing:border-muted-200 group-[&.scrolled]/landing:dark:border-muted-700 group-[&.scrolled]/landing:group-hover:text-muted-600 group-[&.scrolled]/landing:dark:group-hover:text-muted-100 rounded-lg border px-2 py-0.5 group-[&:not(.scrolled)]/landing:border-transparent group-[&.scrolled]/landing:bg-white group-[&.scrolled]/landing:shadow motion-safe:transition-colors motion-safe:duration-300"
                >
                  <kbd class="text-sm tracking-wide">
                    جستجو
                  </kbd>
                </span>
              </button>
            </div>
          </div>
          <div
            class="ltablet:static ltablet:w-auto ltablet:flex ltablet:flex-row dark:bg-muted-950 ltablet:!bg-transparent ltablet:mx-0 fixed inset-x-0 top-20 mx-auto w-[calc(100%_-_2rem)] items-center justify-center bg-white lg:static lg:mx-0 lg:flex lg:w-auto lg:flex-row lg:!bg-transparent"
          >
            گردشیوم
          </div>
          <div class="flex w-1/2 items-center gap-2 md:w-1/5">
            <div class="flex flex-wrap items-start gap-2">
              <BaseButtonIcon rounded="lg" color="default">
                <Icon name="ph:moon-duotone" class="size-5" />
              </BaseButtonIcon>

              <BaseButtonIcon rounded="lg" color="default">
                <Icon name="ph:heart-duotone" class="size-5" />
              </BaseButtonIcon>

              <BaseButtonIcon
                v-if="isLogin == true"
                rounded="lg"
                color="default"
                to="/admin"
              >
                <Icon name="flowbite:user-circle-outline" class="size-5" />
              </BaseButtonIcon>

              <BaseButtonIcon
                v-else
                rounded="lg"
                color="default"
                @click="login"
              >
                <Icon name="flowbite:arrow-left-to-bracket-outline" class="size-5" />
              </BaseButtonIcon>
            </div>
          </div>
        </div>
      </div>
      <ShopSearch />
    </div>
  </div>
</template>
