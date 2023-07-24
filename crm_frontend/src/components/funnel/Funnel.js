import { InputPicker } from 'rsuite';
import '../../kendo/kendo.all.min';
import $ from 'jquery';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import FunnelGrid from './FunnelGrid';

const createFunnel = (data) => {
  if (data.length > 0)
    $('#funnel').kendoChart({
      dataSource: {
        data: data,
      },
      title: {
        text: 'Funnel',
        position: 'bottom',
      },
      theme: 'flat',
      legend: {
        visible: false,
      },
      seriesDefaults: {
        dynamicHeight: false,
        labels: {
          template:
            '#= dataItem.step # - #= category #       ' +
            'Conversion Rate' +
            ': #= dataItem.conversion # \n.\n' +
            'Loss' +
            '  #= dataItem.loss #',
          visible: true,
          font: '15px sans-serif',
          align: 'center',
          position: 'center',
          background: 'transparent',
          color: '#000',
          padding: 0,
          format: 'N0',
        },
        neckRatio: 0.5,
      },
      series: [
        {
          padding: 25,
          type: 'funnel',
          field: 'value',
          categoryField: 'category',
        },
      ],
    });
  else {
    $('#funnel').css({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
    });
    $('#funnel').text('Nothing to show');
  }
};
const Funnel = () => {
  const currentYear = new Date().getFullYear();

  let data = [];

  for (let i = currentYear; i > currentYear - 5; i--)
    data.push({ label: i, value: i });

  const [funnelData, setFunnelData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    axios
      .get(`/funnel?year=${year}`)
      .then((res) => {
        setFunnelData(res.data);
      })
      .catch((err) => console.log(err));
  }, [year]);

  $('#funnel').ready(() => createFunnel(funnelData));

  const updateFunnel = (e) => {
    setYear(e);
  };

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <label>Year: </label>
        <InputPicker
          id="year"
          data={data}
          value={year}
          style={{ width: 224, marginLeft: '10px' }}
          onChange={updateFunnel}
        />
      </div>
      <div style={{ display: 'flex', height: '100%' }}>
        <div
          style={{ height: '100%', width: '45%', border: '1px solid black' }}
        >
          <div id="funnel" style={{ height: '100%' }}></div>
        </div>
        <div style={{ width: '5%' }}></div>
        <div style={{ width: '50%' }}>
          <FunnelGrid data={funnelData} />
        </div>
      </div>
    </div>
  );
};

export default Funnel;
