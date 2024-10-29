export const toastDanger = (message: string) => {
  const toaster = useToaster()

  toaster.show({
    title: 'اخطار!',
    message,
    color: 'danger',
    icon: 'lucide:alert-triangle',
    closable: true,
  })
}

export const toastSuccess = (message: string) => {
  const toaster = useToaster()

  toaster.show({
    title: 'موفق',
    message,
    color: 'success',
    icon: 'lucide:check',
    closable: true,
  })
}
