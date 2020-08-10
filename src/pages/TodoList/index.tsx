import React from 'react';
// import { PageHeaderProps } from 'antd/es/page-header';
import { connect } from 'umi';

import SubPageHeader from '@/components/SubPageHeader';
import SubContent from './components/Content';

import { TaskModelState, Task } from './model';

// const HeaderRightContent: React.FC<{}> = () => {
//   return <div>asdfas</div>;
// };

// const SubHeader: React.FC<PageContainerProps> = () => {
//   return <SubPageHeader right={<HeaderRightContent />} />;
// };

export interface TodoListState {
  task: TaskModelState;
}

export interface TodoListProps {
  taskList: Array<Task>;
}

const TodayList: React.FC<TodoListProps> = (props) => {
  return (
    <>
      <SubPageHeader />
      <SubContent taskList={props.taskList} />
    </>
  );
};

export default connect(({ task }: TodoListState) => ({
  taskList: task.taskList,
}))(TodayList);
