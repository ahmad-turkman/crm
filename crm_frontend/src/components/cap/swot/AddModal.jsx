import { Button, ButtonToolbar, Form, Modal } from 'rsuite';

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
    <Modal open={open} onClose={handleClose} size="sm">
      <Modal.Body>
        <Form
          model={model}
          fluid
          onChange={setFormValue}
          formValue={formValue}
          onSubmit={handleOk}
          style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
        >
          <div style={{ height: '100px', overflowY: 'auto' }}>
            <Form.Group controlId="description">
              <Form.ControlLabel>Description</Form.ControlLabel>
              <Form.Control name="description" />
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
