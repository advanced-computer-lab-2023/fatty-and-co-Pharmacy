// import
import Dashboard from "views/Dashboard/Dashboard";
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import RTLPage from "views/Dashboard/RTL";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import MedicinePharmacist from "views/Pharmacist/Medicine/medicine";
import MedicineAdmin from "views/Admin/Medicine/medicine";
import MedicinePatient from "views/Patient/Medicine/medicine";
import ViewPatientDetails from "views/Admin/ViewPatientDetails";
import ViewPharmacistDetails from "views/Admin/ViewPharmacistDetails";
import DeleteUser from "views/Admin/DeleteUser/DeleteUserForm"
import CreateAdmin from "views/Admin/CreateAdmin/CreateAdminForm"
import Requests from "views/Admin/Requests";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";
import pharmSignUp from "views/Auth/pharmSignUp";

var dashRoutes = [
  {
    path: "/MedicinePharmacist",
    name: "Medicine Pharmacist",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: MedicinePharmacist,
    layout: "/admin",
  },
  {
    path: "/MedicineAdmin",
    name: "Medicine Admin",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: MedicineAdmin,
    layout: "/admin",
  },
  {
    path: "/MedicinePatient",
    name: "Medicine Patient",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: MedicinePatient,
    layout: "/admin",
  },
  {
    path: "/viewRequests",
    name: "View Requests",
    icon: <HomeIcon color="inherit" />,
    component: Requests,
    layout: "/admin",
  },
  {
    path: "/addAdmin",
    name: "Add Admin",
    icon: <HomeIcon color="inherit" />,
    component: CreateAdmin,
    layout: "/admin",
  },
  {
    path: "/deleteUser",
    name: "Delete User",
    icon: <HomeIcon color="inherit" />,
    component: DeleteUser,

    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/viewpatient",
    name: "View Patient",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: ViewPatientDetails,
    layout: "/admin",
  },
  {
    path: "/viewpharmacist",
    name: "View Pharmacist",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: ViewPharmacistDetails,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Billing",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color="inherit" />,
    component: Billing,
    layout: "/admin",
  },
  {
    path: "/rtl-support-page",
    name: "RTL",
    rtlName: "آرتيإل",
    icon: <SupportIcon color="inherit" />,
    component: RTLPage,
    layout: "/rtl",
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign In",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      },
      {
        path: "/pharmSignUp",
        name: "Register as a Pharmacist",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: pharmSignUp,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
