import React, { useMemo, useRef } from 'react';
import Emoji from '@/components/Emoji';
import { Button, Card } from 'antd';
import { PictureOutlined, UploadOutlined } from '@ant-design/icons';
import { ProForm, ProFormInstance, ProFormTextArea } from '@ant-design/pro-components';
import { useKeyPress, useWebSocket } from 'ahooks';

const SenderBox = ({
  group,
  sendMessage,
}: {
  group: IM.ChatGroup;
  sendMessage: (v: any) => void;
}) => {
  const formRef = useRef<ProFormInstance>();
  const inputRef = useRef(null);

  useKeyPress(
    'shift.enter',
    () => {
      formRef.current?.submit();
    },
    {
      target: inputRef,
    },
  );

  return (
    <Card>
      <Emoji
        onSelect={(v) => {
          const oldValue = formRef.current?.getFieldValue('comment') || '';
          formRef.current?.setFieldsValue({
            comment: oldValue + v,
          });
        }}
      />
      <Button type="text" icon={<PictureOutlined />}></Button>
      <Button type="text" icon={<UploadOutlined />}></Button>
      <ProForm
        formRef={formRef}
        onFinish={async (v) => {
          sendMessage(v.comment);
          formRef.current?.resetFields();
        }}
      >
        <ProFormTextArea
          ref={inputRef}
          name="comment"
          placeholder={'按Enter发送,Shift+Enter换行'}
        />
      </ProForm>
    </Card>
  );
};

export default SenderBox;
