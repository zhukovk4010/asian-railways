//Лоадер, который открывается при загрузке

//Импорты
import loader from '../../images/loader.gif'
import styles from './loader.module.css'


const Loader = () => {
    return (
        <div className={styles.loaderContainer}>
            <img className={styles.loader} src={loader} />
        </div>
    )
}


export default Loader