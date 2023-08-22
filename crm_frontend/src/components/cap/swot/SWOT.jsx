import SWOTGrid from './SWOTGrid';

const swot = ({ cap }) => {
  return (
    <div>
      <div className="swot">
        <SWOTGrid type="s" title="Strengths" color="#26a69a" cap={cap} />
        <SWOTGrid type="w" title="Weaknesses" color="#ffb300" cap={cap} />
      </div>
      <div className="swot">
        <SWOTGrid type="o" title="Opportunities" color="#42a5f5" cap={cap} />
        <SWOTGrid type="t" title="Threats" color="#ec407a" cap={cap} />
      </div>
    </div>
  );
};

export default swot;
