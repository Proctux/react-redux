import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import BMW from '_assets/images/bmw328i.jpg'
import { getPerfectBMW } from '_modules/car/actions'

import styles from './styles.css'

const App = () => {
  const { t } = useTranslation()

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
    </div>
  )
}

export default React.memo(App)
