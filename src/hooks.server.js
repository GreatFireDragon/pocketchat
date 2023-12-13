import { getTheme, changeHTMLTheme } from "$lib/hooks/themesLogic";
import { loadingSpeedAfter, loadingSpeedBefore } from "./lib/hooks/loadingSpeed.";
import { PocketBaseAuthAfter, PocketBaseAuthBefore } from "./lib/hooks/pocketbaseAuth";

export async function handle({ event, resolve }) {
  if (event.route.id === "/(nav)" && !event.cookies.get("pb_auth")) {
    return new Response(null, {
      status: 302,
      headers: new Headers({
        Location: "/auth/login?message=You must be logged in to access this page",
        "Content-Type": "text/plain",
      }),
    });
  }

  await PocketBaseAuthBefore(event);

  const start = loadingSpeedBefore(); // needs to be right before the resolve
  const response = await resolve(event, {
    transformPageChunk: ({ html }) => {
      return changeHTMLTheme(html, getTheme(event));
    },
  });
  loadingSpeedAfter(start, event.route.id, 500); // needs to be right after the resolve

  PocketBaseAuthAfter(event, response);

  return response;
}
