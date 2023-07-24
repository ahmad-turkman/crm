import { Button, ButtonToolbar, DatePicker, Form, Modal } from 'rsuite';

const AddModal = ({
  open,
  handleClose,
  title,
  model,
  setFormValue,
  formValue,
  handleOk,
}) => {
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
            <Form.Group controlId="description">
              <Form.ControlLabel>Description</Form.ControlLabel>
              <Form.Control name="description" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>

            <Form.Group controlId="start_date">
              <Form.ControlLabel>Start Date</Form.ControlLabel>
              <Form.Control name="start_date" accepter={DatePicker} />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>

            <Form.Group controlId="end_date">
              <Form.ControlLabel>End Date</Form.ControlLabel>
              <Form.Control name="end_date" accepter={DatePicker} />
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
