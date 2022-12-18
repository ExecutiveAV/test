import styles from './mainButton.module.scss';

import Link from 'next/link';

const MainButton = ({ content, pathTo, action }) => {
    return (
        <section className={styles.mainButton} >
            {pathTo ? <Link href={pathTo} className={styles.content} >{content}</Link> : <p className={styles.content} onClick={action} >{content}</p>}
        </section>
    );
};

export default MainButton;