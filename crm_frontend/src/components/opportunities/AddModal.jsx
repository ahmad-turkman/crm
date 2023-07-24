import {
  Button,
  ButtonToolbar,
  DatePicker,
  Form,
  InputPicker,
  Modal,
} from 'rsuite';

const AddModal = ({
  open,
  handleClose,
  title,
  model,
  setFormValue,
  formValue,
  handleOk,
  customers,
  products,
  steps,
}) => {
  const statusData = [
    {
      label: 'In progress',
      value: 'In progress',
    },
    {
      label: 'Won',
      value: 'Won',
    },
    {
      label: 'Lost',
      value: 'Lost',
    },
  ];

  return (
    <Modal open={open} onClose={handleClose} size="md">
      <Modal.Header>
        <Modal.Title>Add new {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          model={model}
          fluid
          onChange={setFormValue}
          formValue={formValue}
          onSubmit={handleOk}
          style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
        >
          <div style={{ height: '400px', overflowY: 'auto' }}>
            <Form.Group controlId="customer">
              <Form.ControlLabel>Customer</Form.ControlLabel>
              <Form.Control
                name="customer_id"
                accepter={InputPicker}
                data={customers}
              />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="product">
              <Form.ControlLabel>Product</Form.ControlLabel>
              <Form.Control
                name="product_id"
                accepter={InputPicker}
                data={products}
              />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="probability">
              <Form.ControlLabel>Step</Form.ControlLabel>
              <Form.Control
                name="step_id"
                accepter={InputPicker}
                data={steps}
              />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.ControlLabel>Description</Form.ControlLabel>
              <Form.Control name="description" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="status">
              <Form.ControlLabel>Status</Form.ControlLabel>
              <Form.Control
                name="status"
                accepter={InputPicker}
                data={statusData}
              />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="creation_date">
              <Form.ControlLabel>Creation Date</Form.ControlLabel>
              <Form.Control name="creation_date" accepter={DatePicker} />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
          </div>
          <div>
            <ButtonToolbar>
              <Button type="submit" appearance="primary">
                Ok
              </Button>
              <Button onClick={handleClose} appearance="subtle">
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
