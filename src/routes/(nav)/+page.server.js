import { error, redirect } from "@sveltejs/kit";
import { messagesFromError } from "$lib/utils";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  let messagesArr = [];
  try {
    const resultList = await locals.userPb.collection("chat").getList(1, 20, {
      sort: "created",
      expand: "user",
    });

    messagesArr = resultList.items.map((el) => {
      return { user: el.expand.user, text: el.text, id: el.id };
    });
  } catch (err) {
    throw error(420, "Enhance your calm");
  }

  return {
    messages: messagesArr,
  };
}

const actions = {
  changeTheme: async ({ url, cookies }) => {
    const theme = url.searchParams.get("theme");
    const redirectTo = url.searchParams.get("redirectTo");

    if (theme) {
      cookies.set("colortheme", theme, { secure: false, path: "/" });
    }

    throw redirect(303, redirectTo ?? "/");
  },
  publishMessage: async ({ request, locals }) => {
    const form = await request.formData();
    const text = form.get("text");
    const user = form.get("userId");

    const responsePublish = {
      success: false,
      error: false,
      message: "",
    };

    try {
      const record = await locals.userPb.collection("chat").create({ text, user });

      if (record) {
        responsePublish.success = true;
      }
    } catch (err) {
      responsePublish.error = true;
      responsePublish.message = messagesFromError(err);
    }

    return responsePublish;
  },
  deleteMessage: async ({ request, locals }) => {
    const form = await request.formData();
    const id = form.get("id");

    const responseDelete = {
      success: false,
      error: false,
      message: "",
    };

    try {
      const record = await locals.userPb.collection("chat").delete(id);

      if (record) {
        responseDelete.success = true;
      }
    } catch (err) {
      responseDelete.error = true;
      responseDelete.message = messagesFromError(err);
    }

    return responseDelete;
  },
};

export { actions };
