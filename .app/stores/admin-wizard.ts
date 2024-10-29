import { defineStore } from 'pinia'

export const useWizardStore = defineStore('wizard', {
  state: () => ({
    loading: false,
    // complete: false,
    step: 1,
    steps: [
      { id: 1, name: 'نوع شخص', title: 'تعیین نوع شخصیت کسب و کار', subtitle: 'نوع شخصیت مالک کسب و کار را مشخص نمایید.' },
      { id: 2, name: 'اطلاعات عمومی', title: 'اطلاعات عمومی کسب و کار شما', subtitle: 'لطفا در تکمیل این بخش دقت لازم را داشته باشید ، مقدار ثبت شده برای شناسه ملی قابل تغییر نمی باشد.' },
      { id: 3, name: 'اطلاعات تماس و آدرس', title: 'اطلاعات عمومی کسب و کار شما', subtitle: 'لطفا اطلاعات تماس و محل استقرار کسب و کار خود را با دقت تکمیل کنید.' },
      { id: 4, name: 'مدارک و مستندات', title: 'مدارک و مستندات', subtitle: 'مدارک و مستندات خود را اینجا بارگذاری کنید.' },
      { id: 5, name: 'اطلاعات حساب بانکی', title: 'اطلاعات حساب های بانکی', subtitle: 'در این قسمت اطلاعات حساب های بانکی برای واریز مبلغ های خریداری شده را وارد کنید. ' },
      { id: 6, name: 'پیش نمایش ثبت نام', title: 'پیش نمایش نهایی اطلاعات', subtitle: 'کاربر گرامی لطفا از صحت اطلاعات وارد شده اطمینان حاصل کنید ، در صورت نیاز می توانید به مراحل قبل بازگشته و اصلاحات را انجام دهید.' },
    ],
    wizardModel: {
      isCompany: undefined,
      organizationName: '',
      userName: '',
      password: '',
      passwordConfirmation: '',
      CEOName: '',
      nationalId: '',
      // economicCode: '',
      description: '',
      type: { Id: 1, name: 'خدمات دهنده' },
      logo: '',
      fax: '',
      phone: '',
      postalCode: '',
      location: { lat: null, lng: null },
      address: '',
      email: '',
      logoFile: null,
      CEONationalCardFile: null,
      foundedAdFile: null,
      nationalCodePicFile: null,
      perOrNgo: { Id: 0, name: '' },
      organizationAccounts: [],
      isShowInBankDisk: false,
      birthDate :''
    },
  }),
  getters: {
    getSteps: state => state.steps,
    getCurrentStep: state => state.step,
    getCurrentStepInfo: state => state.steps.find(stp => stp.id == state.step),
  },
  actions: {
    goToStep(step: number) {
      if (this.wizardModel.isCompany != undefined)
        this.step = step
      else
        toastDanger('لطفا نوع کاربری را مشخص کنید!')
    },
    goToNextStep() {
      this.step++
    },
    goToPrevStep() {
      this.step--
    },
    resetStore() {
      this.step = 1
      this.loading = false
      this.wizardModel = {
        isCompany: undefined,
        organizationName: '',
        userName: '',
        password: '',
        passwordConfirmation: '',
        CEOName: '',
        nationalId: '',
        // economicCode: '',
        description: '',
        type: { Id: 0, name: '' },
        logo: '',
        fax: '',
        phone: '',
        postalCode: '',
        location: { lat: null, lng: null },
        address: '',
        email: '',
        logoFile: null,
        CEONationalCardFile: null,
        foundedAdFile: null,
        nationalCodePicFile: null,
        perOrNgo: { Id: 0, name: '' },
        organizationAccounts: [],
        isShowInBankDisk: false,
        birthDate: ''
      }
    },
  },
})
