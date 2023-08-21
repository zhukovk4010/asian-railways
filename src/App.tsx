import './App.css'
import MapboxMap from './components/Mapbox-map'
import trainPictures from './images/train-pictures.png'

function App() {

	console.log(process.env.REACT_APP_SECRET_CODE)
	return (
		<main className='mapContiner'>
			<div className='map-name'>
				<h1>ИСТОРИЯ РАЗВИТИЯ ЖЕЛЕЗНЫХ ДОРОГ АЗИАТСКОЙ ЧАСТИ РОССИИ</h1>
			</div>
			<div className='img-container'>
				<img className='train-img' src={trainPictures} alt="" />
			</div>
			<MapboxMap />
		</main>
	);
}

export default App;
