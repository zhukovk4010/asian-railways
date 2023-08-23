//Компонент временной шкалы

//Импорты
import styles from './years-scale.module.css'

//Типы
type YearsScalePropsType = {
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
}


const YearsScale = ({ value, setValue }: YearsScalePropsType) => {
    return (
        <div>
            <input
                className={styles.scale}
                type="range"
                min="0"
                max="9"
                step="1"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
            />
            <div className={styles.scaleYears}>
                <label>1875</label>
                <label>1890</label>
                <label>1905</label>
                <label>1920</label>
                <label>1935</label>
                <label>1950</label>
                <label>1965</label>
                <label>1980</label>
                <label>1995</label>
                <label>2010</label>
            </div>
        </div>
    )
}

export default YearsScale