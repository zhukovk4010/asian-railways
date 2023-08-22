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

        if (onLoaded) mapboxMap.once('load', () => onLoaded(mapboxMap))

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