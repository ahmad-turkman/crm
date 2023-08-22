import { Stack, Table } from 'rsuite';
import StackItem from 'rsuite/esm/Stack/StackItem';
import { useState } from 'react';

const { Column, HeaderCell, Cell } = Table;

const columns = [
  {
    key: 'company_name',
    label: 'Company Name',
    width: 200,
  },
  {
    key: 'potential',
    label: 'value',
    width: 200,
  },
  {
    key: 'potential_cumulative',
    label: 'cumulative',
    width: 200,
  },
  {
    key: 'potential_percentage',
    label: 'precentage',
    width: 200,
  },
  {
    key: 'potential_customer_percentage',
    label: 'customer precentage',
    width: 200,
  },
  {
    key: 'potential_type',
    label: 'Class',
    width: 200,
  },
];

const ParetoGrid = ({ data }) => {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();

  const filteredData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.toLowerCase().charCodeAt(0);
        }
        if (typeof y === 'string') {
          y = y.toLowerCase().charCodeAt(0);
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  return (
    <>
      <Stack
        direction="column"
        alignItems="stretch"
        style={{ height: '100%', flex: 1, border: '1px solid black' }}
      >
        <StackItem flex={1}>
          <Table
            cellBordered
            bordered
            data={filteredData()}
            fillHeight
            wordWrap={'break-word'}
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
          >
            {columns.map((column) => {
              const { key, label, ...rest } = column;
              return (
                <Column {...rest} key={key} resizable sortable>
                  <HeaderCell>{label}</HeaderCell>
                  <Cell dataKey={key} />
                </Column>
              );
            })}
          </Table>
        </StackItem>
      </Stack>
    </>
  );
};

export default ParetoGrid;
