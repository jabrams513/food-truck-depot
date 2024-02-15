import React from 'react';
import styles from './Footer.module.css'; // Import the CSS module

export default function Footer() {
    return (
        <footer className={styles.footer}> {/* Apply the CSS class 'footer' from the imported module */}
            <p>Eat the road less traveled</p>
        </footer>
    );
}
