import { useLocation } from 'react-router-dom';

const Opp = () => {
  let { state } = useLocation();
  let cap = state;

  return <div>{cap.description}</div>;
};

export default Opp;
