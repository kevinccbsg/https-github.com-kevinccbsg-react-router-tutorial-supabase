import { loginUser, signUpUser } from "@/lib/auth";
import { ActionFunctionArgs, redirect } from "react-router";

export const signup = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const userPayload = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };
  await signUpUser(userPayload);
  return redirect('/');
};

export const login = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  await loginUser(email, password);
  return redirect('/');
};
