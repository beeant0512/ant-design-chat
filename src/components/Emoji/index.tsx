import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import React, { useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';

const Emoji = ({ onSelect }: { onSelect: (value: string) => void }) => {
  return (
    <>
      <Popover
        content={
          <Picker
            data={data}
            onEmojiSelect={(v: any) => {
              console.log(v);
              onSelect(v.native);
            }}
          />
        }
      >
        <Button type="text" icon={<SmileOutlined />} />
      </Popover>
    </>
  );
};

export default Emoji;
