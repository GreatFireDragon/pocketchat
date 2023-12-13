export function getTheme(event) {
  const newTheme = event.url.searchParams.get("theme");
  const cookieTheme = event.cookies.get("colortheme");

  let theme = newTheme ?? cookieTheme;
  return theme;
}

export function changeHTMLTheme(html, theme) {
  if (!theme) return html;
  return html.replace('data-theme=""', `data-theme="${theme}"`);
}
