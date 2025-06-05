const HomePage = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>ברוכים הבאים לקליניקת ליאה גניש</h1>
      <p>הבחירה להרגיש טוב</p>
      <div style={{ marginTop: '30px' }}>
        <button style={{
          padding: '10px 20px',
          backgroundColor: '#D4B5B0',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px'
        }}>
          קבע תור עכשיו
        </button>
      </div>
    </div>
  );
};

export default HomePage;