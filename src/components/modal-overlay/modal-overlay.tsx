//Компонент модального окна

//Импорты
import styles from './modal-overlay.module.css'

//Типы
type ModalOverlayPropsType = {
    onClose: () => void
}


const ModalOverlay = ({onClose}:ModalOverlayPropsType) => {
    return (
        <div onClick={() => onClose()} className={styles.modalOverlay}></div>
    )
}


export default ModalOverlay