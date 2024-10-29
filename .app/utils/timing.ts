import moment from 'moment-jalaali'

export const convertToJalali = (dt: string) => {
    let date = moment(dt)
    return date.format('HH:mm:ss jYYYY/jMM/jDD')
}

export const convertToJalaliRTL = (dt: string) => {
    let date = moment(dt)
    return date.format('jYYYY-jMM-jDD HH:mm')
}

export const convertToJalaliLTR = (dt: string) => {
    let date = moment(dt)
    return date.format('HH:mm jYYYY/jMM/jDD')
}

export const convertToJalaliDATE = (dt: string) => {
    let date = moment(dt)
    return date.format('jYYYY/jMM/jDD')
}
export const georgian_D_T_RTL = (dt: string) => {
    let date = moment(dt)
    return date.format('YYYY/MM/DD HH:mm')
}
export const georgian_D_T_LTR = (dt: string) => {
    let date = moment(dt)
    return date.format('HH:mm YYYY/MM/DD')
}
export const georgian_D = (dt: string) => {
    let date = moment(dt)
    return date.format('YYYY/MM/DD')
}

const convertToUTCWithOffset = (dateString: string, hoursOffset = 3, minutesOffset = 30) => {
    const date = new Date(dateString)
    // Add the offset
    date.setHours(date.getHours() + hoursOffset)
    date.setMinutes(date.getMinutes() + minutesOffset)

    // Convert to ISOString
    return date.toISOString()
}

export const getCurrentHour = () => {
    const currentDate = new Date()
    const formatDigit = (digit: number) => (digit < 10 ? '0' + digit : digit)

    const hour = formatDigit(currentDate.getHours())
    const minute = formatDigit(currentDate.getMinutes())
    const second = formatDigit(currentDate.getSeconds())

    return `${hour}:${minute}:${second}`
}



