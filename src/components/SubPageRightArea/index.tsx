import React from 'react';
import { connect } from 'umi';
import { ConnectState } from '@/models/connect';
import SubPageHeader from './components/Header';

interface SubPageRightContentProps {
  title?: string;
}

const SubPageRightContent: React.FC<SubPageRightContentProps> = () => {
  return (
    <>
      <SubPageHeader />
    </>
  );
};

export default connect(({ global }: ConnectState) => ({
  collapsed: global.collapsed,
}))(SubPageRightContent);
