import './App.css'
import MapboxMap from './components/Mapbox-map'

function App() {

	console.log(process.env.REACT_APP_SECRET_CODE)
	return (
		<main className='mapContiner'>
			<MapboxMap />
		</main>
	);
}

export default App;
