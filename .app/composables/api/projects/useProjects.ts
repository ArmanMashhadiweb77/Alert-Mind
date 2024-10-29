export default class UseProjects {


  public create = async (workSpaceRef: number, title: string, description: string) => {
    try {
      const capAPI = useCapApi();
      const {data} = await (
        await capAPI.useAPI()
      )({
        method: 'post',
        url: '/Project',
        params: {},
        data: {
          workSpaceRef,
          title,
          description
        },
      })
      return { result: true, message: 'عملیات با موفقیت انجام شد' }
      // return { result: false, message: data.responseDescription }
    }
    catch (e) {
      console.log('data : ERROR')
      console.log('data :', e)
      return { result: false, message: 'خطا در ایجاد کالکشن ' }
    }
  }

  public getAll = async (Search: string, Page: number, PageSize: number) => {
    try {
      const capAPI = useCapApi();
      const {data} = await (
        await capAPI.useAPI()
      )({
        method: 'get',
        url: '/Project',
        params: {
          Search,
          Page,
          PageSize,
        },
        data: {},
      })
      return { result: true, message: 'Success', data }
    } catch (e) {
      return { result: false, message: 'خطا در دریافت اطلاعات' }
    }
  }
  public getById = async (id: number) => {
    try {
      const capAPI = useCapApi();
      const {data} = await (
        await capAPI.useAPI()
      )({
        method: 'get',
        url: `/Project/${id}`,
        params: {
          id
        },
        data: {},
      })
      console.log({data})
      return {result: true, message: 'Success', data}
    } catch (e) {
      // if (e.response.status === 403) location.href = '/noAccess'
      // if (e.response.status === 401) {
      //   const capAuth = useCapAuth()
      //   await capAuth.logout()
      //   window.location.assign("https://sso.processingworld.com/logout");
      // }
      return {result: false, message: 'خطا در دریافت اطلاعات'}
    }
  }

}
