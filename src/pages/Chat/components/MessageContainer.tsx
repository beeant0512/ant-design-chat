import { ProCard } from '@ant-design/pro-components';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './MessageContailer.less';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SenderBox from '@/pages/Chat/components/SenderBox';
import { useWebSocket } from 'ahooks';

const MessageContainer = ({ group }: { group: IM.ChatGroup }) => {
  const [messages, setMessages] = useState<IM.ChatMessage[]>([]);
  const messageContainerRef = useRef<HTMLDivElement>();
  const isApp = group?.groupType === 'app';

  const { readyState, sendMessage, disconnect, connect } = useWebSocket(
    `ws://localhost:8080/websocket/${group.groupId}`,
    {
      onMessage: async (event) => {
        if (event.data instanceof Blob) {
          // binary frame
          const msg = await event.data.text();
          setMessages([...messages, JSON.parse(msg)]);
        } else {
          // text frame
          console.log(event.data);
        }
      },
    },
  );

  useMemo(() => {
    connect();
  }, []);

  const getContentByType = (message: IM.ChatMessage) => {
    if (message?.contentType === 'html') {
      return <iframe srcDoc={message?.content} style={{ border: 0 }}></iframe>;
    } else if (message?.contentType === 'markdown') {
      // return <ReactMarkdown>{message.content}</ReactMarkdown>;
    } else {
      return (
        <div dangerouslySetInnerHTML={{ __html: message?.content.replaceAll('\n', '<br />') }} />
      );
    }
  };
  console.log(messages);
  return (
    <>
      <ProCard
        className={isApp ? styles.appmessage : styles.message}
        title={group?.groupName}
        extra={<Button type={'text'} icon={<PlusOutlined />} />}
        ref={messageContainerRef}
      >
        {messages.map((message) => {
          return (
            <div key={message.id} style={{ marginBottom: '15px' }}>
              {message.is_show_time && (
                <div style={{ textAlign: 'center', width: '100%' }}>{message.show_time}</div>
              )}
              {!isApp && message.creator}
              <div style={{ width: 'fit-content' }}>{getContentByType(message)}</div>
            </div>
          );
        })}
      </ProCard>
      {/* 非应用类消息，显示输入框*/}
      {!isApp && <SenderBox group={group} sendMessage={sendMessage} />}
    </>
  );
};

export default MessageContainer;
