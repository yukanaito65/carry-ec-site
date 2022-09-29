import styles from '../items.module.css';
import sugStyles from '../../styles/suggest.module.css';

type SubBtn = {
  type: any,
  value: string,
  onClick: any,
}

export function SubBtn({
  type,
  value, 
  onClick
}: SubBtn) {
  return (
    <>
      <button 
      className={styles.cannselBtn}
      type={type} onClick={onClick}>{value}</button>
    </>
  )
}
