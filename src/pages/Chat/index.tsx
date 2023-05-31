import { Button, Card } from 'antd';
import { ProFormTextArea, ProForm, ProFormInstance } from '@ant-design/pro-components';
import { PictureOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import Emoji from '@/components/Emoji';

const Chat = () => {
  const formRef = useRef<ProFormInstance>();

  return (
    <Card>
      <Emoji
        onSelect={(v) => {
          formRef.current?.setFieldsValue({
            comment: formRef.current?.getFieldValue('comment') + v,
          });
        }}
      />
      <Button type="text" icon={<PictureOutlined />}></Button>
      <Button type="text" icon={<UploadOutlined />}></Button>
      <ProForm formRef={formRef}>
        <ProFormTextArea name="comment" placeholder={'按Enter发送,Shift+Enter换行'} />
      </ProForm>
    </Card>
  );
};

export default Chat;
