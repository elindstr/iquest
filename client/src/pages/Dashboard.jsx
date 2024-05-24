import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import styles from './Dashboard.module.css';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_USER_DAILY_LOGINS } from '../utils/queries';
import { RECORD_LOGIN } from '../utils/mutations';

const Dashboard = () => {
  const navigate = useNavigate();
  const userId = Auth.getProfile().data._id;
  const { data: userData, loading, error } = useQuery(QUERY_USER, { variables: { _id: userId } });

  // track daily logins
  const { data: dailyLoginData } = useQuery(QUERY_USER_DAILY_LOGINS, { variables: { id: userId } });
  const [recordLogin] = useMutation(RECORD_LOGIN);
  const [consecutiveDays, setConsecutiveDays] = useState(0);
  useEffect(() => {
    if (dailyLoginData && dailyLoginData.user) {
      const today = new Date().setHours(0, 0, 0, 0);
      const dailyLogins = dailyLoginData.user.dailyLogins;
      const lastLogin = dailyLogins.length > 0
        ? new Date(dailyLogins[dailyLogins.length - 1].date).setHours(0, 0, 0, 0)
        : null;
      
      console.log('last login:', lastLogin);

      if (lastLogin !== today) {
        recordLogin({ variables: { userId } });
        console.log('This is your first login today.');

        const consecutiveDaysCount = dailyLogins.reduce((acc, login, index, array) => {
          if (index === 0) return 1;
          const previousDate = new Date(array[index - 1].date);
          const currentDate = new Date(login.date);

          const difference = Math.floor((currentDate - previousDate) / (1000 * 60 * 60 * 24));
          if (difference === 1) return acc + 1;
          return acc;
        }, 1);

        setConsecutiveDays(consecutiveDaysCount);
      }

      console.log(`User has logged in for ${consecutiveDays} consecutive days.`);
    }
  }, [dailyLoginData]);

  const handleLogout = () => {
    Auth.logout();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.card}>
        <span>{userData ? userData.user.firstName : null}: {userData ? userData.user.iq.toFixed(0) : null} IQ</span>
        <h1 className={styles.h1}>Dashboard</h1>

        <div className={styles.containerButton}>
          <button className={styles.button} onClick={() => navigate('/find-friends')}>Find Friends</button>
          <button className={styles.button} onClick={() => navigate('/update-profile')}>View Profile</button>
          <button className={styles.button} onClick={() => navigate('/quiz')}>New Quiz</button>
          <button className={styles.button} onClick={() => navigate('/donate')}>Donate</button>
          <button className={styles.button} onClick={() => navigate('/feed')}>Feed (demo/development)</button>
          <button className={styles.button} onClick={handleLogout}>Sign Out</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
