// import
import Dashboard from "views/Dashboard/Dashboard";
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import RTLPage from "views/Dashboard/RTL";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import ViewPatientDetails from "views/Admin/ViewPatientDetails";
import AdminMedicine from "views/Admin/Medicine/adminMedicine";
import PharmacistMedicine from "views/Pharmacist/Medicine/pharmacistMedicine";
import PatientMedicine from "views/Patient/Medicine/pateintMedicine";
import ViewPharmacistDetails from "views/Admin/ViewPharmacistDetails";
import DeleteUser from "views/Admin/DeleteUser/DeleteUserForm";
import CreateAdmin from "views/Admin/CreateAdmin/CreateAdminForm";
import Requests from "views/Admin/Requests";
import CartTable from "views/Patient/Medicine/components/Cart";
import Checkout from "views/Patient/Medicine/components/Checkout";

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
    path: "/adminmedicine",
    name: "Admin Medicine",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: AdminMedicine,
    layout: "/admin",
  },
  {
    path: "/pharmacistmedicine",
    name: "Pharmacist Medicine",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: PharmacistMedicine,
    layout: "/pharmacist",
  },
  {
    path: "/patientmedicine",
    name: "Patient Medicine",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: PatientMedicine,
    layout: "/patient",
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
    path: "/cart",
    name: "Cart",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: CartTable,
    layout: "/patient",
  },
  {
    path: "/checkout",
    name: "Checkout",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: Checkout,
    layout: "/patient",
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
    path: "/cardPayment",
    name: "Credit Card Payment",
    rtlName: "آرتيإل",
    icon: <SupportIcon color="inherit" />,
    component: RTLPage,
    layout: "/Patient",
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
