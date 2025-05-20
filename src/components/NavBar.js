import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showSettingsModal } from '../store/settingsModalSlice';
import styles from './NavBar.module.css';

const NavBar = () => {
  const dispatch = useDispatch();

  return (
    <nav className={styles.nav}>
      <div className={styles.leftSection}>
        <NavLink to="/chains" className={styles.navLink}>
          Chains
        </NavLink>
        <NavLink to="/explorer" className={styles.navLink}>
          Explorer
        </NavLink>
        <NavLink to="/wallet" className={styles.navLink}>
          Wallet
        </NavLink>
        <NavLink to="/fast-withdrawal" className={styles.navLink}>
          Fast Withdrawal
        </NavLink>
        <NavLink to="/1" className={styles.navLink}>
          CrossChain Transfer
        </NavLink>
        <NavLink to="/2" className={styles.navLink}>
          History
        </NavLink>
        <NavLink to="/3" className={styles.navLink}>
          Chain Health
        </NavLink>
      </div>
      <div className={styles.iconContainer}>
        <button 
          className={styles.settingsButton}
          onClick={() => dispatch(showSettingsModal())}
        >
          Settings
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
