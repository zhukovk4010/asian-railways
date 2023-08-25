//Компонент приложения

//Импорты
import React from 'react'

import MapboxMap from './components/map/mapbox-map'
import Loader from './components/loader/loader'
import ModalButton from './components/button/button'
import Modal from './components/modal/modal'

import styles from './App.module.css'
import trainPictures from './images/train-pictures.png'
import legend from './images/legend.png'
import informationIcon from './images/information-icon.png'
import legendIcon from './images/legend-icon.png'


const App = () => {

	//Состояние загрузки карты
	const [loading, setLoading] = React.useState(true)
	const handleMapLoading = () => setLoading(false)

	//Состояние модального окна
	const [activeLegendModal, setActiveLegendModal] = React.useState(false)
	const [activeInformationModal, setActiveInformationModal] = React.useState(false)

	//Функция закрытия модального окна
	const onClose = () => {
		setActiveLegendModal(false)
		setActiveInformationModal(false)
	}

	//Открытие модального окна легенды
	const onOpenLegend = () => {
		setActiveLegendModal(true)
	}

	//Открытие модального окна информации о карте
	const onOpenInformation = () => {
		setActiveInformationModal(true)
	}


	return (
		<main className={styles.mapContiner}>
			<div className={styles.mapName}>
				<h1>ИСТОРИЯ РАЗВИТИЯ ЖЕЛЕЗНЫХ ДОРОГ АЗИАТСКОЙ ЧАСТИ РОССИИ</h1>
			</div>
			<div className={styles.imgContainer}>
				<img className={styles.imgTrain} src={trainPictures} />
			</div>
			<div className={styles.map}>
				<MapboxMap
					initialOptions={{ center: [80, 55], zoom: 3.2, minZoom: 3, maxZoom: 6.99 }}
					onLoaded={handleMapLoading} />
			</div>
			{/* При загрузке карты показываем лоадер */}
			{loading && <Loader />}
			<div className={styles.buttonsPanel}>
				<ModalButton sign={legendIcon} setActiveModal={onOpenLegend} />
				<ModalButton sign={informationIcon} setActiveModal={onOpenInformation} />
			</div>
			{/* Модальные окна */}
			{activeLegendModal && <Modal title='' img={legend} onClose={onClose} />}
			{activeInformationModal && <Modal title='Информация о карте' onClose={onClose} />}
		</main>
	)
}


export default App