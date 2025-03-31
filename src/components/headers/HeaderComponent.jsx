import React from 'react';
import styles from './Header.module.css';

export default function Header() {
    return(
        <>
    <div className={styles.header}>
        <h1>Welcome to Groovo!</h1>
        <h3>Begin by typing any song or artist in the search bar, and search results will automatically pop up.</h3>
    </div>
        </>
    )
}