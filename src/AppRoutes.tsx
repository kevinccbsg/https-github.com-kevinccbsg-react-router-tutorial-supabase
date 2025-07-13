import { createBrowserRouter } from "react-router";
import ContactsPage from "./pages/Contacts";
import ContactForm from "./pages/ContactForm";
import { loadContactForm, loadContacts } from "./pages/loader";
import ContactsSkeletonPage from "./Layouts/HomeSkeleton";
import ContactDetail from "./pages/ContactDetail";
import { contactDetailActions, contactsActions, newContactAction } from "./pages/actions";
import Signup from "./pages/auth/Signup";
import { signup } from "./pages/auth/actions";
import Login from "./pages/auth/Login";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    loader: loadContacts,
    id: "root",
    HydrateFallback: ContactsSkeletonPage,
    action: contactsActions,
    Component: ContactsPage,
    children: [
      {
        path: "contacts/:contactId",
        action: contactDetailActions,
        Component: ContactDetail,
      },
      {
        path: "contacts/new",
        loader: loadContactForm,
        action: newContactAction,
        Component: ContactForm,
      },
    ],
  },
  {
    path: "/signup",
    action: signup,
    Component: Signup,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/about",
    element: <div>About</div>,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

export default AppRoutes;
