import { ActionFunctionArgs, redirect } from "react-router";
import { getUserSession, logout } from "@/lib/auth";
import { createContact, deleteContact, updateFavoriteStatus } from "@/services/supabase/contacts/contacts";

interface NewContact {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  avatar?: string;
}

export const newContactAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const method = request.method.toUpperCase();

  const handlers: Record<string, () => Promise<Response | { error: string; }>> = {
    POST: async () => {
      const newContact: NewContact = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        username: formData.get('username') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        avatar: formData.get('avatar') as string || undefined,
      };
      const user = await getUserSession();
      if (!user) {
        return redirect('/login');
      }
      const newContactResponse = await createContact({
        ...newContact,
        favorite: false, // Default value for new contacts
        profileId: user.id,
      });
      return redirect(`/contacts/${newContactResponse.id}`);
    },
  };

  if (handlers[method]) {
    return handlers[method]();
  }

  return null;
};

export const contactDetailActions = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const method = request.method.toUpperCase();

  const handlers: Record<string, () => Promise<Response | null>> = {
    DELETE: async () => {
      const id = formData.get("id") as string;
      await deleteContact(id);
      return redirect("/");
    },
    PATCH: async () => {
      const id = formData.get("id") as string;
      const favorite = formData.get("favorite") === "true";
      await updateFavoriteStatus(id, favorite);
      return null;
    },
  };

  if (handlers[method]) {
    return handlers[method]();
  }

  return null;
};

export const contactsActions = async ({ request }: ActionFunctionArgs) => {
  const method = request.method.toUpperCase();

  const handlers: Record<string, () => Promise<Response | null>> = {
    POST: async () => {
      await logout();
      return redirect('/login');
    },
  };

  if (handlers[method]) {
    return handlers[method]();
  }

  return null;
};
