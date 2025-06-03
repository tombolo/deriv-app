import styles from './finesttool.module.scss';


const Finesttool = () => {
    return (
        <div className={styles.container}>
            <iframe
                src="https://api.binarytool.site/"
                title="Finest Analysis"
                className={styles.iframe}
                allowFullScreen
            />
        </div>
    );
};

export default Finesttool;
