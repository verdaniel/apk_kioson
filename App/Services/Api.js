// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"

// var baseURLs = 'https://bridge.kioson.project.skyshi.com/'
var baseURLs = 'https://private-e186f-de453f5c6caba980baa12b6eb31543dc1.apiary-mock.com/api/v1/'

const create = (baseURL = baseURLs) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //

  const addressApiari = 'https://private-e186f-de453f5c6caba980baa12b6eb31543dc1.apiary-mock.com/api/v1/'

  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Content-Type': 'application/json'
    },
    // 10 second timeout...
    timeout: 100000
  })

  const apiari = apisauce.create({
    // base URL is read from the "constructor"
    baseURL: addressApiari,
    // here are some default headers
    headers: {
      'Content-Type': 'application/json'
    },
    // 10 second timeout...
    timeout: 100000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaW4iOiJlMmQzMDljY2RkODE3ZTY5Y2RiZjA2MGQzNGQzNTUzMCIsInNlc3Npb25faWQiOiJlNDlkZThkNy1lNjE2LTExZTctYSIsInJldGFpbGVyX2lkIjoiUkhZWiIsImlhdCI6MTUxMzgzNzE2NSwiZXhwIjoxNTE0NDQxOTY1fQ.e1DLkv82KbYgujsQBKrBSKeNreVExAKO5VF88BV9uUg

  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})

  // Top Up Chip
  const getChip = (token) => {
    return api.get('presets/chip', null,
      {
        headers: {
          'Authorization': 'JWT ' + token
        }
      })
  }

  const confirmationChip = (data) => {
    return api.post('services/chip/confirmation',
      {
        service_product_id: data.serviceProductId,
        qty: data.qty,
        amount: data.amount
      },
      {
        headers:
        {
          Authorization: 'JWT ' + data.token
        }
      })
  }

  const orderChip = (data) => {
    return api.post('services/chip/order',
      {
        phone_number: data.phoneNumber,
        service_product_id: data.serviceProductId,
        qty: data.qty,
        amount: data.amount,
        coupon_code: data.couponCode
      },
      {
        headers:
        {
          Authorization: 'JWT ' + data.token
        }
      })
  }

  const getKiosonConfirm = (data) => apiari.get('services/pay/confirmation', {ervice_product_id: data.id, phone_number: data.phone, payment_code: data.code}, {headers: {Authorization: 'JWT ' + data.token}})
  const getKiosonPay = () => apiari.get('presets/pay', {}, {})
  const getBanner = () => api.get('mobile/home-banner')
  const getsignIn = (data) => api.post('auth/login', {username: data.username, password: data.password}, {})
  const getappVersion = (data) => api.get('mobile/check-version', {}, { headers: {Authorization: 'JWT ' + data} })
  const signUp = (data) => api.post('auth/register', data)
  const getOtp = (phone) => api.post('otp/register', { username: phone })
  const getState = () => api.get('location/states')
  const getDistrict = (id) => api.get(`location/districts?state_id=${id}`)
  const getCity = (id) => api.get(`location/cities?district_id=${id}`)
  const getVillage = (id) => api.get(`location/villages?city_id=${id}`)
  const getStoreType = (token) => api.get('presets/store-types', {}, { headers: {Authorization: 'JWT ' + token} })
  const getWorkType = (token) => api.get('presets/work-types', {}, { headers: {Authorization: 'JWT ' + token} })
  const getNewsInfo = (token) => api.get('news', {}, { headers: {Authorization: 'JWT ' + token} })
  const getNewsPromo = (token) => api.get('promo', {}, { headers: {Authorization: 'JWT ' + token} })
  const getTransaction = (token, page, limit, start, end) => api.get(`transactions?page=${page}&limit=${limit}&start_at=${start}&end_at=${end}`, {}, { headers: {Authorization: 'JWT ' + token} })

  const getPrePaid = (token, id) => api.get(`presets/power?customer_id=${id}`, {}, { headers: {Authorization: 'JWT ' + token} })
  const orderPrePaid = (token, data) => api.post('services/power/prepaid/order', data, { headers: {Authorization: 'JWT ' + token} })
  const confirmPrePaid = (token, data) => api.post('services/power/postpaid/confirmation', data, { headers: {Authorization: 'JWT ' + token} })
  const orderPostPaid = (token, data) => api.post('services/power/postpaid/order', data, { headers: {Authorization: 'JWT ' + token} })
  const confirmPostPaid = (token, data) => api.post('services/power/postpaid/confirmation', data, { headers: {Authorization: 'JWT ' + token} })
  const getProfile = (token, data) => api.get('user', data, { headers: {Authorization: 'JWT ' + token} })
  const getBalance = (token) => api.get('user/balance', {}, { headers: {Authorization: 'JWT ' + token} })
  const updateProfile = (token, data) => api.put('user', data, { headers: {Authorization: 'JWT ' + token} })

  const getchip = (token) => api.get('presets/chip', {}, { headers: { 'Authorization': 'JWT ' + token } })
  const providerGame = (token) => api.get('presets/game', {}, { headers: {Authorization: 'JWT ' + token} })
  const serviceGame = (data) => api.get('presets/game/' + data.id + '/service-products', {}, { headers: {Authorization: 'JWT ' + data.token} })
  const billGame = (data) => {
    return api.post('services/game/confirmation',
      {
        service_product_id: data.id,
        phone_number: data.phoneNumber
      },
      {
        headers:
        {
          Authorization: 'JWT ' + data.token
        }
      })
  }
  const topupGame = (data) => {
    return api.post('services/game/order',
      {
        pin: data.pin,
        service_product_id: data.id,
        phone_number: data.phoneNumber,
        coupon_code: data.coupon
      }, { headers: {Authorization: 'JWT ' + data.token} })
  }

  const getcoupon = (data) => api.post('coupon', { service_product_id: data.id, service_type: data.type, coupon_code: data.coupon }, { headers: { Authorization: 'JWT ' + data.token } })

  // Pulsa & Paket Data
  const getRechargeMobile = (token) => {
    return api.get('presets/recharge/mobile',
    {},
      {
        headers:
        {
          Authorization: 'JWT ' + token
        }
      })
  }

  const getrechargeMobileData = (token) => {
    return api.get('presets/recharge/mobile-data',
    {},
      {
        headers:
        {
          Authorization: 'JWT ' + token
        }
      })
  }

  // PDAM
  const getpdam = (token) => {
    return api.get('presets/water',
      {},
      {
        headers:
        {
          Authorization: 'JWT ' + token
        }
      })
  }

  const confirmationPdam = (data) => {
    return api.post('services/water/confirmation',
      {
        service_product_id: data.serviceProductId,
        phone_number: data.phoneNumber,
        customer_id: data.customerId
      },
      {
        headers:
        {
          Authorization: 'JWT ' + data.token
        }
      })
  }

  const orderPdam = (data) => {
    return api.post('services/water/order',
      {
        service_product_id: data.serviceProductId,
        phone_number: data.phoneNumber,
        coupon_code: data.couponCode,
        customer_id: data.customerId
      },
      {
        headers:
        {
          Authorization: 'JWT ' + data.token
        }
      })
  }

  const logout = (data) => api.get('auth/logout', { }, { headers: { Authorization: 'JWT ' + data.token } })

  const confirmationRechargeMobile = (data) => {
    return api.post('services/recharge/mobile/confirmation',
      {
        service_product_id: data.serviceProductId,
        phone_number: data.phoneNumber
      },
      {
        headers:
        {
          Authorization: 'JWT ' + data.token
        }
      })
  }

  const orderRechargeMobile = (data) => {
    return api.post('services/recharge/mobile/order',
      {
        pin: data.pin,
        service_product_id: data.serviceProductId,
        phone_number: data.phoneNumber,
        coupon_code: data.couponCode
      },
      {
        headers:
        {
          Authorization: 'JWT ' + data.token
        }
      })
  }

  const confirmationRechargeMobileData = (data) => {
    return api.post('services/recharge/mobile-data/confirmation',
      {
        service_product_id: data.serviceProductId,
        phone_number: data.phoneNumber
      },
      {
        headers:
        {
          Authorization: 'JWT ' + data.token
        }
      })
  }

  const orderRechargeMobileData = (data) => {
    return api.post('services/recharge/mobile-data/order',
      {
        pin: data.pin,
        service_product_id: data.serviceProductId,
        phone_number: data.phoneNumber,
        coupon_code: data.couponCode
      },
      {
        headers:
        {
          Authorization: 'JWT ' + data.token
        }
      })
  }

  // money
  const bankPreset = (token) => {
    return api.get('presets/money',
      {},
      {
        headers:
        {
          Authorization: 'JWT ' + token
        }
      })
  }

  const confirmationMoney = (data) => {
    return api.post('services/money/confirmation',
      {
        service_product_id: data.serviceProductId,
        holder_account_number: data.holderAccountNumber,
        holder_name: data.holderName,
        phone_number: data.phoneNumber,
        sender_name: data.senderName,
        amount: data.amount
      },
      {
        headers:
        {
          Authorization: 'JWT ' + data.token
        }
      })
  }

  const orderMoney = (data) => {
    return api.post('services/money/order',
      {
        pin: data.pin,
        service_product_id: data.serviceProductId,
        holder_account_number: data.holderAccountNumber,
        holder_name: data.holderName,
        phone_number: data.phoneNumber,
        sender_name: data.senderName,
        amount: data.amount,
        coupon_code: data.couponCode
      },
      {
        headers:
        {
          Authorization: 'JWT ' + data.token
        }
      })
  }

  // media
  const getPresetTv = (token) => {
    return api.get('presets/media/tv',
      {},
      {
        headers:
        {
          Authorization: 'JWT ' + token
        }
      })
  }

  // Postpaid
  const getPostpaid = (token) => {
    return api.get('presets/postpaid',
      {},
      {
        headers:
        {
          Authorization: 'JWT ' + token
        }
      })
  }

  const confirmationPostpaid = (data) => {
    return api.post('services/postpaid/confirmation',
      {
        service_product_id: data.serviceProductId,
        phone_number: data.phoneNumber
      },
      {
        headers:
        {
          Authorization: 'JWT ' + data.token
        }
      })
  }

  const orderPostpaid = (data) => {
    return api.post('services/postpaid/order',
      {

        pin: data.pin,
        service_product_id: data.id,
        phone_number: data.phoneNumber,
        coupon_code: data.coupon
      },
      {
        headers:
        {
          Authorization: 'JWT ' + data.token
        }
      })
  }

  // Phone
  const confirmationPhone = (data) => {
    return api.post('services/phone/confirmation',
      {
        phone_number: data.phoneNumber,
        customer_id: data.customerId
      },
      {
        headers:
        {
          Authorization: 'JWT ' + data.token
        }
      })
  }

  const orderPhone = (data) => {
    return api.post('services/phone/order',
      {

        pin: data.pin,
        customer_id: data.customerId,
        phone_number: data.phoneNumber,
        coupon_code: data.coupon
      },
      {
        headers:
        {
          Authorization: 'JWT ' + data.token
        }
      })
  }

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    signUp,
    getOtp,
    getChip,
    confirmationChip,
    orderChip,
    getState,
    getCity,
    getDistrict,
    getVillage,
    getStoreType,
    getWorkType,
    getNewsInfo,
    getNewsPromo,
    getTransaction,
    getPrePaid,
    orderPrePaid,
    confirmPrePaid,
    orderPostPaid,
    confirmPostPaid,
    getProfile,
    getBalance,
    updateProfile,
    getchip,
    providerGame,
    serviceGame,
    billGame,
    topupGame,
    getcoupon,
    getRechargeMobile,
    getrechargeMobileData,
    getpdam,
    confirmationPdam,
    orderPdam,
    logout,
    confirmationRechargeMobile,
    orderRechargeMobile,
    confirmationRechargeMobileData,
    orderRechargeMobileData,
    getappVersion,
    getBanner,
    getsignIn,
    bankPreset,
    confirmationMoney,
    orderMoney,
    getPresetTv,
    getKiosonPay,
    getKiosonConfirm,
    getPostpaid,
    confirmationPostpaid,
    orderPostpaid,
    confirmationPhone,
    orderPhone
  }
}

// let's return back our create method as the default.
export default {
  create
}
