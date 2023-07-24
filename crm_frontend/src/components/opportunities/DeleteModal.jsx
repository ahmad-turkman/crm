import { Button, ButtonToolbar, Modal } from 'rsuite';

const AddModal = ({ open, handleClose, title, handleOk }) => {
  return (
    <Modal open={open} onClose={handleClose} size="xs">
      <Modal.Header>
        <Modal.Title>Delete {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>Are you sure you want to delete {title}?</div>
        <br />
        <ButtonToolbar>
          <Button type="submit" onClick={handleOk} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </ButtonToolbar>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
