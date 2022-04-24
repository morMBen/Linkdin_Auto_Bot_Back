export function getErrorMessage(error: unknown) {
  let message = '';
  if (error instanceof Error) message = error.message;
  return { message };
}
