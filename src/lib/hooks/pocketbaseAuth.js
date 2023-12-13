import PocketBase from "pocketbase";
import { SECRET_PB_EMAIL, SECRET_PB_PASSWORD } from "$env/static/private";
import chalk from "chalk";

export async function PocketBaseAuthBefore(event) {
  // const adminPb = new PocketBase("http://127.0.0.1:8090");
  const userPb = new PocketBase("http://127.0.0.1:8090");

  // sign-in
  // await adminPb.admins.authWithPassword(SECRET_PB_EMAIL, SECRET_PB_PASSWORD);
  // event.locals.adminPb = adminPb;
  event.locals.userPb = userPb;

  // load the authstore from the cookie
  event.locals.userPb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");

  // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
  try {
    event.locals.userPb.authStore.isValid &&
      (await event.locals.userPb.collection("users").authRefresh());
    // spread a model to lcoals.user to be awailable in all pages
    event.locals.user = { ...event.locals.userPb.authStore.model };
  } catch (_) {
    console.log(chalk.red.bgRed.bold.black("Failed to refresh auth model!"));
    // clear the auth store on failed refresh
    event.locals.userPb?.authStore.clear();
  }
}

// set a cookie
export function PocketBaseAuthAfter(event, response) {
  response.headers.append("set-cookie", event.locals.userPb.authStore.exportToCookie());
}
