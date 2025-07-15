import { requireUserSession } from "@/lib/auth";
import { getContacts } from "@/services/supabase/contacts/contacts";

export const loadContacts = async () => {
  const user = await requireUserSession();
  const contacts = await getContacts(user.id);
  return { contacts };
};

export const loadContactForm = async () => {
  await requireUserSession();
}
