import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const CustomEditor: React.FC<{}> = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  return (
    <div className="border border-border">
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
};

export default CustomEditor;
