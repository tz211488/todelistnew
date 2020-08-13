import React, { useState } from 'react';
import { Input, Select, List } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';

import ListItem from '@/components/ListItem';

const { Option } = Select;

export interface SubPageContentProps {
  right?: React.ReactNode;
  dispatch: Dispatch;
  collapsed: boolean;
  taskList: Array<any>;
  taskListInfo: {
    [key: string]: any;
  };
}

const initTaskState = {
  uid: '',
  title: '',
  description: '',
  child: [],
  parent: '',
  status: 0,
  progress: 0,
  tags: [],
  categorys: '',
  startTime: '',
  endTime: '',
  alertTime: '',
  alertType: '',
};

const Content: React.FC<SubPageContentProps> = (props) => {
  const { dispatch, collapsed, taskList, taskListInfo } = props;
  // const data = ['dsadfadsf', 'sdfasdfasdf', 'sdfasdfasdf'];
  const [inputValue, setInputVqlue] = useState('');

  console.log(dispatch);
  console.log(collapsed);

  const addTask = (e: any) => {
    if (!e.target.value) return;

    console.log(e.target.value);

    dispatch({
      type: 'task/addTask',
      payload: {
        ...initTaskState,
        ...{
          title: e.target.value,
        },
      },
    });

    setInputVqlue('');
  };

  return (
    <div className="px-4 space-y-4">
      <div>
        <Input
          onChange={(e) => setInputVqlue(e.target.value)}
          value={inputValue}
          className="custom-input-rd"
          suffix={<CaretDownOutlined />}
          onPressEnter={addTask}
        />
      </div>

      <div>
        <Select defaultValue="lucy" style={{ width: 120 }} disabled>
          <Option value="lucy">Lucy</Option>
        </Select>
      </div>

      <div>
        <List
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={taskList}
          renderItem={(item) => (
            <List.Item>
              <ListItem title={taskListInfo[item].title} />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default connect(({ global, tasks }: any) => ({
  collapsed: global.collapsed,
  taskListInfo: tasks.tasks.byId,
  taskLisk: tasks.tasks.allIds,
}))(Content);
