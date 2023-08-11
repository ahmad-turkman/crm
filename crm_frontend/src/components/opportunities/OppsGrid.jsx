import {
  ButtonToolbar,
  IconButton,
  Input,
  InputGroup,
  Pagination,
  Schema,
  Stack,
  Table,
  Tooltip,
  Whisper,
} from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import SearchIcon from '@rsuite/icons/Search';
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
import StackItem from 'rsuite/esm/Stack/StackItem';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import AddModal from './AddModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const { Column, HeaderCell, Cell } = Table;

const columns = [
  {
    key: 'customer',
    label: 'Customer',
    width: 200,
  },
  {
    key: 'customer_type',
    label: 'Customer Type',
    width: 200,
  },
  {
    key: 'product',
    label: 'Product',
    width: 200,
  },
  {
    key: 'description',
    label: 'Description',
    width: 200,
  },
  {
    key: 'status',
    label: 'Status',
    width: 200,
  },
  {
    key: 'probability',
    label: 'Probability',
    width: 200,
  },
  {
    key: 'creation_date',
    label: 'Creation Date',
    width: 200,
  },
];

const Grid = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [formValue, setFormValue] = useState({
    customer_id: '',
    product_id: '',
    step_id: '',
    description: '',
    status: '',
    creation_date: new Date(),
  });
  const [editFormValue, setEditFormValue] = useState({
    customer_id: '',
    product_id: '',
    step_id: '',
    description: '',
    status: '',
    creation_date: new Date(),
  });
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const { StringType, DateType } = Schema.Types;

  const model = Schema.Model({
    customer_id: StringType().isRequired('This field is required.'),
    product_id: StringType().isRequired('This field is required.'),
    step_id: StringType().isRequired('This field is required.'),
    description: StringType().isRequired('This field is required.'),
    status: StringType().isRequired('This field is required.'),
    creation_date: DateType().isRequired('This field is required.'),
  });

  const filteredData = () => {
    const filtered = data.filter((item) => {
      for (let key of Object.keys(item)) {
        let attr = (item[key] + '').toLowerCase();

        if (attr.includes(searchKeyword.toLowerCase())) {
          return true;
        }
      }
      return false;
    });

    if (sortColumn && sortType) {
      return filtered.sort((a, b) => {
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
    return filtered;
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('/opps')
      .then((res) => {
        setLoading(false);
        res.data.forEach((item) =>
          item.is_customer === '1'
            ? (item.customer_type = 'Customer')
            : (item.customer_type = 'Lead')
        );
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const handleOpenAdd = () => setOpenAdd(true);

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setFormValue({
      customer_id: '',
      product_id: '',
      step_id: '',
      description: '',
      status: '',
      creation_date: new Date(),
    });
  };

  const handleOpenEdit = (rowData) => {
    let mydata = {
      ...rowData,
      creation_date: rowData.creation_date
        ? new Date(rowData.creation_date)
        : new Date(),
    };
    setEditFormValue(mydata);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditFormValue({
      customer_id: '',
      product_id: '',
      step_id: '',
      description: '',
      status: '',
      creation_date: new Date(),
    });
  };

  const handleOpenDelete = (myid) => {
    setId(myid);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleAdd = (valid) => {
    let params = {
      ...formValue,
      creation_date: formValue.creation_date
        .toLocaleDateString()
        .replaceAll('/', '-'),
    };

    if (valid) {
      axios
        .post('/opps', null, {
          params: params,
        })
        .then((res) => {
          res.data.customer_type =
            res.data.is_customer === '1' ? 'Customer' : 'Lead';
          setData([...data, res.data]);
          handleCloseAdd();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEdit = (valid) => {
    let params = {
      ...editFormValue,
      creation_date: editFormValue.creation_date
        .toLocaleDateString()
        .replaceAll('/', '-'),
    };

    console.log(params);

    if (valid) {
      axios
        .put('/opps', null, {
          params: params,
        })
        .then((res) => {
          res.data.customer_type =
            res.data.is_customer === '1' ? 'Customer' : 'Lead';
          setData(
            data.map((item) =>
              item.id === res.data.id ? { ...res.data } : item
            )
          );
          handleCloseEdit();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = () => {
    axios
      .delete('/opps', {
        params: { id: id },
      })
      .then((res) => {
        setData(data.filter((item) => item.id !== res.data.id));
        handleCloseDelete();
      })
      .catch((err) => console.log(err));
  };

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    axios
      .get('/customers')
      .then((res) => {
        let selectData = res.data.map((item) => ({
          label:
            item.company_name +
            (item.is_customer === '1' ? ' (Customer)' : ' (Lead)'),
          value: item.id,
        }));
        setCustomers(selectData);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get('/products')
      .then((res) => {
        let selectData = res.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setProducts(selectData);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get('/steps')
      .then((res) => {
        let selectData = res.data.map((item) => ({
          number: item.number,
          label: `${item.description} (${item.percentage}%)`,
          value: item.id,
          percentage: item.percentage,
        }));
        setSteps(selectData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Stack direction="column" alignItems="stretch" style={{ height: '100%' }}>
        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
          List of opportunities
        </span>
        <ButtonToolbar>
          <Whisper
            placement="right"
            controlId="control-id-hover"
            trigger="hover"
            speaker={<Tooltip>Add</Tooltip>}
          >
            <IconButton icon={<PlusIcon />} onClick={handleOpenAdd} />
          </Whisper>
          <InputGroup inside style={{ width: '40%' }}>
            <Input
              placeholder="Search"
              value={searchKeyword}
              onChange={setSearchKeyword}
            />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </ButtonToolbar>
        <br />
        <StackItem flex={1}>
          <Table
            cellBordered
            bordered
            loading={loading}
            data={filteredData()}
            fillHeight
            wordWrap={'break-word'}
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
          >
            <Column width={150} fixed>
              <HeaderCell></HeaderCell>
              <Cell style={{ padding: '6px' }}>
                {(rowData) => (
                  <ButtonToolbar>
                    <Whisper
                      placement="right"
                      controlId="control-id-hover"
                      trigger="hover"
                      speaker={<Tooltip>Edit</Tooltip>}
                    >
                      <IconButton
                        icon={<EditIcon />}
                        onClick={() => handleOpenEdit(rowData)}
                      />
                    </Whisper>
                    <Whisper
                      placement="right"
                      controlId="control-id-hover"
                      trigger="hover"
                      speaker={<Tooltip>Delete</Tooltip>}
                    >
                      <IconButton
                        icon={<TrashIcon />}
                        onClick={() => handleOpenDelete(rowData.id)}
                      />
                    </Whisper>
                    <Whisper
                      placement="right"
                      controlId="control-id-hover"
                      trigger="hover"
                      speaker={<Tooltip>open</Tooltip>}
                    >
                      <Link
                        to={`/opps/${rowData.id}`}
                        state={{
                          ...data.filter((item) => item.id === rowData.id)[0],
                          steps: steps, //.filter(
                          // (item) =>
                          //   parseInt(item.value) >= parseInt(rowData.step_id)
                          // ),
                        }}
                      >
                        <IconButton icon={<FaEye />} />
                      </Link>
                    </Whisper>
                  </ButtonToolbar>
                )}
              </Cell>
            </Column>

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
      <AddModal
        open={openAdd}
        handleClose={handleCloseAdd}
        title="opportunity"
        model={model}
        setFormValue={setFormValue}
        formValue={formValue}
        handleOk={handleAdd}
        customers={customers}
        products={products}
        steps={steps}
      />
      <EditModal
        open={openEdit}
        handleClose={handleCloseEdit}
        title="opportunity"
        model={model}
        setFormValue={setEditFormValue}
        formValue={editFormValue}
        handleOk={handleEdit}
        customers={customers}
        products={products}
        steps={steps}
      />
      <DeleteModal
        open={openDelete}
        handleClose={handleCloseDelete}
        title="opportunity"
        handleOk={handleDelete}
      />
    </>
  );
};

export default Grid;
