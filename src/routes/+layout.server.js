import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
  if (!locals.user) {
    throw redirect(303, "/auth/login");
  }

  return {
    user: locals.user,
  };
}
