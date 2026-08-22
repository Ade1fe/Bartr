import { Bell, BellRing } from "lucide-react";

interface NotificationBellProps {
  onClick?: () => void;
}

const NotificationBell = ({ onClick }: NotificationBellProps) => {

  return (
    <button onClick={onClick} className='relative p-2 text-gray-600 hover:text-gray-500 hover:cursor-pointer transition'>
      <Bell className='size-4.5' />
      {/* <BellRing className='size-7' /> */}
      {/* {unreadCount > 0 && (
        <span className='absolute top-2 right-2.5 h-1.5 w-1.5 bg-red-500 text-xs font-medium text-white items-center justify-center rounded-full animate-pulse'/>
    //   )} */}
    </button>
  );
};

export default NotificationBell;