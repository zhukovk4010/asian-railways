//Компонент кнопки

//Импорты
import styles from './button.module.css'

//Типы
type ModalButtonPropsType = {
    sign: String
    setActiveModal: React.Dispatch<React.SetStateAction<boolean>>
}


const ModalButton = ({sign, setActiveModal}: ModalButtonPropsType) => {
    return (
        <button onClick={() => setActiveModal(true)} className={styles.button}>{sign}</button>
    )
}


export default ModalButton