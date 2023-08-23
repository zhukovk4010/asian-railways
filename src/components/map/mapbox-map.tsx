//Компонент карты из библиотеки Mapbox

//Импорты
import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

import YearsScale from "../years-scale/years-scale"

import styles from './map-box-map.module.css'

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

    //Состояние панели навигации по годам
    const [value, setValue] = useState(9)

    //Состояние карты
    const [map, setMap] = useState<mapboxgl.Map>()

    //Node карты
    const mapNode = useRef(null)

    //Список годов, для отображения
    const years = [
        1875,
        1890,
        1905,
        1920,
        1935,
        1950,
        1965,
        1980,
        1995,
        2010,
    ]

    useEffect(() => {
        const node = mapNode.current

        //Если window или node не найдем, то ничего не делаем
        if (typeof window === "undefined" || node === null) return

        //Иначе создаем карту
        const mapboxMap = new mapboxgl.Map({
            container: node,
            accessToken: process.env.REACT_APP_PUBLIC_MAPBOX_TOKEN,
            style: "mapbox://styles/zhukvok4010/cknks0z4523fm17ny7xc28ien",
            ...initialOptions,
        })

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

            //Добавление кнопки изменения масштаба карты
            mapboxMap.addControl(new mapboxgl.NavigationControl())

            //Добавление масштаба на карту
            const scale = new mapboxgl.ScaleControl()
            mapboxMap.addControl(scale)
        })

        //Удаление карты при демонтировании компонента
        return () => {
            mapboxMap.remove()
            setMap(undefined)
            if (onRemoved) onRemoved()
        }
    }, [])

    useEffect(() => {
        cheangeYear(value)
    }, [value])

    //Изменение отображения данных на карте (дорог и названий жд)
    const cheangeYear = (value: number) => {
        if (map) {
            let filters = ['==', 'data_open', value]
            // 1875-1950
            map.setFilter('local-railways-1875-1950', filters)
            // // //1965-1980
            map.setFilter('local-railways-1965-1980', filters)
            // // //1980-1995
            map.setFilter('local-railways-1995-2010', filters)
            //названия жд
            map.setFilter('points-other-names', filters)
        }
    }

    return (
        <>
            <div ref={mapNode} style={{ width: '100%', height: '100%' }} />
            <h2 className={styles.activeYear}>{years[value]}</h2>
            <section className={styles.yearsScaleContainer}>
                <h3 className={styles.scaleName}>Временная шкала</h3>
                <YearsScale value={value} setValue={setValue} />
            </section>

        </>
    )
}


export default MapboxMap