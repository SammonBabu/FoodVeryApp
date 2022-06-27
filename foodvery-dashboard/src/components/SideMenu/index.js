import { Menu, PageHeader } from "antd";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
const SideMenu = () => {
  const navigate = useNavigate();
  const { restaurant } = useRestaurantContext();

  const onClick = async (menuItem) => {
    if (menuItem.key === "signout") {
      await Auth.signOut();
      window.location.reload();
    } else {
      navigate(menuItem.key);
    }
  };

  const mainMenuItems = [
    {
      key: "/",
      label: "Orders",
    },
    {
      key: "menu",
      label: "Menu",
    },
    {
      key: "order-history",
      label: "Order History",
    },
  ];

  const menuItems = [
    ...(restaurant ? mainMenuItems : []),
    {
      key: "settings",
      label: "Settings",
    },
    {
      key: "signout",
      label: "Sign out",
      danger: "true",
    },
  ];

  return (
    <>
      {restaurant && (
        <PageHeader className="site-page-header" title={restaurant.name} />
      )}
      <Menu items={menuItems} onClick={onClick} />
    </>
  );
};

export default SideMenu;
