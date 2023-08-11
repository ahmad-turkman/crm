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

const { Column, HeaderCell, Cell } = Table;

const columns = [
  {
    key: 'company_name',
    label: 'Company Name',
    width: 200,
  },
  {
    key: 'address',
    label: 'Address',
    width: 200,
  },
  {
    key: 'fixed_phone',
    label: 'Fixed Phone',
    width: 200,
  },
  {
    key: 'mobile_phone',
    label: 'Mobile Phone',
    width: 200,
  },
  {
    key: 'email',
    label: 'Email',
    width: 200,
  },
  {
    key: 'manager_name',
    label: 'Manager Name',
    width: 200,
  },
  {
    key: 'turnover',
    label: 'Turnover',
    width: 200,
  },
  {
    key: 'workforce',
    label: 'Workforce',
    width: 200,
  },
  {
    key: 'creation_date',
    label: 'Creation Date',
    width: 200,
  },
  {
    key: 'register_number',
    label: 'Register Number',
    width: 200,
  },
  {
    key: 'website',
    label: 'Website',
    width: 200,
  },
];

const Grid = ({ isLead }) => {
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [formValue, setFormValue] = useState({
    address: '',
    company_name: '',

    email: '',
    fixed_phone: '',
    manager_name: '',
    mobile_phone: '',
    register_number: '',
    turnover: '',
    website: '',
    workforce: '',
  });
  const [editFormValue, setEditFormValue] = useState({
    address: '',
    company_name: '',

    email: '',
    fixed_phone: '',
    manager_name: '',
    mobile_phone: '',
    register_number: '',
    turnover: '',
    website: '',
    workforce: '',
  });
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const { StringType } = Schema.Types;

  const model = Schema.Model({
    company_name: StringType().isRequired('This field is required.'),
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
      .get('/customers', { params: { is_customer: isLead ? 0 : 1 } })
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [isLead]);

  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const handleOpenAdd = () => setOpenAdd(true);

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setFormValue({
      address: '',
      company_name: '',
      email: '',
      fixed_phone: '',
      manager_name: '',
      mobile_phone: '',
      register_number: '',
      turnover: '',
      website: '',
      workforce: '',
    });
  };

  const handleOpenEdit = (rowData) => {
    let mydata = {
      ...rowData,
      creation_date: rowData.creation_date
        ? new Date(rowData.creation_date)
        : null,
    };

    setEditFormValue(mydata);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditFormValue({
      address: '',
      company_name: '',
      email: '',
      fixed_phone: '',
      manager_name: '',
      mobile_phone: '',
      register_number: '',
      turnover: '',
      website: '',
      workforce: '',
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
    formValue.is_customer = isLead ? 0 : 1;

    let params = {
      ...formValue,
    };

    if (formValue.creation_date)
      params.creation_date = formValue.creation_date
        .toLocaleDateString()
        .replaceAll('/', '-');

    if (valid) {
      axios
        .post('/customers', null, {
          params: params,
        })
        .then((res) => {
          setData([...data, res.data]);
          handleCloseAdd();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEdit = (valid) => {
    let params = {
      ...editFormValue,
    };

    if (editFormValue.creation_date)
      params.creation_date = editFormValue.creation_date
        .toLocaleDateString()
        .replaceAll('/', '-');

    if (valid) {
      axios
        .put('/customers', null, {
          params: params,
        })
        .then((res) => {
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
    console.log(id);

    axios
      .delete('/customers', {
        params: { id: id },
      })
      .then((res) => {
        setData(data.filter((item) => item.id !== res.data.id));
        handleCloseDelete();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Stack direction="column" alignItems="stretch" style={{ height: '100%' }}>
        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
          List of Customers
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
            <Column width={100}>
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
        title="customer"
        model={model}
        setFormValue={setFormValue}
        formValue={formValue}
        handleOk={handleAdd}
      />
      <EditModal
        open={openEdit}
        handleClose={handleCloseEdit}
        title="customer"
        model={model}
        setFormValue={setEditFormValue}
        formValue={editFormValue}
        handleOk={handleEdit}
      />
      <DeleteModal
        open={openDelete}
        handleClose={handleCloseDelete}
        title="customer"
        handleOk={handleDelete}
      />
    </>
  );
};

export default Grid;
