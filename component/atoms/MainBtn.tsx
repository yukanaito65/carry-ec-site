import styles from '../items.module.css';
import sugStyles from '../../styles/suggest.module.css';

type MainBtn = {
  type: any,
  value: string,
  onClick: any,
}

export function MainBtn({
  type,
  value, 
  onClick
}: MainBtn) {
  return (
    <>
      <button 
      className={styles.searchBtn}
      type={type} onClick={onClick}>{value}</button>
    </>
  )
}
