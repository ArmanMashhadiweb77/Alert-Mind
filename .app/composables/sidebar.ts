// import {permissionSTORE} from "~/stores/permission";

/**
 * Composable to manage navigation of the sidebar layout
 *
 * You can define sidebar items in your app.config.ts
 *
 * ```ts
 * export default defineAppConfig({
 *   tairo: {
 *     sidebar: {
 *       items: {
 *           name: 'Dashboards',
 *
 *           // You can define an active path to highlight the item
 *           activePath: '/dashboards',
 *
 *           // You can define an icon to display in the sidebar
 *           icon: { name: 'ph:sidebar-duotone', class: 'w-5 h-5' },
 *
 *           // Or use a component
 *           // It should be registered in the app as a global component (in components/global)
 *           component: { name: 'AppThemeToggle', props: {} },
 *
 *           // You can chose to display a subsidebar by defining a component name
 *           // It should be registered in the app as a global component
 *           subsidebar: { name: 'SidebarMenuDashboards', props: {} },
 *
 *           // Or you can define a route to navigate to
 *           to: '/dashboards',
 *
 *           // Or you can define a click handler (eg. to open a panel)
 *           click: () => {
 *             const { open } = usePanels()
 *             open('panel-name')
 *           },
 *         },
 *       ],
 *     },
 *   },
 * })
 * ```
 */
export function useSidebar() {
  // const permissionStore = permissionSTORE()

  const { xs } = useTailwindBreakpoints()
  const { xl } = useTailwindBreakpoints()

  // const permissions = ref<string[]>(permissionStore.getValues.permissions)
  const app = navbarGuard(useAppConfig())

  const route = useRoute()

  const sidebars = computed(() => {
    if (
      app.tairo.sidebar?.navigation?.enabled === false
      || app.tairo.sidebar?.navigation?.items?.length === 0
    ) {
      return []
    }
    return app.tairo.sidebar?.navigation?.items
  })

  const currentName = useState('sidebar-name', () => '')
  const isOpen = useState<boolean | undefined>('sidebar-open', () => undefined)

  const hasSubsidebar = computed(() => {
    return (
      (sidebars.value?.some((sidebar: any) => sidebar.subsidebar?.component)
      && current.value
      && current.value.id !== 'Dashboard')
      || (sidebars.value?.some((sidebar: any) => sidebar.subsidebar?.component) && xs.value)
    )
  })

  const current = computed(() => {
    if (!currentName.value) {
      return undefined
    }
    return sidebars.value?.find(({ title }) => title === currentName.value)
  })

  function toggle() {
    // If no sidebar item is selected, open the first one
    if (!currentName.value && !isOpen.value) {
      if (!sidebars.value?.[0]?.title) {
        // No sidebar items defined
        return
      }

      // Select the first sidebar item by default
      currentName.value = sidebars.value[0].title
    }

    isOpen.value = !isOpen.value
  }

  function close(unselect = false) {
    isOpen.value = false
    if (unselect) {
      currentName.value = ''
    }
  }

  function open(name: string) {
    currentName.value = name
    isOpen.value = true
  }

  function detect() {
    if (!app.tairo.sidebar?.navigation?.startOpen) {
      isOpen.value = false
      return
    }

    const item = sidebars.value?.find(
      (bar: any) => bar?.activePath && route.fullPath.startsWith(bar.activePath),
    )
    if (item) {
      currentName.value = item.title
      if (!process.client) {
        isOpen.value = Boolean(currentName.value)
      }
      else {
        const isXl = useTailwindBreakpoints().xl.value
        isOpen.value = Boolean(currentName.value) && isXl
      }
    }
    return
  }

  function setup() {
    // Detect sidebar item on server page load
    if (!process.client) {
      detect()
      return
    }

    // Detect sidebar item on client page change
    // page:finish allow to wait for the page to be fully loaded before detecting the sidebar item
    const nuxtApp = useNuxtApp()
    const removeHook = nuxtApp.hook('page:finish', (e) => {
      detect()
      removeHook()
      return
    })

    // register a watcher to close sidebar when screen become extra large
    const { xl } = useTailwindBreakpoints()

    // close sidebar when screen become extra large
    watch(xl, (isXl) => {
      if (!isXl) {
        isOpen.value = false
      }
    })

    // register a watcher to open sidebar when a sidebar item is selected
    watch(
      () => currentName,
      (value) => {
        if (value) {
          // only open sidebar if it's not already open
          // and the screen is not extra large
          if (xl.value) {
            isOpen.value = true
          }
        }
        else {
          isOpen.value = false
        }
      },
    )
  }

  function navbarGuard(appConfig: any) {
    const tempAppConfig = reactive(appConfig)

    // console.log(tempAppConfig.tairo.sidebar.navigation.items)

    //
    // tempAppConfig.tairo.sidebar.navigation.items.forEach((item: any, index: number) => {
    //
    //   if (item.permission !== 'none' && Array.isArray(item.permission)) {
    //     let count = 0; // removed type annotation for count variable
    //     item.permission.forEach((perm: string) => { // removed type annotation for perm parameter
    //       if (permissions.value.includes(perm)) ++count;
    //     });
    //     if (count === 0) {
    //       tempAppConfig.tairo.sidebar.navigation.items.splice(index, 1);
    //     } else {
    //       if (item.subsidebar && item.subsidebar.props && item.subsidebar.props.navigation) {
    //         item.subsidebar.props.navigation.forEach((subItem: any, subIndex: number) => { // removed type
    //           // annotation for
    //           // subItem and subIndex parameters
    //
    //           let subCount: number = 0
    //           subItem.permission.forEach((perm: string) => { // removed type annotation for perm parameter
    //             if (permissions.value.includes(perm)) ++subCount;
    //
    //           });
    //           if (subCount === 0) {
    //             item.subsidebar.props.navigation.splice(subIndex, 1);
    //           } else {
    //             subItem.children.forEach((child: any, childIndex: number) => { // removed type annotation for
    //               // child and childIndex parameters
    //               if (!permissions.value.includes(child.permission) && child.permission !== 'none') {
    //                 subItem.children.splice(childIndex, 1);
    //               }
    //             }); // added missing closing parenthesis for forEach loop
    //           }
    //         }); // added missing closing parenthesis for forEach loop
    //       }
    //     }
    //   }
    //
    // })

    // tempAppConfig.tairo.sidebar.navigation.items = tempAppConfig.tairo.sidebar.navigation.items.filter((item: any) => {
    //   if (permissions.value.includes("SuperAdmin")) {
    //     return true; // If SuperAdmin exists, don't filter anything
    //   }
    //   if (item.permission !== 'none' && Array.isArray(item.permission)) {
    //     let count = item.permission.reduce((acc: number, perm: string) => {
    //       return acc + (permissions.value.includes(perm) ? 1 : 0);
    //     }, 0);

    //     if (count === 0) {
    //       return false;
    //     } else {
    //       if (item.subsidebar && item.subsidebar.props && item.subsidebar.props.navigation) {
    //         item.subsidebar.props.navigation.forEach((subItem: any) => {
    //           let subCount: number = subItem.permission.reduce((acc: number, perm: string) => {
    //             return acc + (permissions.value.includes(perm) ? 1 : 0);
    //           }, 0);

    //           if (subCount === 0) {
    //             item.subsidebar.props.navigation = item.subsidebar.props.navigation.filter((sItem: any) => sItem !== subItem);
    //           } else {
    //             subItem.children = subItem.children.filter((child: any) => {
    //               return permissions.value.includes(child.permission) || child.permission === 'none';
    //             });
    //           }
    //         });
    //       }
    //     }
    //   }
    //   return true;
    // });

    tempAppConfig.toaster.theme.maxToasts = 2
    tempAppConfig.toaster.duration = 3000

    return tempAppConfig
  }

  return {
    sidebars,
    hasSubsidebar,
    current,
    currentName,
    isOpen,
    toggle,
    close,
    open,
    detect,
    setup,
  }
}
