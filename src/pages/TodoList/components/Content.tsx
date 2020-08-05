import React from 'react';
import { Input, Select, List } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';
import ListItem from '@/components/ListItem';

const { Option } = Select;

export interface SubPageHeaderProps {
  right?: React.ReactNode;
  dispatch: Dispatch;
  collapsed: boolean;
}

const Content: React.FC<SubPageHeaderProps> = (props) => {
  const { dispatch, collapsed } = props;
  const data = ['dsadfadsf', 'sdfasdfasdf', 'sdfasdfasdf'];

  console.log(dispatch);
  console.log(collapsed);

  return (
    <div className="px-4 space-y-4">
      <div>
        <Input className="custom-input-rd" suffix={<CaretDownOutlined />} />
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
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <ListItem title={item} />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default connect(({ global }: ConnectState) => ({
  collapsed: global.collapsed,
}))(Content);
