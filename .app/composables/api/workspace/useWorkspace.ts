
export default class UseWorkspace {


  public create = async (parentRef: number, title: string) => {
    try {
      const capAPI = useCapApi();
      const {data} = await (
        await capAPI.useAPI()
      )({
        method: 'post',
        url: '/WorkSpace',
        params: {},
        data: {
          parentRef,
          title
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
        url: '/WorkSpace',
        params: {
          Search,
          Page,
          PageSize,
        },
        data: {},
      })
      console.log(data)
      return { result: true, message: 'Success', data }
    } catch (e) {
      return { result: false, message: 'خطا در دریافت اطلاعات' }
    }
  }
}
