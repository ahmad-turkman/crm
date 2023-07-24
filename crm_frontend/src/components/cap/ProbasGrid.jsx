import { Pagination, Stack, Table } from 'rsuite';
import StackItem from 'rsuite/esm/Stack/StackItem';
import { useState } from 'react';

const { Column, HeaderCell, Cell } = Table;

const columns = [
  {
    key: 'percentage',
    label: 'Percentage',
    width: 200,
  },
  {
    key: 'creation_date',
    label: 'Creation Date',
    width: 200,
  },
];

const Grid = ({ data }) => {
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
      <Stack direction="column" alignItems="stretch" style={{ height: '100%' }}>
        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
          List of probabilities
        </span>

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
        <StackItem>
          <div style={{ padding: 20 }}>
            <Pagination
              prev
              next
              ellipsis
              boundaryLinks
              size="xs"
              layout={['total', '-', '|', 'pager']}
              total={data.length}
              activePage={1}
            />
          </div>
        </StackItem>
      </Stack>
    </>
  );
};

export default Grid;
