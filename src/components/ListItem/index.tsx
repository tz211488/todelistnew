import React from 'react';
import { Checkbox, Tag } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';

interface ListItemProps {
  title: string;
  level?: number;
  dispatch: Dispatch;
}

enum WidthStyle {
  'w-full',
  'w-5/6',
  'w-2/3',
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const { title, level = 0, dispatch } = props;

  const width = WidthStyle[level];

  const handleDragLeave = () => console.log('d');
  const handleDrop = () => console.log('d');
  const handleDragEnter = () => console.log('d');

  const handleTitleChange = (e: any) => {
    if (!e.target.value) return;

    dispatch({
      type: 'task/updateTask',
      payload: {
        index: 1,
        attr: 'title',
        value: e.target.value,
      },
    });
  };

  return (
    <div className="w-full flex justify-end">
      <div
        className={`${width} w-3/4`}
        draggable="true"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragEnter}
        onDrop={handleDrop}
      >
        <div className="f-align-center justify-between space-x-4">
          <div className="f-align-center space-x-2">
            <Checkbox className="leading-none" />
            <RightOutlined />
          </div>
          <div className="flex-auto">
            <input onChange={handleTitleChange} value={title} />
          </div>
          <div>
            <span>
              <Tag>dsdsds</Tag>
            </span>
            <span>删除</span>
          </div>
        </div>
        <div className="pl-16">dfgsdfgsdfgsdfg</div>
      </div>
    </div>
  );
};

export default connect()(ListItem);
