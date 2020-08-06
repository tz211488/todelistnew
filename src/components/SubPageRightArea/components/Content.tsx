import React from 'react';

import { Input } from 'antd';
import CustomEditor from './Editor';

const { TextArea } = Input;

interface ContentProps {
  className: string;
}

const Content: React.FC<ContentProps> = (props) => {
  const { className } = props;
  return (
    <div className={`p-8 ${className}`}>
      <TextArea placeholder="Autosize height based on content lines" autoSize />
      <CustomEditor />
    </div>
  );
};

export default Content;
