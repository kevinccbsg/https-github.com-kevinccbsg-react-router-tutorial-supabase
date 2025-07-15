import supabase from "../client/supabase";

interface Contact {
  email: string;
  favorite: boolean;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  profileId: string;
  avatar?: string;
}

export const createContact = async (contact: Contact) => {
  const { data, error } = await supabase
    .from('contacts')
    .insert([{
      email: contact.email,
      favorite: contact.favorite,
      first_name: contact.firstName,
      last_name: contact.lastName,
      username: contact.username,
      phone: contact.phone,
      avatar: contact.avatar,
      profile_id: contact.profileId,
    }]).select().single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
