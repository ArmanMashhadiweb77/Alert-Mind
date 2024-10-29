import { jwtDecode, type JwtPayload } from 'jwt-decode'
import DBConfig from '~/server/db/DB.Config'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxt = useNuxtApp()

  // const AccessToken = await db_config.get("Access-Token", true)
  const AccessToken = await IndexDBGet('config', 'Access-Token')
  // const userInfo = await db_config.get("UserInfo", false)
  const userInfo = await IndexDBGet('config', 'UserInfo')
  // AccessToken !== undefined && userInfo !== undefined && AccessToken !== null && userInfo !== null
  if (AccessToken && userInfo) {
    // if (!AccessToken && !userInfo) {}
    const JWT: any = jwtDecode<JwtPayload>(AccessToken ? AccessToken : '')
    if (JWT) {
      const now = new Date().getTime() / 1000
      if (now < JWT.exp) {
        // @ts-ignore
        // return navigateTo(`/`)
        console.log("you re login")
      }
    }
  }
})
