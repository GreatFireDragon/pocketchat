import { redirect } from "@sveltejs/kit";
import { messagesFromError } from "$lib/utils";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  throw redirect(303, "/auth/login");
}

export const actions = {
  logout: async ({ locals }) => {
    await locals.userPb.authStore.clear();
    throw redirect(303, "/auth/login?message=loggedOut");
  },
  register: async ({ request, locals }) => {
    const form = await request.formData();

    const email = form.get("email") ?? "";
    const name = form.get("name") ?? "";
    const password = form.get("password") ?? "";
    const passwordConfirm = form.get("passwordConfirm") ?? "";

    // response object
    const registerResponse = {
      success: false,
      error: false,
      message: "",
    };

    // register new user
    try {
      const result = await locals.userPb.collection("users").create({
        email,
        name,
        password,
        passwordConfirm,
      });

      if (result) {
        registerResponse.success = true;
      }
    } catch (err) {
      registerResponse.error = true;
      registerResponse.message = messagesFromError(err);
    }

    // if user was created redirect to login
    if (registerResponse.success) throw redirect(303, "/auth/login");
    else return { ...registerResponse };
  },
  login: async ({ request, locals }) => {
    const form = await request.formData();

    const email = form.get("email") ?? "";
    const password = form.get("password") ?? "";

    // response object
    const loginResponse = {
      email,
      success: false,
      error: false,
      message: "",
    };

    // try to login user
    try {
      const record = await locals.userPb.collection("users").authWithPassword(email, password);

      if (record) {
        loginResponse.success = true;
      }
    } catch (err) {
      loginResponse.error = true;
      loginResponse.message = messagesFromError(err) || err.message;
    }

    // if user was created redirect to main
    if (locals.userPb.authStore.isValid) {
      throw redirect(303, "/");
    }

    return { ...loginResponse };
  },
};
