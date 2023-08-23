//Компонент модального окна

//Импорты
import ReactDOM from 'react-dom'
import styles from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { useEffect } from 'react'

//Получение внекорневого элемента
const modalRoot = document.getElementById("modal-window")

//Типы
type ModalPropsType = {
    img?: string
    title: string
    onClose: () => void
}


const Modal = ({ img, title, onClose }: ModalPropsType) => {

    //Закрытие модального окна на Esc
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} />
            <section className={styles.modalWindow}>
                <div className={styles.titleAndButton}>
                    <h2 className={styles.title}>{title}</h2>
                    <button className={styles.buttonClose} onClick={() => onClose()}>X</button>
                </div>

                {img && <div><img src={img} /></div>}

                {!img && (<div>
                    <h3 className={styles.nameMap}>Карта истории развития железных дорог азиатской части России</h3>
                    <p className={styles.description}>Карта разработана в Московском государственном университете геодезии и картографии
                        на кафедре визуализации геоданных и картографического дизайна.<br />
                        Границы территории и названия даны на 2021 год. Развитие железных дорог показано в период
                        с 1875 по 2010 год.
                    </p>
                    <p className={styles.developer}>Разработчик: Студент КиГ 4-3б
                        Жуков Кирилл
                    </p>
                    <p className={styles.scientificAdviser}>Научный руководитель: Ковалев Алексей Владимирович</p>
                </div>)}
                
            </section>
        </>, modalRoot!
    )
}


export default Modal