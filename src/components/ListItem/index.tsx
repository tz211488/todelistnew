import React, { useState } from 'react';
import { Checkbox, Tag } from 'antd';
import { RightOutlined, UnorderedListOutlined } from '@ant-design/icons';
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

  let timerFlag: any = null;

  const [isShowDragIcon, setShowDragIcon] = useState(false);
  // const [isItemDragable, setItemDragable] = useState(false)

  // const [isShowAddElement, setShowAddElement] = useState(true);
  const [isShowMainElement, setShowMainElement] = useState(false);
  const [isShowSubElement, setShowSubElement] = useState(false);

  const width = WidthStyle[level];
  const widthSub = WidthStyle[level + 1];

  const handleDragLeave = () => {
    console.log('leave', title);
    timerFlag = setTimeout(() => {
      setShowMainElement(false);
    }, 100);
  };
  const handleDrop = () => console.log('drop');
  const handleDragEnter = () => {
    console.log('enter');
    setShowMainElement(true);
    setShowSubElement(false);
  };
  const handleDrag = () => console.log('drag - - UP', title);
  const handleDragEnd = () => {
    // setShowDragIcon(false);
    console.log('end', title);
  };
  const handleDragStart = () => console.log('start');
  const handleDragOver = () => {
    console.log('over', title);
    // setShowAddElement(true)
    clearTimeout(timerFlag);
    setShowMainElement(true);
    setShowSubElement(false);
  };

  const handleDragEnterAddMain = () => {
    console.log('Enter', 'AddMain');
    clearTimeout(timerFlag);
    setShowMainElement(true);
  };
  const handleDragOverAddMain = (e: any) => {
    console.log('Over', 'AddMain');
    e.stopPropagation();
    e.preventDefault();
    clearTimeout(timerFlag);
    setShowMainElement(true);
  };

  const handleDragOverAddSub = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Over', 'AddSub');
    clearTimeout(timerFlag);
    setShowSubElement(true);
  };

  const handleDragDropAddMain = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setShowMainElement(false);

    console.log('add main item');
  };

  const handleDragDropAddSub = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setShowMainElement(false);

    console.log('add sub item');
  };

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

  // const handleClick = (e: any) => {
  //   if (e.shiftKey) {
  //     console.log('hhahahha', 'shift');
  //   }
  // };

  return (
    <div
      className="w-full"
      draggable={isShowDragIcon}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onDrag={handleDrag}
    >
      <div className="w-full flex justify-end" onContextMenu={handleRightClick}>
        <div className={`${width} w-3/4`}>
          <div className="f-align-center justify-between space-x-4">
            <div className="f-align-center space-x-2 relative">
              <Checkbox className="leading-none" />
              <RightOutlined />

              <div
                className="absolute bg-red-600 task-item-drag-icon leading-none cursor-pointer"
                onFocus={() => console.log('ad')}
                onMouseLeave={() => setShowDragIcon(false)}
                onMouseOver={() => setShowDragIcon(true)}
              >
                {isShowDragIcon ? (
                  <UnorderedListOutlined className="leading-none text-base" />
                ) : null}
              </div>
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

      <div className="flex justify-end">
        {isShowMainElement ? (
          <div
            onDragEnter={handleDragEnterAddMain}
            onDrop={handleDragDropAddMain}
            onDragOver={handleDragOverAddMain}
            className={`${width} h-12 ${isShowSubElement ? '' : 'bg-gray-600'} flex justify-end`}
          >
            <div
              onDragOver={handleDragOverAddSub}
              onDrop={handleDragDropAddSub}
              className={`${widthSub} w-3/4 h-12 ${isShowSubElement ? 'bg-gray-600' : ''}`}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default connect()(ListItem);
