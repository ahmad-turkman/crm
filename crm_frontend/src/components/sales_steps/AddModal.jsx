import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { FaSmile } from 'react-icons/fa';
import {
  Button,
  ButtonToolbar,
  Form,
  IconButton,
  Modal,
  Popover,
  Whisper,
} from 'rsuite';

const AddModal = ({
  open,
  handleClose,
  title,
  model,
  setFormValue,
  formValue,
  handleOk,
}) => {
  // const [emoji, setEmoji] = useState();

  // function onClick(emojiData, event) {
  //   console.log('emojiData', emojiData);

  //   setEmoji(emojiData.emoji);
  // }

  // const speaker = (
  //   <Popover>
  //     <EmojiPicker
  //       onEmojiClick={onClick}
  //       searchDisabled
  //       width={400}
  //       height={350}
  //       previewConfig={{ showPreview: false }}
  //     />
  //   </Popover>
  // );

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
          <Form.Group controlId="description">
            <Form.ControlLabel>Description</Form.ControlLabel>
            <Form.Control name="description" />
            <Form.HelpText>Required</Form.HelpText>
          </Form.Group>
          {/* <Form.Group controlId="emoji">
            <Form.ControlLabel>Emoji</Form.ControlLabel>
            <div style={{ display: 'flex' }}>
              <Whisper
                placement="bottom"
                trigger="click"
                controlId="control-id-click"
                speaker={speaker}
                enterable
              >
                <IconButton icon={<FaSmile />}></IconButton>
              </Whisper>
              <span style={{ display: 'inline-block', width: '40px' }}></span>

              <Form.Control
                name="emoji"
                id="emoji"
                value={emoji}
                style={{ width: '100px' }}
              />
            </div>
          </Form.Group> */}
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
