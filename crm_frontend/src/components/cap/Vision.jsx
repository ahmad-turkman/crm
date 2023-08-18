import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'rsuite';
import axios from '../../api/axios';

const Vision = ({ cap }) => {
  const [vision, setVision] = useState({});

  const editorRef = useRef(null);
  const save = () => {
    if (editorRef.current) {
      let value = editorRef.current.getContent();

      if (vision.id)
        axios
          .put('/cap/vision', null, {
            params: { id: vision.id, description: value },
          })
          .then((res) => {})
          .catch((err) => console.log(err));
      else
        axios
          .post('/cap/vision', null, {
            params: { cap_id: cap.id, description: value },
          })
          .then((res) => {})
          .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    axios
      .get('/cap/vision', { params: { cap_id: cap.id } })
      .then((res) => {
        setVision(res.data);
      })
      .catch((err) => console.log(err));
  }, [cap]);

  return (
    <>
      <Button className="visionSave" onClick={save}>
        Save
      </Button>
      <Editor
        apiKey="kb8dzpdpji7spk2gmh177pir1ou920ryan5f5jl6a4ywbd1g"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={vision.description}
        init={{
          height: 360,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
    </>
  );
};

export default Vision;
