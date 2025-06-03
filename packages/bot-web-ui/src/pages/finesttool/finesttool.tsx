// Trade.tsx
import styles from './finesttool.scss';

const Trade = () => {
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

export default Trade;
