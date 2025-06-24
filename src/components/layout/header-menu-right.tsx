import { Badge, ActionIcon } from "rizzui";
import MessagesDropdown from "@layouts/messages-dropdown";
import ProfileMenu from "@layouts/profile-menu";
import RingBellSolidIcon from "@shared/components/icons/ring-bell-solid";
import ChatSolidIcon from "@shared/components/icons/chat-solid";
import NotificationDropdown from "./notification-dropdown";
import SettingsButton from "./settings-button";
import { IoStorefrontSharp } from "react-icons/io5";
import { BsHouse, BsHouseAddFill, BsHouseFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { routes } from "@/config/routes";

export default function HeaderMenuRight() {
  const navigate = useNavigate();

  return (
    <div className="ms-auto grid shrink-0 grid-cols-4 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      <NotificationDropdown>
        <ActionIcon
          aria-label="Notification"
          variant="text"
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
        >
          <RingBellSolidIcon className="h-[18px] w-auto" />
          <Badge
            renderAsDot
            color="danger"
            enableOutlineRing
            className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2 "
          />
        </ActionIcon>
      </NotificationDropdown>
      <MessagesDropdown>
        <ActionIcon
          aria-label="Messages"
          variant="text"
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
        >
          <ChatSolidIcon className="h-[18px] w-auto" />
          <Badge
            renderAsDot
            color="success"
            enableOutlineRing
            className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
          />
        </ActionIcon>
      </MessagesDropdown>
      <ActionIcon
        onClick={() => navigate(routes?.settings?.stores?.channels)}
        variant="outline"
        className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
      >
        <BsHouseFill className="h-[18px] w-auto" />
      </ActionIcon>
      <SettingsButton className="hidden" />
      <ProfileMenu />
    </div>
  );
}
