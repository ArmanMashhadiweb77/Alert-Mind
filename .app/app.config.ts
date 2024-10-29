/**
 * This file is used to configure the app
 *
 * If you have the "Cannot find name 'defineAppConfig'.ts(2304)" error
 * update the root tsconfig.json file to include the following:
 *
 *  "extends": "./.app/.nuxt/tsconfig.json"
 *
 */

export  default defineAppConfig({
  ssr: false,
  tairo: {
    title: 'ذهن هوشیار',
    sidebar: {
      toolbar: {
        showNavBurger: true,
        enabled: true,
        tools: [
          {
            component: 'ToolbarToggle',
            props: {
              disableTransitions: false,
            },
          },
          {
            component: 'DemoToolbarLanguage',
          },
          {
            component: 'ToolbarNotifications',
          },
          {
            component: 'ToolbarAccountMenu',
          },
        ],
      },
      navigation: {
        logo: {
          component: 'TairoLogo',
          props: { class: 'text-primary-600 h-10' },
        },
        items: [
          {
            title: 'داشبورد',
            icon: { name: 'tdesign:houses', class: 'w-5 h-5' },
            to:'/admin/dashbord',
            // subsidebar: {
            //   component: 'DemoSubsidebarDashboards',
            //   props: {
            //     navigation: [
            //       {
            //         name: 'داشبورد',
            //         activePath: '/admin',
            //         to: '/admin',
            //         // permission: ['MonitorLine', 'MonitorMap'],
            //         // children: [
            //         //   {
            //         //     name: 'نقشه آنلاین',
            //         //     icon: 'ph:circles-four-bold',
            //         //     to: '/tracking',
            //         //     permission: 'MonitorLine',
            //         //     exact: false,
            //         //   },
            //         //   {
            //         //     name: 'شماتیک',
            //         //     icon: 'ph:car-duotone',
            //         //     to: '/schematic',
            //         //     permission: 'MonitorMap',
            //         //     exact: true,
            //         //   },
            //         // ],
            //       },
            //     ],
            //   },
            // },
            // activePath: '/admin',
            // to: '/admin',
          },
          {
            id: 'home',
            title: 'پروژه ها',
            icon: { name: 'tdesign:logo-codesandbox', class: 'w-5 h-5' },
            to:'/admin/projects',
          // subsidebar:{
          //     component:"DemoSubsidebarDashboards",
          //   to:"/admin",
          //   activePath: '/admin',
          // }
          },
          {
            id: 'home',
            title: 'درخواست جدید',
            icon: { name: 'tdesign:collection', class: 'w-5 h-5' },
            to: '/admin/dashbord/doctor',
            permission: 'Admin',
          },
          {
            id: 'home',
            title: 'تیم ها',
            icon: { name: 'mynaui:users-group', class: 'w-5 h-5' },
            to: '/admin/teams',
            permission: 'Admin',
          },
          {
            id: 'home',
            title: 'هوشیار پلاس',
            icon: { name: 'tdesign:rocket', class: 'w-5 h-5' },
            to: '/admin/organizations',
            permission: 'Admin',
          },
          {
            title: 'افزونه ها',
            icon: { name: 'tdesign:shop-5', class: 'w-5 h-5' },
            subsidebar: {
              component: 'DemoSubsidebarDashboards',
              props: {
                navigation: [
                  {
                    name: 'کار کرد کارمندان',
                    // permission: ['MonitorLine', 'MonitorMap'],
                    icon: 'tdesign:usergroup-add',
                    // to: '/admin/organizations',
                    exact: false,
                    children: [
                      {
                        name: 'جلسه',
                        icon: 'tdesign:logo-wechat-stroke',
                        to: '/admin/organizations',
                        // permission: 'MonitorLine',
                        exact: false,
                      },
                      {
                        name: 'صورت جلسه',
                        icon: 'tdesign:fact-check',
                        to: '/admin/locations',
                        // permission: 'MonitorMap',
                        exact: true,
                      },
                      {
                        name: 'دانشنامه',
                        icon: 'tdesign:article',
                        to: '/admin/products',
                        // permission: 'MonitorMap',
                        exact: true,
                      },
                      {
                        name: 'حضور و غیاب',
                        icon: 'tdesign:gesture-up',
                        to: '/admin/products',
                        // permission: 'MonitorMap',
                        exact: true,
                      },
                    ],
                  },
                ],
              },
            },
            // subsidebar: { component: 'DemoSubsidebarLayouts' },
          },
          {
            title: 'تقویم',
            icon: { name: 'iconoir:calendar', class: 'w-5 h-5' },
            to:"/admin/aboutus/box",
            // permission: [],
            subsidebar: {
              component: 'DemoSubsidebarDashboards',
              props: {
                navigation: [
                  {
                    name: 'پیام ها',
                    // permission: ['ReportVehicleEvents', 'ReportVehicleSpeed', 'ReportVehicleTraveledDistance', 'ReportVehicleCrossStation', 'ReportVehicleProfile', 'none', 'none'],
                    children: [
                      {
                        name: 'نظرات',
                        icon: 'heroicons:chat-bubble-left-ellipsis',
                        to: '/admin/customers/comments',
                        // permission: 'ReportVehicleEvents',
                        exact: true,
                      },
                    ],
                  }
                ],
              },
            },
          },
          {
            title: 'درباره ما',
            icon: { name: 'heroicons:document-text', class: 'w-5 h-5' },
            to:"/admin/aboutus",
            // permission: [],
            subsidebar: {
              component: 'DemoSubsidebarDashboards',
              props: {
                navigation: [
                  {
                    name: 'گزارش ها',
                    // permission: ['ReportVehicleEvents', 'ReportVehicleSpeed', 'ReportVehicleTraveledDistance', 'ReportVehicleCrossStation', 'ReportVehicleProfile', 'none', 'none'],
                    children: [
                      {
                        name: 'فروش بلیت',
                        icon: 'mdi:calendar-multiple',
                        to: '/admin/reports/location/ticket',
                        // permission: 'ReportVehicleEvents',
                        exact: true,
                      },
                    ],
                  }
                ],
              },
            },
          },
          // {
          //   title: 'مکان ها',
          //   icon: { name: 'heroicons:map-pin-solid', class: 'w-5 h-5' },
          //   // to: '/admin/locations',
          //   subsidebar: {
          //     component: 'DemoSubsidebarDashboards',
          //     props: {
          //       navigation: [
          //         {
          //           name: 'سازمان ها',
          //           // permission: ['MonitorLine', 'MonitorMap'],
          //           icon: 'ph:circles-four-bold',
          //           to: '/admin/locations',
          //           exact: false,
          //           // children: [
          //           //   {
          //           //     name: 'نقشه آنلاین من',
          //           //     icon: 'ph:circles-four-bold',
          //           //     to: '/tracking',
          //           //     permission: 'MonitorLine',
          //           //     exact: false,
          //           //   },
          //           //   {
          //           //     name: 'شماتیک',
          //           //     icon: 'ph:car-duotone',
          //           //     to: '/schematic',
          //           //     permission: 'MonitorMap',
          //           //     exact: true,
          //           //   },
          //           // ],
          //         },
          //       ],
          //     },
          //   },
          // },
          // {
          //   title: 'Customize',
          //   icon: { name: 'ph:drop-half-bottom-duotone', class: 'w-5 h-5' },
          //   click: () => {
          //     const isOpen = useState('switcher-open', () => false)
          //     isOpen.value = true
          //   },
          //   position: 'end',
          // },
          // {
          //   title: 'Search',
          //   icon: { name: 'ph:magnifying-glass-duotone', class: 'w-5 h-5' },
          //   click: () => {
          //     const isOpen = useState('search-open', () => false)
          //     isOpen.value = true
          //   },
          //   position: 'end',
          // },
          // ورژن
          {
            id: 'Abouts',
            title: 'نسخه : 0.2',
            icon: { name: 'carbon:information', class: 'w-6 h-6' },
            to: 'https://wiki.betezadi.ir/b/2336?chapter=3325&page=3596',
            permission: 'none',
            position: 'end'
          },
          // {
          //   title: 'My Account',
          //   component: 'DemoAccountMenu',
          //   position: 'end',
          // },
        ],
      },

    },
    error: {
      logo: {
        component: 'TairoLogo',
        props: {
          class: 'text-primary-500 mx-auto h-40 p-6',
        },
      },
    },
    // panels: [
    //   {
    //     name: 'language',
    //     position: 'right',
    //     component: 'DemoPanelLanguage',
    //   },
    //   {
    //     name: 'activity',
    //     position: 'right',
    //     component: 'DemoPanelActivity',
    //   },
    //   {
    //     name: 'search',
    //     position: 'left',
    //     component: 'DemoPanelSearch',
    //   },
    //   {
    //     name: 'task',
    //     position: 'right',
    //     component: 'DemoPanelTask',
    //   },
    // ],

  },
})
