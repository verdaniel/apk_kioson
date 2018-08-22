import I18n from '../I18n'
import PhoneIdentifier from './PhoneIdentifier'

const validation = {
  customerPhoneNumberMobile: {
    length: function (value, attributes, attributeName, options, constraints) {
      var provider = PhoneIdentifier(value)
      if (!(/(08).*$/).test(value)) {
        return {is: 10, message: I18n.t('e_wrongPhoneNumber')}
      } else if (provider === 'Unknown') {
        return {is: 10, message: I18n.t('e_phoneNumberNotFound')}
      }
      return {minimum: 10, message: I18n.t('e_minimunCustomerPhoneNumber')}
    }
  },
  customerPhoneNumberMobileData: {
    length: function (value, attributes, attributeName, options, constraints) {
      var provider = PhoneIdentifier(value, 'data')
      if (!(/(08).*$/).test(value)) {
        return {is: 10, message: I18n.t('e_wrongPhoneNumber')}
      } else if (provider === 'Unknown') {
        return {is: 10, message: I18n.t('e_phoneNumberNotFound')}
      }
      return {minimum: 10, message: I18n.t('e_minimunCustomerPhoneNumber')}
    }
  },
  customerPhoneNumberMobileChip: {
    length: function (value, attributes, attributeName, options, constraints) {
      var provider = PhoneIdentifier(value, 'chip')
      if (!(/(08).*$/).test(value)) {
        return {is: 10, message: I18n.t('e_wrongPhoneNumber')}
      } else if (provider === 'Unknown') {
        return {is: 10, message: I18n.t('e_productNotAvailable')}
      }
      return {minimum: 10, message: I18n.t('e_minimunCustomerPhoneNumber')}
    }
  },
  customerPhoneNumber: {
    length: function (value, attributes, attributeName, options, constraints) {
      if (!(/(08).*$/).test(value)) {
        return {is: 10, message: I18n.t('e_wrongPhoneNumber')}
      }
      return {minimum: 10, message: I18n.t('e_minimunCustomerPhoneNumber')}
    }
  },
  phoneNumber: {
    length: function (value, attributes, attributeName, options, constraints) {
      if (!(/(02).*$/).test(value)) {
        return {is: 10, message: I18n.t('e_wrongPhoneNumbers')}
      }
      return {minimum: 6, message: I18n.t('e_minimunPhoneNumber')}
    }
  },
  idCustomer: {
    length: {
      minimum: 10,
      message: I18n.t('e_invalidCustomerID')
    }
  },
  participantsNumber: {
    length: {
      minimum: 8,
      message: I18n.t('e_minumumParticipantsNumber')
    }
  },
  codePayment: {
    length: {
      minimum: 10,
      message: I18n.t('e_minimumCodePayment')
    }
  },
  topic: {
    length: {
      minimum: 6,
      message: I18n.t('e_minimumtopic')
    }
  },
  description: {
    length: {
      minimum: 100,
      message: I18n.t('e_minimumdescription')
    }
  },
  senderName: {
    format: {
      pattern: '[a-z]+',
      flags: 'i',
      message: I18n.t('e_wrongName')
    }
  },
  trasferAmount: {
    numericality: {
      greaterThanOrEqualTo: 10000,
      message: 'Nominal transfer minimum Rp. 10.000,-'
    }
  },
  destinationNumber: {
    length: {
      minimum: 10,
      message: 'Nomer rekening minimal 10 angka'
    }
  }
}

export default validation
