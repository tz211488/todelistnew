import React from 'react';
import { Checkbox, Tag } from 'antd';
import { RightOutlined } from '@ant-design/icons';

interface ListItemProps {
  title: string;
  level?: number;
}

enum WidthStyle {
  'w-full',
  'w-5/6',
  'w-2/3',
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const { title, level = 0 } = props;

  const width = WidthStyle[level];

  const handleDragLeave = () => console.log('d');
  const handleDrop = () => console.log('d');
  const handleDragEnter = () => console.log('d');

  return (
    <div className="w-full flex justify-end">
      <div
        className={`${width} w-3/4 f-align-center justify-between space-x-4`}
        draggable="true"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragEnter}
        onDrop={handleDrop}
      >
        <div className="f-align-center space-x-2">
          <Checkbox className="leading-none" />
          <RightOutlined />
        </div>
        <div className="flex-auto">{title}</div>
        <div>
          <span>
            <Tag>dsdsds</Tag>
          </span>
          <span>删除</span>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
