import { Record } from 'immutable'
import Humps from 'humps'

const CarRecord = Record({
  valor: undefined,
  marca: undefined,
  modelo: undefined,
  anoModelo: undefined,
  combustivel: undefined,
  codigoFipe: undefined,
  mesReferencia: undefined,
  tipoVeiculo: undefined,
})

class Car extends CarRecord {
  constructor(props) {
    const camelizedProps = Humps.camelizeKeys({ ...props })
    const sanitizedProps = Object.keys(camelizedProps).reduce((newProps, key) => {
      if (camelizedProps[key]) {
        return { ...newProps, [key]: camelizedProps[key] }
      }

      return newProps
    }, {})

    super(sanitizedProps)
  }

  sanitizeProps(props) {
    const camelizedProps = Humps.camelizeKeys({ ...props })
    return this.keySeq().reduce((newProps, key) => {
      if (camelizedProps[key]) {
        return { ...newProps, [key]: camelizedProps[key] }
      }

      return newProps
    }, {})
  }

  mergeProps(props) {
    return this.merge(this.sanitizeProps(props))
  }

  mergeDeepProps(props) {
    return this.mergeDeep(this.sanitizeProps(props))
  }

  setVal(key, val) {
    return this.set(key, val)
  }

  delKey(key) {
    return this.delete(key)
  }

  reset() {
    return this.clear()
  }

  toApi() {
    return Humps.decamelizeKeys(this.toJS())
  }
}

export default Car
