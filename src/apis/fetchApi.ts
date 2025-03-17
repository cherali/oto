"use server";
export async function fetchApi<T>(url: string, options: RequestInit) {
  try {
    // TODO: add auth token to options before passing it to fetch
    const response = await fetch(url, options);

    // TODO: error handing goes here (e.g. 401, 403, ...)
    return (await response.json()) as T;
  } catch (error) {
    throw new Error(error as string);
  }
}
