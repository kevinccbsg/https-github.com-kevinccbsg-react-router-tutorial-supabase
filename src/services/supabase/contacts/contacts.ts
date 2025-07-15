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

export const getContacts = async (profileId: string) => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('profile_id', profileId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data.map(contact => ({
    id: contact.id,
    email: contact.email,
    favorite: contact.favorite,
    firstName: contact.first_name,
    lastName: contact.last_name,
    username: contact.username,
    phone: contact.phone,
    profileId: contact.profile_id,
    avatar: contact.avatar || undefined,
  }));
};

