import { handleApiCatch } from '~/utils/auth'

export default class useCategories {
  public getAll = async (PageNumber: number = 1, PageSize: number = 10, Search : string | null = null, SortBy: string = 'asc', Sort: string | null = null) => {
    try {
      const capAPI = useCapApi()
      const { data } = await (await capAPI.useAPI())({
        method: 'get',
        url: 'V1/Categories/admin',
        params: {
          PageNumber,
          PageSize,
          Search,
          SortBy,
          Sort
        },
        data: {},
      })
      return { result: data.data, pageNumber: data.pageNumber, pageSize: data.pageSize, totalCount: data.totalCount }
    }
    catch (e) {
      handleApiCatch(e);
      return { result: false, message: 'خطا در نمایش کالکشن ها' }
    }
  }

  public create = async (Title: string, Description: string | undefined, Icon: string | undefined, State: boolean = false, Order: number | null = null ) => {
    try {
      const capAPI = useCapApi()
      const { data } = await (await capAPI.useAPI())({
        method: 'post',
        url: 'V1/Categories',
        params: {},
        data: {
          Title,
          Description,
          Icon,
          State,
          Order
        },
      })
      console.log('cat data:', data)
      if (data.isSuccess) return { result: true, message: 'عملیات با موفقیت انجام شد', id: data.id }
      return { result: false, message: data.responseDescription }
    }
    catch (e) {
      handleApiCatch(e);
      return { result: false, message: 'خطا در ایجاد کالکشن ' }
    }
  }
}
