import styles from  './title.module.scss';

import Link from 'next/link'

const Title = ({ title, path }) => {
    return (
        <Link href={path} className={styles.title} >{title}</Link>
    );
};

export default Title;