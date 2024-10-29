export type ValidationText =
  | 'این قسمت الزامی است.'
  | 'نوع فیلد اشتباه است '
  | undefined

export interface AdminWizardModel {
  isReal: boolean
  organizationName: string
  CEOName: string
  nationalId: string
  economicCode: string
  description: string
  typeId: number
  logo: string
  fax: string
  phone: string
  postalCode: string
  latitude: number
  longitude: number
  address: string
  email: string
  CEONationalCardFile: File | null
  foundedAdFile: File | null
  nationalCodePicFile: File | null
}

export type InputType =
  | 'String'
  | 'Number'
  | 'Bollean'
  | 'File'
  | 'Password'
  | 'Email'
  | 'PasswordConfirmation'
  | 'NationalId'
  | undefined

export interface FormFieldInfo {
  value: string
  title: string
  placeHolder: string
  required: boolean
  isValid: boolean
  touched: boolean
  min: number
  max: number
  regex: RegExp | null
  type: InputType
  errors: {
    regex: string
    len: string
    empty: string
    type: string
  }
}
