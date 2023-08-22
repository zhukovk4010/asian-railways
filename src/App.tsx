//Компонент приложения

//Импорты
import React from 'react'

import MapboxMap from './components/map/mapbox-map'
import Loader from './components/loader/loader'

import styles from './App.module.css'
import trainPictures from './images/train-pictures.png'


const App = () => {

	//Состояние загрузки карты
	const [loading, setLoading] = React.useState(true)
	const handleMapLoading = () => setLoading(false)

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

		</main>
	)
}


export default App;