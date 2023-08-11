import { Button } from 'rsuite';
import crm from '../images/crm.jpg';
import { useNavigate } from 'react-router-dom';

const NotLoggedin = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${crm})`,
        backgroundSize: '600px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
      }}
    >
      <div style={{ flex: 1 }}></div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            textAlign: 'center',
            fontSize: '50px',
            fontWeight: 'bold',
            fontFamily: 'cursive',
            marginBottom: '50px',
          }}
        >
          You Are not Logged in!
        </span>
        <Button
          style={{
            width: '200px',
            fontSize: '30px',
            height: '50px',
            background: 'lightskyblue',
          }}
          onClick={() => navigate('/login')}
        >
          Log in
        </Button>
      </div>
    </div>
  );
};

export default NotLoggedin;
