<script setup lang="ts">

import {
  format,
  isPast,
  isToday,
  startOfWeek,
  startOfDay,
  endOfWeek,
  endOfDay,
  addDays,
  addMinutes,
  roundToNearestMinutes,
} from 'date-fns'
import { Calendar } from 'v-calendar'
// import { Container, Draggable } from 'vue3-smooth-dnd'

import 'v-calendar/dist/style.css'
import '/assests/css/vcalendar-weekly.css'
import '/assests/css/vcalendar.css'

import {
  type VCalendarAttribute,
  type CalendarCustomAttribute,
  type CalendarSettings,
  type CalendarEvent,
  dateToTop,
  datesToHeight,
  topToDate,
  categoryTheme,
  useCalendarEvents,
  useDateRange,
  useNowMarker,
  useDragEvent,
  useDragEventPending,
  useCreateEvent,
  useViewPan,
} from '~/utils/bundles/calendar'
const scrollCalendarRef = ref<HTMLElement>()
const showSettings = ref(false)
const settings = reactive<CalendarSettings>({
  hideWeekends: false,
  hourOpen: 8,
  hourClose: 18,
  hourPrecision: 15,
  hourHeight: 160,
  dayOffsetY: 0,
  weekStartsOn: 0,
})
function getChildPayload(index: number) {
  return pendingEvents.value?.[index - 1]
}

const { fromDate, toDate, weekdays, onPageChange } = useDateRange(settings)
const { calendarEvents, pendingEvents } = useCalendarEvents({
  fromDate,
  toDate,
})

const {
  isHeightDragging,
  isPositionDragging,
  onHeightDragStart,
  onPositionDragStart,
} = useDragEvent(
  settings,
  calendarEvents,
  // on drag end
  async (event) => {
    // update event
  },
)

const { onCalendarClick, clearNew, hasNew } = useCreateEvent(
  settings,
  calendarEvents,
  // new event template
  date => ({
    startDate: date,
    endDate: addMinutes(date, 30),
    duration: 30,
    category: 'none',
    title: '',
    participants: [],
  }),
  // can create new event
  () => {
    return !(
      isHeightDragging.value
      || isPositionDragging.value
      || isViewPaning.value
    )
  },
  // on create
  async (event) => {
    calendarEvents.value.push(event)
    onSelectEvent(event.customData)
  },
)

const selectedEventId = ref<string>()
const selectedEvent = computed(() => {
  return (
    calendarEvents.value.find(
      event => event?.customData?.id === selectedEventId.value,
    )?.customData
    || pendingEvents.value.find(event => event.id === selectedEventId.value)
  )
})
function onSelectEvent(event: CalendarEvent) {
  if (event.id !== 'new' && hasNew.value) {
    clearNew()
  }

  selectedEventId.value = event.id
}

const { now, showNow } = useNowMarker(scrollCalendarRef, settings)
const { isViewPaning, isViewMoved } = useViewPan(scrollCalendarRef, () => {
  return !(isHeightDragging.value || isPositionDragging.value)
})

const { isPendingEventDragging, onPendingEventDragStart } = useDragEventPending(
  settings,
  calendarEvents,
  // on drag end
  (event) => {
    onSelectEvent(event.customData)
    calendarEvents.value.push(event)

    const idx = pendingEvents.value.findIndex(
      item => item.id === event.customData.id,
    )
    if (idx === -1) {
      return
    }
    pendingEvents.value.splice(idx, 1)
  },
)

const isDragging = computed(
  () =>
    isPendingEventDragging.value
    || isPositionDragging.value
    || isHeightDragging.value,
)

function scrollCalendarToTop(top = 0, behavior: ScrollBehavior = 'smooth') {
  if (!scrollCalendarRef.value) {
    return
  }

  scrollCalendarRef.value.scrollTo({
    top,
    behavior,
  })
}

function updateHeight(height = 160) {
  if (!scrollCalendarRef.value) {
    return
  }

  const top = scrollCalendarRef.value.scrollTop
  const initialDate = topToDate(settings, top)

  settings.hourHeight = height

  if (!initialDate) {
    return
  }

  nextTick(() => {
    scrollCalendarToTop(dateToTop(settings, initialDate), 'instant')
  })
}
const selectedEventFeatures = computed({
  get() {
    return selectedEvent.value?.features
      ? Object.keys(selectedEvent.value?.features)
      : []
  },
  set(values: string[]) {
    if (!selectedEvent.value) {
      return
    }

    selectedEvent.value.features = values.reduce(
      (acc, value) => {
        acc[value] = true
        return acc
      },
      {} as Record<string, boolean>,
    )
  },
})
definePageMeta({
  title: 'افزونه ها',
  dir:'ltr',
  // middleware: ['auth'],
})
</script>

<template>
  <div
    class="dark:bg-muted-900 flex h-screen w-full select-none overflow-x-auto bg-white lg:overflow-hidden"
  >
    <Transition
      mode="out-in"
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="translate-x-0 opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition-all duration-100 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      :leave-to-class="
            selectedEvent
              ? '-translate-x-20 opacity-0'
              : 'translate-x-20 opacity-0'
          "
    >
      <div
        v-if="selectedEvent"
        class="nui-slimscroll relative h-[calc(100vh_-_53px)] p-6 pt-4"
        :class="{
              'overflow-y-auto overflow-x-hidden': !showSettings,
              'overflow-hidden': showSettings,
            }"
      >
        <div
          v-if="showSettings"
          role="button"
          tabindex="0"
          class="absolute inset-0 z-50 cursor-pointer backdrop-blur-[2px]"
          @click="showSettings = false"
        />
        <BaseHeading
          size="sm"
          weight="medium"
          lead="snug"
          class="text-muted-400 dark:text-muted-500 mb-4 flex items-center justify-between uppercase"
        >
          <span>اطلاعات رویداد</span>
          <BaseButtonClose
            color="default"
            class="dark:bg-muted-800 bg-white"
            @click="selectedEventId = undefined"
          />
        </BaseHeading>

        <div class="flex flex-col gap-2">
          <BaseInput
            v-model.trim="selectedEvent.title"
            v-focus
            label="عنوان"
          />

          <BaseListbox
            v-model.prop="selectedEvent.category"
            label="دسته بندی"
            :properties="{
                  value: 'value',
                  label: 'label',
                }"
            :items="
                  Object.entries(categoryTheme).map(([key, item]) => ({
                    value: key,
                    label: item.name,
                  }))
                "
          />

          <BaseAutocomplete
            v-model="selectedEvent.participants"
            :items="[
                  {
                    photo: '/img/avatars/1.svg',
                    name: 'Hermann Mayer',
                  },
                  {
                    photo: '/img/avatars/2.svg',
                    name: 'Kendra Wilson',
                  },
                  {
                    photo: '/img/avatars/3.svg',
                    name: 'Clarissa Miller',
                  },
                  {
                    photo: '/img/avatars/4.svg',
                    name: 'Eddy Bricks',
                  },
                  {
                    photo: '/img/avatars/5.svg',
                    name: 'Clark Smith',
                  },
                  {
                    name: 'Clarissa Perez',
                    photo: '/img/avatars/8.svg',
                  },
                  {
                    name: 'Benedict Kessler',
                    photo: '/img/avatars/17.svg',
                  },
                  {
                    name: 'Maya Rosselini',
                    photo: '/img/avatars/25.svg',
                  },
                ]"
            :properties="{
                  label: 'name',
                  media: 'photo'
                }"
            :display-value="(item: any) => item?.name || ''"
            dropdown
            multiple
            :filter-items="
                  (query?: string, items?: any[]) => {
                    if (!query || !items) {
                      return items ?? []
                    }

                    // search by name or text
                    return items.filter((item) => {
                      const nameMatches = item?.name
                        ?.toLowerCase()
                        .includes(query.toLowerCase())
                      const textMatches = item?.text
                        ?.toLowerCase()
                        .includes(query.toLowerCase())
                      return nameMatches || textMatches
                    })
                  }
                "
            icon="ph:users-three"
            placeholder="Search..."
            label="اسامی"
            clearable
          />
          <div class="relative z-[5] grid grid-cols-4 gap-2 pt-4">
            <div data-nui-tooltip="Record">
              <BaseCheckboxHeadless
                v-model="selectedEventFeatures"
                value="record"
                name="features"
              >
                <BaseCard
                  rounded="lg"
                  class="text-muted-300 peer-checked:border-primary-500 peer-checked:text-primary-500 p-4"
                >
                  <div class="flex flex-col items-center gap-1">
                    <Icon name="ph:monitor-play-duotone" class="size-5" />
                    <!-- <div
                      class="text-muted-800 dark:text-muted-100 text-xs font-medium"
                    >
                      Record
                    </div> -->
                  </div>
                </BaseCard>
              </BaseCheckboxHeadless>
            </div>
            <div data-nui-tooltip="Document included">
              <BaseCheckboxHeadless
                v-model="selectedEventFeatures"
                value="drive"
                name="features"
              >
                <BaseCard
                  rounded="lg"
                  class="text-muted-300 peer-checked:border-primary-500 peer-checked:text-primary-500 p-4"
                >
                  <div class="flex flex-col items-center gap-1">
                    <Icon name="ph:note-duotone" class="size-5" />
                    <!-- <div
                      class="text-muted-800 dark:text-muted-100 text-xs font-medium"
                    >
                      Record
                    </div> -->
                  </div>
                </BaseCard>
              </BaseCheckboxHeadless>
            </div>
            <div data-nui-tooltip="External Users">
              <BaseCheckboxHeadless
                v-model="selectedEventFeatures"
                value="external"
                name="features"
              >
                <BaseCard
                  rounded="lg"
                  class="text-muted-300 peer-checked:border-primary-500 peer-checked:text-primary-500 p-4"
                >
                  <div class="flex flex-col items-center gap-1">
                    <Icon name="ph:lock-open-duotone" class="size-5" />
                    <!-- <div
                      class="text-muted-800 dark:text-muted-100 text-xs font-medium"
                    >
                      Record
                    </div> -->
                  </div>
                </BaseCard>
              </BaseCheckboxHeadless>
            </div>
            <div data-nui-tooltip="Comment allowed">
              <BaseCheckboxHeadless
                v-model="selectedEventFeatures"
                value="conversation"
                name="features"
              >
                <BaseCard
                  rounded="lg"
                  class="text-muted-300 peer-checked:border-primary-500 peer-checked:text-primary-500 p-4"
                >
                  <div class="flex flex-col items-center gap-1">
                    <Icon name="ph:chats-circle-duotone" class="size-5" />
                    <!-- <div
                      class="text-muted-800 dark:text-muted-100 text-xs font-medium"
                    >
                      Record
                    </div> -->
                  </div>
                </BaseCard>
              </BaseCheckboxHeadless>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="nui-slimscroll relative h-[calc(100vh_-_53px)] p-6"
        :class="{
              'overflow-y-auto overflow-x-hidden': !showSettings,
              'overflow-hidden': showSettings,
            }"
      >
        <div
          v-if="showSettings"
          tabindex="0"
          role="button"
          class="absolute inset-0 z-50 cursor-pointer backdrop-blur-[2px]"
          @click="showSettings = false"
        />

        <!-- Draggable pending events cards -->
        <Container
          class="flex !min-h-[300px] flex-col"
          tag="div"
          orientation="vertical"
          group-name="unscheduled"
          drag-class="transform cursor-grabbing drop-shadow rotate-2 transform-gpu"
          drag-handle-selector=".dnd-drag-handler"
          :should-accept-drop="() => false"
          :get-child-payload="(idx: number) => getChildPayload(idx)"
          :drop-placeholder="{
                className:
                  'border-muted-200 border-dashed dark:border-muted-800 dark:bg-muted-800 group relative flex cursor-pointer flex-col items-start rounded-lg border bg-white p-4 hover:bg-white',
              }"
          @drag-start="
                (ctx: any) => {
                  clearNew()
                  onPendingEventDragStart(ctx)
                }
              "
        >
          <template v-if="pendingEvents?.length">
            <BaseHeading
              size="sm"
              weight="medium"
              lead="snug"
              class="text-muted-400 dark:text-muted-500 mb-4 uppercase"
            >
              رویداد در انتظار
            </BaseHeading>
            <Draggable
              v-for="pendingEvent in pendingEvents"
              :key="pendingEvent.id"
            >
              <DemoCalendarEventPending
                :event="pendingEvent"
                role="button"
                @click="() => onSelectEvent(pendingEvent as any)"
              />
            </Draggable>
          </template>
          <div v-else>
            <!-- empty state -->
            <div class="p-4">
              <img
                class="mx-auto block max-w-[200px] dark:hidden"
                src=""
                alt=""
              >
              <img
                class="mx-auto hidden max-w-[200px] dark:block"
                src=""
                alt=""
              >
              <div class="mt-4 text-center">
                <BaseHeading
                  as="h4"
                  size="lg"
                  weight="light"
                  class="mb-1"
                >
                  <span>No pending events</span>
                </BaseHeading>
                <BaseParagraph
                  size="xs"
                  lead="tight"
                  class="text-muted-400 mx-auto max-w-[200px] !font-sans"
                >
                  <span>You've planned all your events for this week.</span>
                </BaseParagraph>
                <NuxtLink
                  href="#"
                  class="text-primary-500 nui-focus dark:text-sunny pointer-events-auto mx-auto mt-2 flex items-center justify-center gap-1 font-sans text-xs underline-offset-4 hover:underline"
                >
                  <Icon name="lucide:plus" class="size-3" />
                  <span>New event</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Transition>
    <!-- Sidebar -->
    <div
      class="  absolute border-muted-200 dark:border-muted-800 grid grow gap-8 border-b mr-[250px]"
      :class="[settings.hideWeekends ? 'grid-cols-5' : 'grid-cols-7']"
      dir="ltr"
    >
    <span
      v-for="day of weekdays"
      :key="day.toISOString()"
      class="day-label text-muted-900 dark:text-muted-400 pointer-events-none  flex right-[150px] h-[52px] items-center p-3 text-sm"
      :class="[isPast(endOfDay(day)) ? 'opacity-50' : '']"
    >
              <span>{{ capitalize(format(day, 'EEEE d')) }}</span>
              <span v-if="isToday(day)" class="text-primary-500 gap-2 flex mb-[2px]  ">
                <Icon name="ph:calendar-blank-duotone" />
              </span>
            </span>
</div>


      <BaseCard class=" grow   mt-12" >

        <div
          ref="scrollCalendarRef"
          class="nui-slimscroll relative h-[100vh] w-[1500px] grow space-y-14 overflow-auto lg:w-auto lg:overflow-x-hidden"
        >
        <Calendar
          class="custom-calendar absolute "
          :class="{
                'hide-weekend': settings.hideWeekends,
              }"
          view="weekly"
          expanded
          trim-weeks
          disable-page-swipe
          title-position="right"
          :first-day-of-week="
                settings.weekStartsOn !== undefined
                  ? ((settings.weekStartsOn + 1) as any)
                  : 1
              "
          :attributes="(calendarEvents as VCalendarAttribute[])"
          @update:pages="onPageChange"
        >
          <div
            class="border-muted-200 dark:border-muted-800 pointer-events-none grow border-t "
          >
            <div
              v-for="i in settings.hourClose - settings.hourOpen"
              :key="i"
              class="border-muted-200 dark:border-muted-800 relative border-b"
              :style="{
                    height: `${settings.hourHeight}px`,
                  }"
            >
                  <span
                    class="dark:bg-muted-900 text-muted-900 dark:text-muted-300 absolute -top-2 left-1 bg-white px-2 text-xs"
                  >
                    {{ i + (settings.hourOpen - 1) }}h
                  </span>
            </div>
          </div>

          <template
            #day-content="{
                  day,
                  attributes,
                }: {
                  day: any
                  attributes: CalendarCustomAttribute<CalendarEvent>[]
                }"
          >
            <div
              role="button"
              tabindex="0"
              class="group relative z-10 flex h-full flex-col p-0"
              :data-day="day.date"
              :class="{
                    'pointer-events-none': isViewMoved,
                  }"
              @dblclick="(event) => onCalendarClick(event, day.date)"
            >
              <!-- current time marker -->
              <div
                v-if="day.isToday && showNow"
                class="pointer-events-none absolute inset-x-0 z-50 h-[1px] bg-red-500 before:block before:size-2 before:-translate-x-full before:translate-y-[-3px] before:rounded-full before:bg-red-600 before:content-['']"
                :style="{
                      top: `${dateToTop(settings, now, day.date)}px`,
                    }"
              />

              <!-- hours grid -->
              <div
                class="border-muted-200 dark:border-muted-800 pointer-events-none grow border-t"
              >
                <div
                  v-for="i in settings.hourClose - settings?.hourOpen"
                  :key="i"
                  class="border-muted-200 dark:border-muted-800 relative border-b border-dashed"
                  :style="{
                        height: `${settings.hourHeight}px`,
                      }"
                >
                  <div
                    v-for="j in 4"
                    :key="j"
                    class="border-muted-400 dark:border-muted-700 relative z-50 w-2 border-b"
                    :style="{
                          height: `${settings.hourHeight / 4}px`,
                        }"
                  >
                    <div
                      v-for="k in 2"
                      :key="k"
                      class="border-muted-300 dark:border-muted-800 relative z-50 w-1 border-b"
                      :style="{
                            height: `${settings.hourHeight / 12}px`,
                          }"
                    />
                  </div>
                </div>
              </div>

              <!-- day events -->
              <template v-for="event in attributes" :key="event.key">
                <div
                  class="pointer-events-none absolute end-4 start-4 z-50 rounded-md outline-2 outline-offset-2"
                  :class="{
                        'outline-dashed':
                          event.customData.id === 'new' &&
                          event.customData.id === selectedEventId,
                        outline:
                          event.customData.id !== 'new' &&
                          event.customData.id === selectedEventId,
                        [categoryTheme[event.customData.category].outline]:
                          event.customData.id === selectedEventId,
                      }"
                  :style="{
                        top: `${dateToTop(
                          settings,
                          event.customData.startDate,
                          day.date,
                        )}px`,
                        height: `${
                          datesToHeight(
                            settings,
                            event.customData.startDate,
                            event.customData.endDate,
                            day.date,
                          ) + 4
                        }px`,
                      }"
                />

                <div
                  role="button"
                  tabindex="0"
                  class="bg-muted-50 dark:bg-muted-800 border-muted-200 dark:border-muted-700 absolute end-4 start-4 z-10 cursor-pointer overflow-hidden rounded-t-md border border-b-0 text-xs"
                  :class="{
                        'opacity-50': isPast(endOfDay(day.date)),
                        'pointer-events-none': isDragging,
                      }"
                  :style="{
                        top: `${dateToTop(
                          settings,
                          event.customData.startDate,
                          day.date,
                        )}px`,
                        height: `${datesToHeight(
                          settings,
                          event.customData.startDate,
                          event.customData.endDate,
                          day.date,
                        )}px`,
                      }"
                  @click.stop="() => onSelectEvent(event.customData)"
                >
                  <DemoCalendarEvent
                    :event="event"
                    @positiondrag="(e) => onPositionDragStart(event, e)"
                  />
                </div>
                <div
                  class="dark:border-muted-800 dark:bg-muted-700/50 dark:hover:bg-muted-700/80 absolute bottom-0 end-4 left-0 start-4 h-[4px] cursor-n-resize rounded-b-md border border-t-0 bg-slate-50 hover:bg-slate-200"
                  :style="{
                        top: `${
                          dateToTop(
                            settings,
                            event.customData.startDate,
                            day.date,
                          ) +
                          datesToHeight(
                            settings,
                            event.customData.startDate,
                            event.customData.endDate,
                            day.date,
                          )
                        }px`,
                      }"
                  :class="{
                        'pointer-events-none': isDragging,
                      }"
                  @pointerdown="(e) => onHeightDragStart(event, e)"
                />
              </template>
            </div>
          </template>

        </Calendar>
          </div>
      </BaseCard>
    </div>

</template>

<style scoped>

</style>
