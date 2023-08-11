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
        <Modal.Title>Edit {title}</Modal.Title>
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
            <Form.Group controlId="first_name">
              <Form.ControlLabel>First Name</Form.ControlLabel>
              <Form.Control name="first_name" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="last_name">
              <Form.ControlLabel>Last Name</Form.ControlLabel>
              <Form.Control name="last_name" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="address">
              <Form.ControlLabel>Address</Form.ControlLabel>
              <Form.Control name="address" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="birth_date">
              <Form.ControlLabel>Birth Date</Form.ControlLabel>
              <Form.Control name="birth_date" accepter={DatePicker} />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="employment_date">
              <Form.ControlLabel>Employment Date</Form.ControlLabel>
              <Form.Control name="employment_date" accepter={DatePicker} />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="role">
              <Form.ControlLabel>Role</Form.ControlLabel>
              <Form.Control name="role" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.ControlLabel>Phone</Form.ControlLabel>
              <Form.Control name="phone" />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="email" />
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
