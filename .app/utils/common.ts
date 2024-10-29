export const statusColor = (itemStatus: any) => {
    if (itemStatus === 1) return 'success'
    if (itemStatus === 2) return 'primary'
    if (itemStatus === 3) return 'info'
    if (itemStatus === 4) return 'danger'
    if (itemStatus === 5) return 'warning'
    else return 'danger'
  }

  export const statusText = (itemStatus: any) => {
    if (itemStatus === 1) return 'تایید شده'
    if (itemStatus === 2) return 'غیرفعال تایید شده'
    if (itemStatus === 3) return 'درحال بررسی'
    if (itemStatus === 4) return 'حذف شده'
    if (itemStatus === 5) return 'معلق'
    else return 'حذف شده'
  }