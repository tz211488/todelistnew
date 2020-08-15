import React, { useState } from 'react';
import { Input, Select, List } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';

import ListItem from '@/components/ListItem';

const { Option } = Select;

export interface SubPageContentProps {
  right?: React.ReactNode;
  dispatch: Dispatch;
  tasks: any;
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
  const { dispatch, tasks } = props;
  const { allIds: taskList, byId: taskListInfo } = tasks;
  // const data = ['dsadfadsf', 'sdfasdfasdf', 'sdfasdfasdf'];
  const [inputValue, setInputVqlue] = useState('');

  const addTask = (e: any) => {
    if (!e.target.value) return;

    dispatch({
      type: 'tasks/addTask',
      payload: {
        ...initTaskState,
        ...{
          title: e.target.value,
          uid: Date.now().toString(),
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
          renderItem={(item: string) => (
            <List.Item>
              <ListItem dataSource={taskListInfo[item]} />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default connect(({ tasks }: any) => ({
  tasks: tasks.tasks,
}))(Content);
