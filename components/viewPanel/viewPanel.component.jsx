import styles from './viewPanel.module.scss';

const ViewPanel = ({ children }) => {
    return (
        <section className={styles.viewPanel} >{children}</section>
    );
};

export default ViewPanel;