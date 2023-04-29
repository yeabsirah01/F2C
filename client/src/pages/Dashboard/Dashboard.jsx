// import "./styles.css";
import { FaShoppingCart } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { SiShopify } from "react-icons/si";
import NavItem from "./navItem";
import { useState } from "react";
import { logout } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
// const Dashboard = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };
//   const { role, firstName } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   return (
//     <div className={isOpen ? "layout open" : "layout"}>
//       <div className="sidebar">
//         <ul className="navItems">
//           {isOpen ? (
//             <VscChromeClose onClick={toggleSidebar} className="hamburger" />
//           ) : (
//             <GiHamburgerMenu onClick={toggleSidebar} className="hamburger" />
//           )}
//           <NavItem Icon={AiFillHome} label="Home" to="/" />

//           {role === "Farmer" && (
//             <>
//               <NavItem Icon={MdAddCircle} label="Create product" to="create" />
//               <NavItem Icon={FaUserCircle} label="Profile" to="profile" />
//             </>
//           )}
//           {role === "Admin" && (
//             <>
//               <NavItem Icon={MdAddCircle} label="Waitlist" to="wait" />
//             </>
//           )}
//           <NavItem Icon={FaShoppingCart} label="Cart" to="cart" />
//         </ul>
//         <div className="logout">
//           <BiLogOutCircle
//             onClick={() => {
//               dispatch(logout());
//             }}
//           />
//         </div>
//       </div>
//       <div className="content">
//         <header>
//           <div>
//             <SiShopify />
//             <p>Shoplify</p>
//           </div>
//           <p>Hi, {firstName}</p>
//         </header>
//         {children}
//       </div>
//     </div>
//   );
// };

import {
  AppShell,
  Header,
  Navbar,
  Footer,
  MediaQuery,
  Burger,
  ScrollArea,
} from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import CreateProduct from "./../../pages/createProduct/index";
import Profile from "./../../pages/profile";

function Dashboard({ children }) {
  const { role, firstName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      navbar={
        <Navbar width={{ base: 300 }} hiddenBreakpoint="sm" hidden={!opened}>
          {/* Navbar content */}

          <div className="sidebar">
            <ul className="navItems">
              <NavItem Icon={AiFillHome} label="Home" to="/dashboard/" />

              {role === "Farmer" && (
                <>
                  <NavItem
                    Icon={MdAddCircle}
                    label="Create product"
                    to="create"
                  />
                  <NavItem Icon={FaUserCircle} label="Profile" to="profile" />
                </>
              )}
              {role === "Admin" && (
                <>
                  <NavItem
                    Icon={MdAddCircle}
                    label="Waitlist"
                    to="dashboard/wait"
                  />
                </>
              )}
              <NavItem Icon={FaShoppingCart} label="Cart" to="cart" />
            </ul>
            <div className="logout">
              <BiLogOutCircle
                onClick={() => {
                  dispatch(logout());
                }}
              />
            </div>
          </div>
        </Navbar>
      }
      burger={<Burger opened={opened} onClick={() => setOpened(!opened)} />}
      footer={
        <Footer height={60} padding="md">
          {/* Footer content */}
        </Footer>
      }
    >
      <Routes>
        <Route exact path="/create" element={<CreateProduct />}></Route>
        <Route exact path="/waitlist" element={<CreateProduct />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
      </Routes>
    </AppShell>
  );
}

export default Dashboard;
