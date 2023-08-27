declare namespace IM {
  type ChatGroup = {
    groupName: string;
    groupId: string;
    groupAvatar: string;
    groupType: string;
    online: number;
    latestMessage: string;
    latestMessageAt: string;
  };

  type ChatMessage = {
    id: string;
    type: string;
    content: string;
    contentType: string;
    createBy: string;
    creator: string;
    createAt: string;
    show_time_type?: number;
    show_time?: string;
    is_show_time?: boolean;
  };
}
