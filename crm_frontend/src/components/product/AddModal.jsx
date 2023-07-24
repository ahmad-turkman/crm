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
        <Modal.Title>Add new {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          model={model}
          fluid
          onChange={setFormValue}
          formValue={formValue}
          onSubmit={handleOk}
        >
          <Form.Group controlId="name">
            <Form.ControlLabel>Name</Form.ControlLabel>
            <Form.Control name="name" />
            <Form.HelpText>Required</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="price">
            <Form.ControlLabel>Price</Form.ControlLabel>
            <Form.Control name="price" />
            <Form.HelpText>Required</Form.HelpText>
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
