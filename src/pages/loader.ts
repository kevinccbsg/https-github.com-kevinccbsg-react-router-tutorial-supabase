import { fetchContacts, fetchContactById } from "@/api/contacts";
import { requireUserSession } from "@/lib/auth";
import { LoaderFunctionArgs } from "react-router";

export const loadContacts = async () => {
  await requireUserSession();
  const contacts = await fetchContacts();
  return { contacts };
};

export const loadContactDetail = async ({ params }: LoaderFunctionArgs) => {
  await requireUserSession();
  const contactId = params.contactId;
  if (!contactId) {
    throw new Error("Contact ID is required");
  }
  const contact = await fetchContactById(contactId);
  return { contact };
};

export const loadContactForm = async () => {
  await requireUserSession();
}
