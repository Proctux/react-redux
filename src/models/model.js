import { Record, fromJS } from 'immutable'
import Humps from 'humps'

const Model = (defaultValues, ignoreCamelize) =>
  class extends Record({
    ...defaultValues,
  }) {
    constructor(props) {
      const camelizedProps = Humps.camelizeKeys({ ...props })
      const sanitizedProps = Object.keys(camelizedProps).reduce((newProps, key) => {
        if (ignoreCamelize?.includes(key)) {
          return { ...newProps, [key]: fromJS(props[Humps.decamelize(key)]) }
        }
        if (key in camelizedProps) {
          return { ...newProps, [key]: fromJS(camelizedProps[key]) }
        }

        return newProps
      }, {})

      super(sanitizedProps)
    }

    sanitizeProps(props) {
      const camelizedProps = Humps.camelizeKeys({ ...props })
      return this.toSeq()
        .keySeq()
        .reduce((newProps, key) => {
          const value = camelizedProps[key]
          return value ? { ...newProps, [key]: fromJS(value) } : newProps
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

export default Model
