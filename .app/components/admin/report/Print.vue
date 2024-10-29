<script setup lang="ts">
import {IUserInfo} from "~/types/IUserInfo";
import UseUser from "~/composables/useUser";
import {convertToJalali} from "../../utils/timing";
const {t} = useI18n()


const props = defineProps(['report', 'isOpen', 'data', 'driver', 'line', 'daily', 'reportName', 'moreData']);
const emits = defineEmits(['close']);

const user = new UseUser()
const userInfo = ref<IUserInfo>({})

onMounted(async () => {
  userInfo.value = await user.user()
})

const heading = ref<any>([])

watch(
    () => props.isOpen,
    () => {
      if (props.report === 'traveledDistance') {
        let baseColumn = [
          {code: 'rowNum', title: 'ردیف', isSortable: false},
          {code: 'vehicle', title: 'خودرو', isSortable: false},
          {code: 'traveled', title: 'مسافت طی شده', isSortable: false},
        ]

        if (props.driver) {
          baseColumn.push({code: 'driver', title: 'راننده', isSortable: false})
        }
        if (props.line) {
          baseColumn.push({code: 'line', title: 'خط', isSortable: false})
        }
        if (props.daily) {
          baseColumn.push({code: 'daily', title: 'تاریخ', isSortable: false})
        }

        heading.value = [...baseColumn]
      }
      else if (props.report === 'events') {
        heading.value = [
          {code: 'rowNum', title: 'ردیف', isSortable: false},
          {code: 'vehicle', title: 'خودرو', isSortable: false},
          {code: 'event', title: 'رویداد', isSortable: false},
          {code: 'driver', title: 'راننده', isSortable: false},
          {code: 'date', title: 'تاریخ', isSortable: false},
        ]
      }
      else if (props.report === 'vehicleProfile') {
        heading.value = [
          {code: 'busNr', title: t('vehicleProfile.busNr'), isSortable: false},
          {code: 'sysVersion', title: t('vehicleProfile.sysVersion'), isSortable: false},
          {code: 'deviceNr', title: t('vehicleProfile.deviceNr'), isSortable: false},
          {code: 'deviceSnr', title: t('vehicleProfile.deviceSnr'), isSortable: false},
          {code: 'deviceType', title: t('vehicleProfile.deviceType'), isSortable: false},
          {code: 'sysCode', title: t('vehicleProfile.sysCode'), isSortable: false},
          {code: 'imei', title: t('vehicleProfile.imei'), isSortable: false},
          {code: 'siteCode', title: t('vehicleProfile.siteCode'), isSortable: false},
          {code: 'simType', title: t('vehicleProfile.simType'), isSortable: false},
          {code: 'simOperator', title: t('vehicleProfile.simOperator'), isSortable: false},
          {code: 'simCredit', title: t('vehicleProfile.simCredit'), isSortable: false},
          {code: 'offlineSaveSeconds', title: t('vehicleProfile.offlineSaveSeconds'), isSortable: false},
          {code: 'offlineSendSeconds', title: t('vehicleProfile.offlineSendSeconds'), isSortable: false},
          {code: 'offlineMaxDegrees', title: t('vehicleProfile.offlineMaxDegrees'), isSortable: false},
          {code: 'offlineMaxMeters', title: t('vehicleProfile.offlineMaxMeters'), isSortable: false},
          {code: 'accStatus', title: t('vehicleProfile.accStatus'), isSortable: false},
          {code: 'carType', title: t('vehicleProfile.carType'), isSortable: false},
          {code: 'batteryPercentage', title: t('vehicleProfile.batteryPercentage'), isSortable: false},
          {code: 'inEmergencyMode', title: t('vehicleProfile.inEmergencyMode'), isSortable: false},
          {code: 'minsOfEmergency', title: t('vehicleProfile.minsOfEmergency'), isSortable: false},
          {code: 'isAfcValid', title: t('vehicleProfile.isAfcValid'), isSortable: false},
          {code: 'afcDeviceSnr', title: t('vehicleProfile.afcDeviceSnr'), isSortable: false},
          {code: 'deviceDateTime', title: t('vehicleProfile.deviceDateTime'), isSortable: false},
          {code: 'simCardNumber', title: t('vehicleProfile.simCardNumber'), isSortable: false},
        ]
      }
    }
)

//
const print = () => {
  // Get the HTML content of the ReportTable
  var reportTableContent = document.querySelector('.print-modal .print-report').outerHTML
  //
  // // Open a new window and set its location to the desired URL
  var printWindow = window.open('http://localhost:3000/report/print', '_blank')
  //
  // // Write the content to the new window
  printWindow.document.write('<html><head><title>Print Report</title>')
  printWindow.document.write('<link rel="stylesheet" type="text/css" href="/css/font.css">')
  //
  // // Include CSS for styling (replace 'Estedad_FD_Medium' with the desired font name)
  printWindow.document.write('<style>')
  printWindow.document.write(`
    @page {
      size: ${props.report === 'vehicleProfile' ? 'landscape' : 'portrait'}; /* Set the page orientation based on the condition */
    }

    .report-table {
      width: 99%;
      margin: 0 auto;
    }
    .table-fixed {
      font-family: "Estedad_FD_Medium", sans-serif;
      border-spacing: 8px; /* Adjust the spacing between cells */
      direction: rtl;
      width: 100%;
      border: 1px solid #000;
      border-collapse: collapse
    }
    .table-fixed th {
      font-weight: 100;
      font-size: 0.7rem;
      border: 1px solid #000;
    }
    .table-fixed td {
      text-align: center; /* Center the content within each cell */
      direction: rtl;
      font-size: 0.8rem;
      border: 1px solid #000;
    }

    .print-header > div {
      direction: rtl;
      display: grid;
      grid-template-columns: auto auto auto;
      width: 90%;
      margin: 0 auto 30px;
    }

    .print-header > div > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .print-header .logo {
      justify-content: flex-start;
    }

    .print-header .logo img {
      width: 120px;
    }

    .print-header .report-name {
      text-align: center;
      font-size: 1.5rem;
    }

    .print-header .user-date {
      flex-direction: column;
      align-items: flex-end;
    }

    .print-header .user-date p {
      margin: 0.3rem 0;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    .more-data {
      direction: rtl;
      display: grid;
      grid-template-columns: auto auto auto;
      grid-gap: 8px;
      margin: 0 auto 30px;
    }

     /* Prevent page breaks inside specific elements */
    .prevent-break {
      page-break-inside: avoid;
    }

    /* Force page break before specific elements */
    .force-break {
      page-break-before: always;
    }
  `);

  // // Add more styles if needed
  printWindow.document.write('</style>')
  //
  printWindow.document.write('</head><body>')
  printWindow.document.write(reportTableContent)
  printWindow.document.write('</body></html>')
  //
  // // Close the document stream
  printWindow.document.close()
  //
  // // Trigger the print function
  printWindow.print()
}

const close = () => {
  emits("close")
}

const setColor = (title: string) => {
  if (props.report === 'events') {
    if (title.startsWith("ناوگان")) {
      return 'danger'
    } else if (title.startsWith("رویداد")) {
      return 'success'
    } else {
      return 'info'
    }
  } else if (props.report === 'traveledDistance') {
      return 'info'
  }
}
</script>

<template>
  <TairoModal :open="props.isOpen" size="3xl" :classes="{
    wrapper: 'print-modal'
  }">
    <template #header>
      <!-- Header -->
      <div class="flex w-full items-center justify-between p-4 md:px-6">
        <h3 class="font-heading text-muted-900 text-lg font-medium leading-6 dark:text-white">چاپ گزارش</h3>

        <BaseButtonClose @click="close"/>
      </div>
    </template>
    <!-- Body -->
    <div class="p-4 md:px-6 h-[400px] overflow-auto print-report" id="print-report">

      <div class="text-center report-table w-11/12 mx-auto" id="report-table">
        <div class="print-header mb-5 w-12/12 mx-auto">
          <div class="grid grid-cols-3">
            <div class="col-span-1 flex justify-start items-center logo">
              <img class="w-[120px]" src="https://avl.processingworld.com/_nuxt/favicon.94b26826.png" alt="">
            </div>
            <div class="col-span-1 flex justify-center items-center report-name text-center text-lg">
              {{ props.reportName }}
            </div>
            <div class="col-span-1 flex justify-center items-end flex-col user-date text-sm">
              <p style="direction: rtl">
              <span class="property">
                کاربر:
              </span>
                <span class="value font-thin">
                {{ userInfo.firstName }} {{ userInfo.lastName }}
              </span>
              </p>
              <p style="direction: rtl">
              <span class="property">
                تاریخ:
              </span>
                <span class="value font-thin">
                 {{ convertToJalali(new Date()) }}
              </span>
              </p>
            </div>
          </div>
        </div>
        <div class="more-data grid grid-cols-4 text-right mb-5 gap-3 w-12/12 mx-auto">
          <BaseTag
              v-for="(data, i) in props.moreData"
              :key="i"
              rounded="md"
              variant="pastel"
              :color="setColor(data)"
              class="col-span-1"
          >
            {{ data }}
          </BaseTag>
        </div>

        <ReportTable v-if="props.report === 'events'" :heading="heading">
          <TairoTableRow v-for="(item, i) in props.data" :key="`record_${i}`">
            <TairoTableCell class="text-center" light spaced> {{ item.rowNum }}</TairoTableCell>
            <TairoTableCell class="text-center" light spaced> {{ item.vehicle }}</TairoTableCell>
            <TairoTableCell class="text-center" light spaced>
              {{ $t(`eventCode.${item.event}`) }}
            </TairoTableCell
            >
            <TairoTableCell class="text-center" light spaced> {{ item.driver }}</TairoTableCell>
            <TairoTableCell class="text-center" light spaced> {{ item.date }}</TairoTableCell>
          </TairoTableRow>
        </ReportTable>

        <ReportTable v-if="props.report === 'traveledDistance'" :heading="heading">
          <TairoTableRow v-for="(item, i) in props.data" :key="`record_${i}`">
            <TairoTableCell class="text-center" light> {{ item.rowNum }}</TairoTableCell>
            <TairoTableCell class="text-center" light> {{ item.vehicle }}</TairoTableCell>
            <TairoTableCell class="text-center" light> {{ item.traveled }}</TairoTableCell>
            <TairoTableCell v-if="item.driver" class="text-center" light>{{ item.driver }}</TairoTableCell>
            <TairoTableCell v-if="item.lineId" class="text-center" light>{{ item.lineId }}</TairoTableCell>
            <TairoTableCell v-if="item.date" class="text-center" light>{{ item.date }}</TairoTableCell>
          </TairoTableRow>
        </ReportTable>

        <ReportTable v-if="props.report === 'vehicleProfile'" :heading="heading">
          <TairoTableRow v-for="(item, i) in props.data" :key="`record_${i}`">
              <TairoTableCell class="text-center" light> {{ item.busNr }}</TairoTableCell>
              <TairoTableCell class="text-center" light> {{ item.sysVersion }}</TairoTableCell>
              <TairoTableCell class="text-center" light> {{ item.deviceNr }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.deviceSnr }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.deviceType }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.sysCode }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.imei }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.siteCode }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.simType }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.simOperator }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.simCredit }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.offlineSaveSeconds }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.offlineSendSeconds }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.offlineMaxDegrees }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.offlineMaxMeters }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.accStatus }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.carType }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.batteryPercentage }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.inEmergencyMode }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.minsOfEmergency }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.isAfcValid }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.afcDeviceSnr }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.deviceDateTime }}</TairoTableCell>
              <TairoTableCell class="text-center" light>{{ item.simCardNumber }}</TairoTableCell>
            </TairoTableRow>
        </ReportTable>

      </div>
    </div>

    <template #footer>
      <!-- Footer -->
      <div class="p-4 md:px-6">
        <div class="flex gap-x-2">
          <BaseButton @click="close"> بستن</BaseButton>

          <BaseButton @click="print" color="primary" variant="solid"> انجام</BaseButton>
        </div>
      </div>
    </template>
  </TairoModal>
</template>

<style scoped></style>
