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
          <Form.Group controlId="description">
            <Form.ControlLabel>Description</Form.ControlLabel>
            <Form.Control name="description" />
            <Form.HelpText>Required</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="percentage">
            <Form.ControlLabel>Percentage</Form.ControlLabel>
            <Form.Control name="percentage" />
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
