import type { FormFieldInfo } from '~/types/wizard'
import moment from 'moment-jalaali'

export const setToched = (field: FormFieldInfo) => {
  field.touched = true
}

export const checkValidation = (field: FormFieldInfo) => {
  let flag: any = false

  if (field.touched) {

    if (field.required && field.value?.toString().trim() == '') flag = field.errors.empty
    else if (field.value?.length > 0 && field.type === 'Number' && !parseInt(field.value)) flag = field.errors.type
    else if (field.value?.length > 0 && field.type === 'String' && !field.value.toString()) flag = field.errors.type
    else if (field.value?.length > 0 && (field.type === 'Password' || field.type === 'PasswordConfirmation') && !field.value.toString()) flag = field.errors.type
    else if (field.value?.length > 0 && field.regex && !field.regex?.test(field.value)) flag = field.errors.regex
    else if (field.value?.length > 0
      && ((field.min != null && field.value.length < field.min)
      || (field.max != null && field.value?.length > field.max))) flag = field.errors.len
    else if(field.value?.length > 0 && field.type === 'NationalId') {

      let allDigitEqual: string[] = ["0000000000","1111111111","2222222222","3333333333","4444444444","5555555555","6666666666","7777777777","8888888888","9999999999"];

      if(field.value && field.value.length != 10){
        flag = field.errors.len
      }

      if (allDigitEqual.includes(field.value)) {
        flag = field.errors.regex
      }

      if(field.value && field.value.length === 10){
      var chArray = field.value.split('');
              var num0 = (+chArray[0])*10;
              var num2 = (+chArray[1])*9;
              var num3 = (+chArray[2])*8;
              var num4 = (+chArray[3])*7;
              var num5 = (+chArray[4])*6;
              var num6 = (+chArray[5])*5;
              var num7 = (+chArray[6])*4;
              var num8 = (+chArray[7])*3;
              var num9 = (+chArray[8])*2;
              var a = +chArray[9];
              var b = (((((((num0 + num2) + num3) + num4) + num5) + num6) + num7) + num8) + num9;
              var c = b%11;

              if(!(((c < 2) && (a == c)) || ((c >= 2) && ((11 - c) == a)))){
                flag = field.errors.regex
              }
            }
    }
    field.isValid = !flag ? true : false
  }

  return flag
}
