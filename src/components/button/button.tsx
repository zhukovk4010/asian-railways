//Компонент кнопки

//Импорты
import styles from './button.module.css'

//Типы
type ModalButtonPropsType = {
    sign: string
    setActiveModal: React.Dispatch<React.SetStateAction<boolean>>
}


const ModalButton = ({sign, setActiveModal}: ModalButtonPropsType) => {
    return (
        <button onClick={() => setActiveModal(true)} className={styles.button}>
            <img src={sign} alt="" />
        </button>
    )
}


export default ModalButton