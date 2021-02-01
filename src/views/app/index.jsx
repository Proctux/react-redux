import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// <i18n>
import { useTranslation } from 'react-i18next'
// </i18n>

import BMW from '_assets/images/bmw328i.jpg'
import { getPerfectBMW } from '_modules/car/actions'

import styles from './styles.css'

const App = () => {
  // <i18n>
  const { t } = useTranslation()
  // </i18n>
  const car = useSelector(state => state.car)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPerfectBMW())
  }, [dispatch])

  return (
    <div className={styles.App}>
      <header className={styles['App-header']}>
        <img src={BMW} alt="BMW" className={styles['App-logo']} />
        <h1 className={styles['App-title']}>Jungle Devs Boilerplate</h1>
      </header>
      {/* <i18n> */}
      <p className={styles['App-intro']}>
        {car.marca
          ? t('carEvaluation', {
              brand: car.marca,
              fipe: car.codigoFipe,
              fuel: car.combustivel,
              model: car.modelo,
              value: car.valor,
              year: car.anoModelo,
            })
          : t('loading')}
      </p>
      {/* </i18n> */}
      {/* <no-i18n> */}
      {car.marca ? (
        <p
          className={styles['App-intro']}
        >{`The ${car.marca} ${car.modelo} ${car.anoModelo} - ${car.combustivel} (FIPE ${car.codigoFipe}) was evaluated at ${car.valor}`}</p>
      ) : (
        <p className={styles['App-intro']}>Loading...</p>
      )}
      {/* </no-i18n> */}
    </div>
  )
}

export default React.memo(App)
