//Компонент карты из библиотеки Mapbox

//Импорты
import React from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"; 

//Типы
type MapboxMapPropsType = {
    initialOptions?: Omit<mapboxgl.MapboxOptions, "container">
    onCreated?(map: mapboxgl.Map): void
    onLoaded?(map: mapboxgl.Map): void
    onRemoved?(): void
}

const MapboxMap = ({
    initialOptions = {},
    onCreated,
    onLoaded,
    onRemoved
    }: MapboxMapPropsType) => {
    
    //Состояние карты
    const [map, setMap] = React.useState<mapboxgl.Map>()

    //Node карты
    const mapNode = React.useRef(null)

    React.useEffect(() => {
        const node = mapNode.current

        //Если window или node не найдем, то ничего не делаем
        if (typeof window === "undefined" || node === null) return
        
        //Иначе создаем карту
        const mapboxMap = new mapboxgl.Map({
            container: node,
                  accessToken: process.env.REACT_APP_PUBLIC_MAPBOX_TOKEN,
                  style: "mapbox://styles/zhukvok4010/cknks0z4523fm17ny7xc28ien",
            ...initialOptions,
        });

        //Меняем состояние карты
        setMap(mapboxMap)

        if (onCreated) onCreated(mapboxMap)

        //Событие при загрузке карты, вызывается однажды, можно передать в props
        if (onLoaded) mapboxMap.once('load', () => onLoaded(mapboxMap))

        //Настройки карты, что показывать на ней
        mapboxMap.on('load', () => {

            //Добавление слоя с рельефом дна
            mapboxMap.addSource('10m-bathymetry-81bsvj', {
                type: 'vector',
                url: 'mapbox://mapbox.9tm8dx88'
            });

            mapboxMap.addLayer(
                {
                    'id': '10m-bathymetry-81bsvj',
                    'type': 'fill',
                    'source': '10m-bathymetry-81bsvj',
                    'source-layer': '10m-bathymetry-81bsvj',
                    'layout': {},
                    'paint': {
                        'fill-outline-color': 'hsla(337, 82%, 62%, 0)',
                        'fill-color': [
                            'interpolate',
                            ['cubic-bezier', 0, 0.5, 1, 0.5],
                            ['get', 'DEPTH'],
                            200,
                            '#add8eb',
                            9000,
                            '#15659f'
                        ]
                    }
                },
                'land-structure-polygon'
            );
        })

        //Удаление карты при демонтировании компонента
        return () => {
            mapboxMap.remove()
            setMap(undefined)
            if (onRemoved) onRemoved()
        }
    }, []) 

    return <div ref={mapNode} style={{width: '100%', height: '100%'}} />
}


export default MapboxMap