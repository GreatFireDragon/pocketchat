export function messagesFromError(err) {
  const data = err?.data?.data;

  if (!data) return null;

  const errorMessages = {};
  for (const key in data) {
    errorMessages[key] = data[key].message;
  }

  if (!Object.keys(errorMessages).length) return err.message;

  return errorMessages;
}
