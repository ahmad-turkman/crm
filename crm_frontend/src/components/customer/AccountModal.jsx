import { useEffect, useState } from 'react';
import { Button, ButtonToolbar, DatePicker, Form, Modal } from 'rsuite';
import axios from '../../api/axios';

const AddModal = ({ open, handleClose, title, id }) => {
  const [formValue, setFormValue] = useState({});

  useEffect(() => {
    axios
      .get('/account', { params: { customer_id: id } })
      .then((res) => {
        setFormValue({
          ...res.data,
          creation_date: res.data.creation_date
            ? new Date(res.data.creation_date)
            : new Date(),
          expire_date: res.data.expire_date
            ? new Date(res.data.expire_date)
            : new Date(),
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleOk = () => {
    let params = formValue.id
      ? { ...formValue }
      : { ...formValue, customer_id: id };

    if (formValue.creation_date)
      params.creation_date = formValue.creation_date
        .toLocaleDateString()
        .replaceAll('/', '-');

    if (formValue.expire_date)
      params.expire_date = formValue.expire_date
        .toLocaleDateString()
        .replaceAll('/', '-');

    if (formValue.id)
      axios
        .put('/account', null, {
          params: params,
        })
        .then((res) => {
          handleClose(setFormValue);
        })
        .catch((err) => console.log(err));
    else
      axios
        .post('/account/create', null, {
          params: params,
        })
        .then((res) => {
          handleClose(setFormValue);
        })
        .catch((err) => console.log(err));
  };

  return (
    <Modal open={open} onClose={() => handleClose(setFormValue)} size="md">
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          fluid
          onChange={setFormValue}
          formValue={formValue}
          onSubmit={handleOk}
          style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
        >
          <div style={{ height: '400px', overflowY: 'auto' }}>
            <Form.Group controlId="username">
              <Form.ControlLabel>Username</Form.ControlLabel>
              <Form.Control name="username" />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.ControlLabel>Password</Form.ControlLabel>
              <Form.Control name="password" />
            </Form.Group>
            <Form.Group controlId="creation_date">
              <Form.ControlLabel>Creation Date</Form.ControlLabel>
              <Form.Control name="creation_date" accepter={DatePicker} />
            </Form.Group>
            <Form.Group controlId="expire_date">
              <Form.ControlLabel>Expire Date</Form.ControlLabel>
              <Form.Control name="expire_date" accepter={DatePicker} />
            </Form.Group>
          </div>
          <div>
            <ButtonToolbar>
              <Button type="submit" appearance="primary">
                Ok
              </Button>
              <Button
                onClick={() => handleClose(setFormValue)}
                appearance="subtle"
              >
                Cancel
              </Button>
            </ButtonToolbar>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
