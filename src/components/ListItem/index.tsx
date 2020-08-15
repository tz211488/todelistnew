import React from 'react';
import { Checkbox, Tag } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';
import { taskMenu } from '@/components/ModalMenu/TaskMenu';

interface ListItemProps {
  dataSource: any;
  level?: number;
  dispatch: Dispatch;
}

enum WidthStyle {
  'w-full',
  'w-5/6',
  'w-2/3',
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const { dispatch, dataSource } = props;
  const { uid, level = 0, title } = dataSource;

  const width = WidthStyle[level];

  const handleDragLeave = () => console.log('d');
  const handleDrop = () => console.log('d');
  const handleDragEnter = () => console.log('d');

  const handleTitleChange = (e: any) => {
    if (!e.target.value) return;

    dispatch({
      type: 'tasks/updateTask',
      payload: {
        uid,
        title: e.target.value,
      },
    });
  };

  const handleDelete = () => {
    dispatch({
      type: 'tasks/deleteTask',
      payload: {
        uid,
      },
    });
  };

  const handleRightClick = (e: any) => {
    const { clientX, clientY } = e;
    console.log('right click - ---------', { clientX, clientY });
    e.preventDefault();
    taskMenu.show(<div className="bg-red-600 w-64 h-64">fasdfasdf</div>, { clientX, clientY });
  };

  return (
    <div className="w-full flex justify-end" onContextMenu={handleRightClick}>
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
            <span className="cursor-pointer" onClick={handleDelete}>
              删除
            </span>
          </div>
        </div>
        <div className="pl-16">dfgsdfgsdfgsdfg</div>
      </div>
    </div>
  );
};

export default connect()(ListItem);
