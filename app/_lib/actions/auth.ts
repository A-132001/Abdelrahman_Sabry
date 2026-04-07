"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession, verifyCredentials } from "../auth";

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (!verifyCredentials(email, password)) {
    return { error: "Invalid email or password." };
  }

  await createSession();
  redirect("/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/login");
}
