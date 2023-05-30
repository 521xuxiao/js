import enquireJs from 'enquire.js'

export const DEVICE_TYPE = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile'
}

export const deviceEnquire = function (callback) {
  const matchDesktop = {
    match: () => {
      callback && callback(DEVICE_TYPE.DESKTOP)
    }
  }

  const matchMobile = {
    match: () => {
      callback && callback(DEVICE_TYPE.MOBILE)
    }
  }

  // screen and (max-width: 1087.99px)
  enquireJs
    .register('screen and (max-width: 768px)', matchMobile)
    .register('screen and (min-width: 1200px)', matchDesktop)
}

