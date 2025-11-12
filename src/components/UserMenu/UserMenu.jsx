import { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import styles from './UserMenu.module.css';
import { useAuth } from '../../hooks/useAuth.js';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className={styles.container}>
      <button className={styles.userButton} onClick={() => setIsOpen(!isOpen)}>
        <User size={20} />
      </button>

      {isOpen && (
        <div
          className={styles.dropdown}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className={styles.username}> {user.username}</div>
          <button className={styles.logoutButton} onClick={logout}>
            <LogOut size={16} />
            <span>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
