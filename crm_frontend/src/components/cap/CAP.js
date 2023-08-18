import { useLocation } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import '../../index.css';
import Vision from './Vision';

const Opp = () => {
  let { state } = useLocation();
  let cap = state;

  return (
    <div style={{ padding: '40px' }}>
      <Tabs>
        <TabList className="tabs__tab-list">
          <Tab className="tab-item" selectedClassName="selected">
            Vision
          </Tab>
          <Tab className="tab-item" selectedClassName="selected">
            SWOT
          </Tab>

          <Tab className="tab-item" selectedClassName="selected">
            Pareto
          </Tab>
          <Tab className="tab-item" selectedClassName="selected">
            RFM
          </Tab>
          <Tab className="tab-item" selectedClassName="selected">
            IPO/IPA
          </Tab>
        </TabList>

        <TabPanel>
          <div>
            <h4 style={{ textAlign: 'center' }}>My plan's Vision</h4>
            <Vision cap={cap} />
          </div>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 4</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 5</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Opp;
