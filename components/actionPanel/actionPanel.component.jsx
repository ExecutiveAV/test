import styles from './actionPanel.module.scss';

const ActionPanel = ({ children }) => {
    return (
        <section className={styles.actionPanel} >{children}</section>
    );
};

export default ActionPanel;