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
            <Form.Group controlId="company_name">
              <Form.ControlLabel>Company Name</Form.ControlLabel>
              <Form.Control name="company_name" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="address">
              <Form.ControlLabel>Address</Form.ControlLabel>
              <Form.Control name="address" />
            </Form.Group>
            <Form.Group controlId="fixed_phone">
              <Form.ControlLabel>Fixed Phone</Form.ControlLabel>
              <Form.Control name="fixed_phone" />
            </Form.Group>
            <Form.Group controlId="mobile_phone">
              <Form.ControlLabel>Mobile Phone</Form.ControlLabel>
              <Form.Control name="mobile_phone" />
            </Form.Group>
            <Form.Group controlId="mobile_phone">
              <Form.ControlLabel>Mobile Phone</Form.ControlLabel>
              <Form.Control name="mobile_phone" />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="email" />
            </Form.Group>
            <Form.Group controlId="manager_name">
              <Form.ControlLabel>Manager Name</Form.ControlLabel>
              <Form.Control name="manager_name" />
            </Form.Group>
            <Form.Group controlId="turnover">
              <Form.ControlLabel>Turnover</Form.ControlLabel>
              <Form.Control name="turnover" />
            </Form.Group>
            <Form.Group controlId="workforce">
              <Form.ControlLabel>Workforce</Form.ControlLabel>
              <Form.Control name="workforce" />
            </Form.Group>
            <Form.Group controlId="creation_date">
              <Form.ControlLabel>Creation Date</Form.ControlLabel>
              <Form.Control name="creation_date" accepter={DatePicker} />
            </Form.Group>
            <Form.Group controlId="register_number">
              <Form.ControlLabel>Register Number</Form.ControlLabel>
              <Form.Control name="register_number" />
            </Form.Group>
            <Form.Group controlId="website">
              <Form.ControlLabel>Website</Form.ControlLabel>
              <Form.Control name="website" />
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
