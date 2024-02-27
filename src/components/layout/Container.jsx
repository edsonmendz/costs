import styles from './Container.modules.css'

function Container(props) {
    return <div className={styles}>{props.children}</div>
    
}

export default Container;