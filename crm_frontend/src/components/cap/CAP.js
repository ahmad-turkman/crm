import { useLocation } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import '../../index.css';
import Vision from './Vision';
import SWOT from './swot/SWOT';
import Pareto from './pareto/Pareto';

const Opp = () => {
  let { state } = useLocation();
  let cap = state;

  return (
    <div style={{ padding: '40px', height: '100%' }}>
      <Tabs style={{ height: '100%' }}>
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
          {/* <Tab className="tab-item" selectedClassName="selected">
            IPO/IPA
          </Tab> */}
        </TabList>

        <TabPanel>
          <div>
            <h4 style={{ textAlign: 'center' }}>My plan's Vision</h4>
            <Vision cap={cap} />
          </div>
        </TabPanel>
        <TabPanel>
          <div>
            <SWOT cap={cap} />
          </div>
        </TabPanel>
        <TabPanel style={{ height: '100%' }}>
          <div style={{ height: '100%' }}>
            <Pareto />
          </div>
        </TabPanel>
        <TabPanel>
          <h2>RFM</h2>
        </TabPanel>
        {/* <TabPanel>
          <h2>Any content 5</h2>
        </TabPanel> */}
      </Tabs>
    </div>
  );
};

export default Opp;
