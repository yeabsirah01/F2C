import { Menu, Text, Avatar } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconDashboard,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons-react";
import { logout } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

function AvatarIcon() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, firstName } = useSelector((state) => state.user);
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <div>
          <Avatar
            radius="xl"
            size="lg"
            color="green"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
          />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        {/* <Menu.Label>{name}</Menu.Label> */}
        Hello {firstName}
        <Menu.Item
          icon={<IconDashboard size={14} />}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item
          icon={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Danger zone</Menu.Label>
        {role === "Consumer" ? (
          <Menu.Item
            icon={<IconArrowsLeftRight size={14} />}
            onClick={() => navigate("/applyfarmer")}
          >
            Upgrade to Farmer
          </Menu.Item>
        ) : null}
        <Menu.Item
          onClick={() => {
            dispatch(logout());
            toast.success("Loggedout succesfully");
          }}
          color="red"
          icon={<IconTrash size={14} />}
        >
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default AvatarIcon;
