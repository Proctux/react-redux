import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import BMW from '_assets/images/bmw328i.jpg'
import { getPerfectBMW } from '_modules/car/actions'
import { Car } from '_models'

import styles from './styles.css'

const mapStateToProps = ({ car }) => ({
  car,
})

const mapDispatchToProps = {
  getPerfectBMW,
}

class App extends PureComponent {
  static propTypes = {
    getPerfectBMW: PropTypes.func.isRequired,
    car: PropTypes.instanceOf(Car).isRequired,
  }

  componentDidMount() {
    this.props.getPerfectBMW()
  }

  render() {
    const { car } = this.props
    return (
      <div className={styles.App}>
        <header className={styles['App-header']}>
          <img src={BMW} alt="BMW" className={styles['App-logo']} />
          <h1 className={styles['App-title']}>Jungle Devs Boilerplate</h1>
        </header>
        {car.marca ? (
          <p className={styles['App-intro']}>{`The ${car.marca} ${car.modelo} ${car.anoModelo} - ${
            car.combustivel
          } (FIPE ${car.codigoFipe}) was evaluated at ${car.valor}`}</p>
        ) : (
          <p className={styles['App-intro']}>Loading...</p>
        )}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
