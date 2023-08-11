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
    key: 'description',
    label: 'Description',
    width: 200,
  },
  {
    key: 'start_date',
    label: 'Start Date',
    width: 200,
  },
  {
    key: 'end_date',
    label: 'End Date',
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
    description: '',
    start_date: new Date(),
    end_date: new Date(),
  });
  const [editFormValue, setEditFormValue] = useState({
    description: '',
    start_date: new Date(),
    end_date: new Date(),
  });
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const { StringType, DateType } = Schema.Types;

  const model = Schema.Model({
    description: StringType().isRequired('This field is required.'),
    start_date: DateType()
      .isRequired('This field is required.')
      .addRule((value, data) => {
        if (value > data.end_date) return false;
        return true;
      }, 'start date must be before end date!'),
    end_date: DateType()
      .isRequired('This field is required.')
      .addRule((value, data) => {
        if (value < data.start_date) return false;
        return true;
      }, 'end date must be after start date!'),
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
      .get('/cap')
      .then((res) => {
        setLoading(false);

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
      description: '',
      start_date: new Date(),
      end_date: new Date(),
    });
  };

  const handleOpenEdit = (rowData) => {
    let mydata = {
      ...rowData,
      start_date: new Date(rowData.start_date),
      end_date: new Date(rowData.end_date),
    };
    setEditFormValue(mydata);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditFormValue({
      description: '',
      start_date: new Date(),
      end_date: new Date(),
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
      start_date: formValue.start_date
        .toLocaleDateString()
        .replaceAll('/', '-'),
      end_date: formValue.end_date.toLocaleDateString().replaceAll('/', '-'),
    };

    if (valid) {
      axios
        .post('/cap', null, {
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
      start_date: editFormValue.start_date
        .toLocaleDateString()
        .replaceAll('/', '-'),
      end_date: editFormValue.end_date
        .toLocaleDateString()
        .replaceAll('/', '-'),
    };

    if (valid) {
      axios
        .put('/cap', null, {
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
    axios
      .delete('/cap', {
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
          List of Commercial action plans
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
                        to={`/cap/${rowData.id}`}
                        state={{
                          ...data.filter((item) => item.id === rowData.id)[0],
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
        title="Commercial Action Plan"
        model={model}
        setFormValue={setFormValue}
        formValue={formValue}
        handleOk={handleAdd}
      />
      <EditModal
        open={openEdit}
        handleClose={handleCloseEdit}
        title="Commercial Action Plan"
        model={model}
        setFormValue={setEditFormValue}
        formValue={editFormValue}
        handleOk={handleEdit}
      />
      <DeleteModal
        open={openDelete}
        handleClose={handleCloseDelete}
        title="Commercial Action Plan"
        handleOk={handleDelete}
      />
    </>
  );
};

export default Grid;
