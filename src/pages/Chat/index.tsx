import { ProCard } from '@ant-design/pro-components';
import React, { useState } from 'react';
import MessageContainer from '@/pages/Chat/components/MessageContainer';

const Chat = () => {
  const [group, setGroup] = useState<IM.ChatGroup>({
    groupAvatar: '',
    groupName: 'demo',
    groupType: '',
    latestMessage: '',
    latestMessageAt: '',
    online: 0,
    groupId: '1',
  });

  return (
    <ProCard split="vertical">
      <ProCard colSpan={'300px'} className="left-card">
        {/*<ChatGroup*/}
        {/*  onClick={(value) => {*/}
        {/*    setGroup(value);*/}
        {/*  }}*/}
        {/*/>*/}
      </ProCard>
      <ProCard className="right-card" split="vertical">
        {<MessageContainer group={group} />}
      </ProCard>
    </ProCard>
  );
};

export default Chat;
