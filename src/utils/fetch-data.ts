export const fetchData = async <T>(
  url: string,
  params: Record<string, string> = {},
): Promise<T> => {
  const searchParams = new URLSearchParams(params).toString();
  const response = await fetch(`${url}?${searchParams}`);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.status}`);
  }
  return response.json() as T;
};
