import React from 'react';
import styles from './strategy.module.scss';

const Strategy = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Trading Strategies</h1>

            <div className={styles.strategySection}>
                <h2 className={styles.strategyTitle}>Over/Under Strategy</h2>

                <div className={styles.strategyCard}>
                    <h3 className={styles.subTitle}>Over</h3>
                    <ul className={styles.strategyList}>
                        <li>Green bar must be above your prediction</li>
                        <li>Red bar must be below your prediction</li>
                        <li>Entry point: Use any digit below your prediction as the entry point</li>
                    </ul>
                </div>

                <div className={styles.strategyCard}>
                    <h3 className={styles.subTitle}>Under</h3>
                    <ul className={styles.strategyList}>
                        <li>Green bar must be below your prediction</li>
                        <li>Red bar must be above your prediction</li>
                        <li>Entry point: Use any digit above your prediction as the entry point</li>
                    </ul>
                </div>
            </div>

            <div className={styles.strategySection}>
                <h2 className={styles.strategyTitle}>Even/Odd Strategy</h2>
                <p className={styles.note}>With Even/Odd you consider both the red and green bar.</p>

                <div className={styles.strategyCard}>
                    <h3 className={styles.subTitle}>Even Strategy</h3>
                    <ul className={styles.strategyList}>
                        <li>Both the red bar and green bar should be on even numbers</li>
                        <li>There should be at least 3 even numbers with more than 10%</li>
                    </ul>
                </div>

                <div className={styles.strategyCard}>
                    <h3 className={styles.subTitle}>Odd Strategy</h3>
                    <ul className={styles.strategyList}>
                        <li>Both the red bar and green bar should be on odd numbers</li>
                        <li>There should be at least 3 odd numbers with more than 10%</li>
                    </ul>
                </div>

                <div className={styles.importantNote}>
                    <strong>Important:</strong> You should trade when both the red and green bars are not on the same contract.
                </div>
            </div>
        </div>
    );
};

export default Strategy;