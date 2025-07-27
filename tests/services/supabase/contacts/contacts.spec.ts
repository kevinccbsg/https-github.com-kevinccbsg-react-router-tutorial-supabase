import { signUpUser } from "../../../../src/services/supabase/auth/auth";
import { createContact, getContacts, deleteContact, updateFavoriteStatus, Contact } from "../../../../src/services/supabase/contacts/contacts";
import { cleanup, randomUserData } from "../setup";

let contact: Contact = {
  email: "max@example.com",
  favorite: false,
  firstName: "Max",
  lastName: "Mustermann",
  username: "maxmustermann",
  phone: "123456789",
  profileId: "profile-1",
  avatar: "https://example.com/avatar.jpg",
};

describe("Contacts Services", () => {
  let userId: string;
  beforeEach(async () => {
    await cleanup();
    const response = await signUpUser(randomUserData());
    userId = response.user!.id;
    contact = {
      ...contact,
      profileId: userId, // Use the signed-up user's ID as profileId
    };
  });

  it("should create a new contact and list it", async () => {
    await createContact(contact);
    const contacts = await getContacts(contact.profileId);
    expect(contacts).toHaveLength(1);
    expect(contacts[0]).toEqual({
      id: expect.any(String),
      email: contact.email,
      favorite: contact.favorite,
      firstName: contact.firstName,
      lastName: contact.lastName,
      username: contact.username,
      phone: contact.phone,
      profileId: contact.profileId,
      avatar: contact.avatar,
    });
  });

  it('should delete a contact', async () => {
    await createContact(contact);
    const contacts = await getContacts(contact.profileId);
    expect(contacts).toHaveLength(1);

    await deleteContact(contacts[0].id);
    const updatedContacts = await getContacts(contact.profileId);
    expect(updatedContacts).toHaveLength(0);
  });

  it('should update favorite contact', async () => {
    await createContact(contact);
    const contacts = await getContacts(contact.profileId);
    expect(contacts).toHaveLength(1);

    await updateFavoriteStatus(contacts[0].id, true);
    const updatedContacts = await getContacts(contact.profileId);
    expect(updatedContacts[0].favorite).toBe(true);
  });
});
