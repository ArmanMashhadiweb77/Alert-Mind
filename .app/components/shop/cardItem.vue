<script setup lang="ts">
definePageMeta({
  title: 'Card Grid',
  preview: {
    title: 'Card grid 4',
    description: 'For item grids and collections',
    categories: ['layouts'],
    src: '/img/screens/layouts-card-grid-4.png',
    srcDark: '/img/screens/layouts-card-grid-4-dark.png',
    order: 60,
  },
})

const route = useRoute()
const router = useRouter()
const page = computed(() => parseInt((route.query.page as string) ?? '1'))

const filter = ref('')
const perPage = ref(12)

const data = ref([])
const pending = ref(false)

watch([filter, perPage], () => {
  router.push({
    query: {
      page: undefined,
    },
  })
})

const query = computed(() => {
  return {
    filter: filter.value,
    perPage: perPage.value,
    page: page.value,
  }
})

</script>

<template>
  <div>
    <TairoContentWrapper>
      <div>
        <div v-if="!pending && data.length === 0">
          <BasePlaceholderPage
            title="نتیجه ای یافت نشد!"
            subtitle="به نظر می‌رسد ما نتوانستیم هیچ نتیجه منطبقی برای جستجوی شما پیدا کنیم. سایر عبارات جستجو را امتحان کنید."
          >
            <template #image>
              <img
                class="block dark:hidden"
                src="/img/placeholder/flat/placeholder-search-6.svg"
                alt="Placeholder image"
              >
              <img
                class="hidden dark:block"
                src="/img/placeholder/flat/placeholder-search-6-dark.svg"
                alt="Placeholder image"
              >
            </template>
          </BasePlaceholderPage>
        </div>
        <div v-else>
          <div
            class="ltablet:grid-cols-4 grid w-full gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            <TransitionGroup
              enter-active-class="transform-gpu"
              enter-from-class="opacity-0 -translate-x-full"
              enter-to-class="opacity-100 translate-x-0"
              leave-active-class="absolute transform-gpu"
              leave-from-class="opacity-100 translate-x-0"
              leave-to-class="opacity-0 -translate-x-full"
            >
              <BaseCard
                v-for="item in data"
                :key="item.id"
                rounded="lg"
                class="group p-3"
              >
                <div class="relative">
                  <img
                    :src="item.image"
                    class="h-40 w-full rounded-lg object-cover"
                    alt=""
                  >
                  <BaseTag
                    rounded="full"
                    color="primary"
                    variant="pastel"
                    size="sm"
                    class="absolute start-3 top-3 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    {{ item.category }}
                  </BaseTag>
                </div>
                <div>
                  <div class="mb-6 mt-3">
                    <BaseHeading
                      tag="h3"
                      size="md"
                      weight="medium"
                      lead="snug"
                      class="line-clamp-2 text-gray-800 dark:text-gray-100"
                    >
                      {{ item.title }}
                    </BaseHeading>
                  </div>

                  <div class="mt-auto flex items-center gap-2">
                    <BaseAvatar
                      :src="item.author.avatar"
                      :text="item.author.initials"
                      size="xs"
                      class="bg-muted-500/20 text-muted-500"
                    />
                    <div class="leading-none">
                      <h4
                        class="text-muted-800 dark:text-muted-100  text-sm font-medium leading-tight"
                      >
                        {{ item.author.name }}
                      </h4>
                      <p class="text-muted-400  text-xs">
                        {{ item.published }}
                      </p>
                    </div>
                    <div class="ms-auto">
                      <BaseButtonAction to="#" rounded="sm">
                        <Icon name="lucide:edit-3" />
                        <span>Edit</span>
                      </BaseButtonAction>
                    </div>
                  </div>
                </div>
              </BaseCard>
            </TransitionGroup>
          </div>
          <div class="mt-6">
            <BasePagination
              :total-items="12"
              :item-per-page="perPage"
              :current-page="page"
              rounded="lg"
            />
          </div>
        </div>
      </div>
    </TairoContentWrapper>
  </div>
</template>
