import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PageContainerProps } from '@ant-design/pro-layout/lib/PageContainer';
import { PageHeaderProps } from 'antd/es/page-header';

import SubPageHeader from '@/components/SubPageHeader';

const HeaderRightContent: React.FC<{}> = () => {
  return <div>asdfas</div>;
};

const SubHeader: React.FC<PageContainerProps> = () => {
  return <SubPageHeader right={<HeaderRightContent />} />;
};

const TodayList: React.FC<PageHeaderProps> = () => (
  <PageContainer title="hahah" pageHeaderRender={SubHeader}>
    <div>sd</div>
  </PageContainer>
);

export default TodayList;
