//Компонент карты из библиотеки Mapbox

import React from "react"
import mapboxgl from "mapbox-gl"

const MapboxMap = () => {
    
    //Состояние карты
    const [map, setMap] = React.useState<mapboxgl.Map>()

    const mapNode = React.useRef(null)

    React.useEffect(() => {
        const node = mapNode.current

        if (typeof window === "undefined" || node === null) return
        
        const mapboxMap = new mapboxgl.Map({
            container: node,
                  accessToken: process.env.REACT_APP_PUBLIC_MAPBOX_TOKEN,
                  style: "mapbox://styles/zhukvok4010/cknks0z4523fm17ny7xc28ien",
            center: [-74.5, 40],
            zoom: 9,
        });

        setMap(mapboxMap)

        return () => {
            mapboxMap.remove()
        }
    }, [])

    return <div ref={mapNode} style={{width: '100%', height: '100%'}} />
}


export default MapboxMap