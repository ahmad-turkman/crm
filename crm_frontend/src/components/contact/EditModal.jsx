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
        >
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
          <Form.Group controlId="email">
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control name="email" />
          </Form.Group>
          <ButtonToolbar>
            <Button type="submit" appearance="primary">
              Ok
            </Button>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
          </ButtonToolbar>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
