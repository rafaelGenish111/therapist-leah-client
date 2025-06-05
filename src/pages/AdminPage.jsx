import { useAuth } from '../contexts/AuthContext';

const AdminPage = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>שלום {user?.username}! 👋</h1>
      <p>ברוכה הבאה לאזור הניהול</p>
      <div style={{ marginTop: '20px' }}>
        <p>אזור הניהול בפיתוח...</p>
      </div>
    </div>
  );
};

export default AdminPage;