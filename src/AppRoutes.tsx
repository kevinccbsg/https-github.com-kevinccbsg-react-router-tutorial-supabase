import { createBrowserRouter } from "react-router";
import ContactsPage from "./pages/Contacts";
import ContactForm from "./pages/ContactForm";
import { loadContacts } from "./pages/loader";
import ContactsSkeletonPage from "./Layouts/HomeSkeleton";
import ContactDetail from "./pages/ContactDetail";
import { contactDetailActions, newContactAction } from "./pages/actions";
import Signup from "./pages/auth/Signup";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    loader: loadContacts,
    id: "root",
    HydrateFallback: ContactsSkeletonPage,
    Component: ContactsPage,
    children: [
      {
        path: "contacts/:contactId",
        action: contactDetailActions,
        Component: ContactDetail,
      },
      {
        path: "contacts/new",
        action: newContactAction,
        Component: ContactForm,
      },
    ],
  },
  {
    path: "/signup",
    Component: Signup,
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
