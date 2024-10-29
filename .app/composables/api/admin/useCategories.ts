
export default class useCategoriess {
  public getAll = async () => {
    try {
      const { data } = await (
        await useApi()
      )({
        method: 'get',
        url: 'Categories/GetAll',
        params: {},
        data: {},
      })
      return { result: data }
    }
    catch (e) {
      console.log('data : ERROR')
      console.log('data :', e)
      return { result: false, message: 'خطا در نمایش کالکشن ها' }
    }
  }

  public create = async (Title: string, Description: string | undefined, Icon: string | undefined) => {
    try {
      const { data } = await (
        await useApi()
      )({
        method: 'post',
        url: 'Categories/Create',
        params: {},
        data: {
          Title,
          Description,
          Icon,
        },
      })
      console.log('cat data:', data)
      if (data.isSuccess) return { result: true, message: 'عملیات با موفقیت انجام شد', id: data.id }
      return { result: false, message: data.responseDescription }
    }
    catch (e) {
      console.log('data : ERROR')
      console.log('data :', e)
      return { result: false, message: 'خطا در ایجاد کالکشن ' }
    }
  }
}
