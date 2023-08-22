import { useEffect, useState } from 'react';
import ParetoGrid from './ParetoGrid';
import axios from '../../../api/axios';
import '../../../kendo/kendo.all.min';
import $ from 'jquery';

const Pareto = () => {
  const [data, setData] = useState([]);

  const createChart = () => {
    $('#pareto').kendoChart({
      title: {
        text: '',
      },
      legend: {
        position: 'top',
      },
      theme: 'flat',
      series: [
        {
          name: 'value',
          type: 'column',
          data: data,
          field: 'potential',
          axis: 'CA',
          colorField: 'potential_color',
          categoryField: 'company_name',
          tooltip: {
            visible: true,
            template:
              'name' +
              ': #= dataItem.company_name #<br/>' +
              'Potential ' +
              'value' +
              ': #= dataItem.potential # €<br/>' +
              'class' +
              ': #= dataItem.potential_type # </span>',
          },
        },
        {
          name: 'precentage',
          type: 'line',
          data: data,
          field: 'potential_percentage',
          axis: 'percentage',
          colorField: 'potential_color',
          tooltip: {
            visible: true,
            template:
              '<span style="margin-right:40px;">' +
              'index' +
              ': #= dataItem.index #<br/>' +
              'name' +
              ': #= dataItem.NOM_CLIENT #<br/>' +
              'Potential ' +
              'value' +
              ': #= dataItem.potential # €<br/>' +
              'class' +
              ': #= dataItem.potential_type # </span>',
          },
        },
        //   {
        //     name: Session.translate.CUST_PERCENTAGE + ' (20%)',
        //     type: 'area',
        //     data: oneTo20,
        //     axis: 'percentage',
        //     field: 'value',
        //     categoryField: 'NOM_CLIENT',
        //     color: '#409c58',
        //     area: {
        //       line: {
        //         style: 'smooth',
        //       },
        //     },
        //   },
        //   {
        //     name: Session.translate.CUST_PERCENTAGE + ' (80%)',
        //     type: 'area',
        //     data: twentyTo80,
        //     axis: 'percentage',
        //     field: 'value',
        //     categoryField: 'NOM_CLIENT',
        //     color: '#4788ad',
        //     area: {
        //       line: {
        //         style: 'smooth',
        //       },
        //     },
        //   },
        //   {
        //     name: Session.translate.CUST_PERCENTAGE + ' (100%)',
        //     type: 'area',
        //     data: eightyTo100,
        //     axis: 'percentage',
        //     field: 'value',
        //     categoryField: 'NOM_CLIENT',
        //     color: '#9d5ad1',
        //     area: {
        //       line: {
        //         style: 'smooth',
        //       },
        //     },
        //   },
      ],
      valueAxes: [
        {
          name: 'CA',
        },
        {
          name: 'percentage',
        },
      ],
      categoryAxis: {
        labels: {
          rotation: 75,
        },
        axisCrossingValues: [0, data.length + 1],
        justified: true,
      },
      seriesHover: function (e) {
        setTimeout(function () {
          var tooltip = $('div.k-tooltip.k-chart-tooltip');
          tooltip.attr('style', (index, currentValue) => {
            return (currentValue += 'margin-left: -120px; margin-top: -80px;');
          });
          var pareto = $('#potential');
          pareto.find('div.k-tooltip.k-chart-tooltip').remove();
          pareto.append(tooltip);
        }, 200);
      },
    });
  };

  useEffect(() => {
    axios
      .get('/cap/pareto')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  $('#pareto').ready(() => createChart(data));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ height: '100%', flex: 1 }}>
        <ParetoGrid data={data} />
      </div>
      <div style={{ width: '5%' }}></div>
      <div
        style={{
          flex: 1,
          height: '100%',
        }}
      >
        <div id="pareto" style={{ height: '100%' }}></div>
      </div>
    </div>
  );
};

export default Pareto;
