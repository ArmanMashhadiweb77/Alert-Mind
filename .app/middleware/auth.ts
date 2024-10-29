import {jwtDecode, type JwtPayload} from "jwt-decode";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxt = useNuxtApp()
  const routeName = await to.name!.split("_")[0]

  // const AccessToken = await db_config.get("Access-Token", true)
  const AccessToken = await IndexDBGet('config', 'Access-Token')
  // const userInfo = await db_config.get("UserInfo", false)
  const userInfo = await IndexDBGet('config', 'UserInfo')

  if (!AccessToken || !userInfo) {
    // @ts-ignore
    return navigateTo(`/`)
  }

  const JWT: any = jwtDecode<JwtPayload>(AccessToken);
  if (!JWT || (new Date().getTime() / 1000) > JWT.exp) {
    return navigateTo("/");
  }

  // ---------------- PERMISSIONS ------------------- //
  // const permissionStore = permissionSTORE()
  // if (permissionStore.getValues.permissions.length == 0)
  //     permissionStore.addPermissions(userInfo.permissions)
  //
  // if (routeName === 'vehicle-vehicle' && !checkUserPermission(['VehicleView'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'vehicle-category' && !checkUserPermission(['VehicleCategoryView'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'vehicle-model' && !checkUserPermission(['VehicleModelView'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'HResource-driver' && !checkUserPermission(['UserDriverView'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'HResource-role-role' && !checkUserPermission(['UserRolePermissionView'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'HResource-employee' && !checkUserPermission(['UserEmpView'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  // } else if (routeName === 'basic-device-device' && !checkUserPermission(['VehicleDeviceView'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'basic-area' && !checkUserPermission(['BaseAreaView'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'basic-corridor' && !checkUserPermission(['BaseCorridorView'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'basic-locationType' && !checkUserPermission(['BaseGeoTypeView'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'basic-location' && !checkUserPermission(['BaseGeoView'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'basic-line' && !checkUserPermission(['BaseLineView'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'basic-station' && !checkUserPermission(['BaseStationView'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'basic-organ' && !checkUserPermission(['BaseOrganView'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'reports-vehicles-events' && !checkUserPermission(['ReportVehicleEvents'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'reports-vehicles-speed' && !checkUserPermission(['ReportVehicleSpeed'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'reports-vehicles-traveled-distance' && !checkUserPermission(['ReportVehicleTraveledDistance'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'reports-vehicles-crossStation' && !checkUserPermission(['ReportVehicleCrossStation'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'reports-vehicles-vehicleProfile' && !checkUserPermission(['ReportVehicleProfile'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'reports-vehicles-setting' && !checkUserPermission(['ReportVehicleSetting'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'schematic' && !checkUserPermission(['MonitorMap'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'tracking' && !checkUserPermission(['MonitorLine'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  //
  // } else if (routeName === 'developer' && !checkUserPermission(['ThirdPartyServiceAccess'])) {
  //     return navigateTo(nuxt.$localePath(`NoAccess`))
  // }
})
