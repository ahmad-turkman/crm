import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Panel, Steps } from 'rsuite';
import { Icon } from '@rsuite/icons';
import { GiPartyPopper } from 'react-icons/gi';
import CheckRoundIcon from '@rsuite/icons/CheckRound';
import ProbasGrid from './ProbasGrid';
import axios from '../../api/axios';

const Opp = () => {
  let { state } = useLocation();
  let opp = state;
  let steps = opp.steps;

  const [probas, setProbas] = useState([]);

  useEffect(() => {
    axios
      .get(`/opps/probabilities?id=${opp.id}`)
      .then((res) => {
        setProbas(res.data);
      })
      .catch((err) => console.log(err));
  }, [opp.id]);

  let currentStep = steps.find((item) => item.value === opp.step_id);

  const [step, setStep] = useState(currentStep.number);
  const onChange = (nextStep) => {
    setStep(
      nextStep < 0 ? 0 : nextStep > steps.length ? steps.length : nextStep
    );
  };

  const onNext = () => onChange(step + 1);

  return (
    <div style={{ marginRight: '60px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginTop: '40px',
          marginBottom: '45px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>
            <span style={{ fontWeight: 'bold' }}>Customer:</span> {opp.customer}
          </span>
          <span>
            <span style={{ fontWeight: 'bold' }}>Customer Type:</span>{' '}
            {opp.customer_type}
          </span>
          <span>
            <span style={{ fontWeight: 'bold' }}>Product:</span> {opp.product}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>
            <span style={{ fontWeight: 'bold' }}>Status:</span> {opp.status}
          </span>
          <span>
            <span style={{ fontWeight: 'bold' }}>Probability:</span>{' '}
            {opp.probability}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>
            <span style={{ fontWeight: 'bold' }}>Description:</span>{' '}
            {opp.description}
          </span>
          <span>
            <span style={{ fontWeight: 'bold' }}>Creation Date:</span>{' '}
            {opp.creation_date}
          </span>
        </div>
      </div>
      <hr />
      <div>
        <Steps current={step}>
          {steps.map((item) => (
            <Steps.Item
              key={item.value}
              title={item.label}
              description={
                item.number === steps.length - 1 &&
                step === steps.length - 1 ? (
                  <div>
                    <Icon as={GiPartyPopper} style={{ fontSize: '35px' }} />
                    Won!
                  </div>
                ) : (
                  ''
                )
              }
            />
          ))}
        </Steps>
        <hr />
        {step === steps.length - 1 ? (
          <Panel
            header={
              <span
                style={{
                  fontWeight: 'bold',
                  fontFamily: 'cursive',
                  fontSize: '25px',
                  color: 'green',
                }}
              >
                Congratulations! <CheckRoundIcon />
              </span>
            }
          ></Panel>
        ) : (
          ''
        )}

        {/* {step !== steps.length ? (
          <Button onClick={onNext} disabled={step === steps.length - 1}>
            Next
          </Button>
        ) : (
          ''
        )} */}
      </div>
      <div style={{ border: '2px solid black', padding: '20px' }}>
        <ProbasGrid data={probas} />
      </div>
    </div>
  );
};

export default Opp;
