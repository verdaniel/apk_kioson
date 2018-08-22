import Provider from './Provider'

const PhoneIdentifier = (num, tipe = 'normal') => {
  var phone = Provider.Unknown
  if (tipe === 'data') {
    if (num.startsWith('08')) {
      if (num.match(/^08(11|12|13|21|22|52|53|23)/g)) {
        phone = Provider.Telkomsel
      } else if (num.match(/^08(14|15|16|55|58|56|57)/g)) {
        phone = Provider.indosatData
      } else if (num.match(/^08(17|18|19|59|74|76|77|78|79)/g)) {
        phone = Provider.xlData
      } else if (num.match(/^08(99|98|97|96)/g)) {
        phone = Provider.threeData
      } else if (num.match(/^08(38|32|31)/g)) {
        phone = Provider.threeData
      } else {
        phone = Provider.Unknown
      }
    }
  } else if (tipe === 'chip') {
    if (num.startsWith('08')) {
      if (num.match(/^08(17|18|19|59|74|76|77|78|79)/g)) {
        phone = Provider.XL
      } else {
        phone = Provider.Unknown
      }
    }
  } else {
    if (num.startsWith('08')) {
      if (num.match(/^08(11|12|13|21|22|52|53|23)/g)) {
        phone = Provider.Telkomsel
      } else if (num.match(/^08(14|15|16|55|58|56|57)/g)) {
        phone = Provider.Indosat
      } else if (num.match(/^08(17|18|19|59|74|76|77|78|79)/g)) {
        phone = Provider.XL
      } else if (num.match(/^08(99|98|97|96)/g)) {
        phone = Provider.Three
      } else if (num.match(/^08(38|32|31)/g)) {
        phone = Provider.Axis
      } else if (num.match(/^08(81|82|88)/g)) {
        phone = Provider.Smartfren
      } else if (num.match(/^08(27|28)/g)) {
        phone = Provider.Ceria
      } else if (num.match(/^08681/g)) {
        phone = Provider.Byru
      } else {
        phone = Provider.Unknown
      }
    }
  }
  return phone
}
export default PhoneIdentifier
