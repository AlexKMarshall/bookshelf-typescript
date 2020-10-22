const API_URL = process.env.REACT_APP_API_URL;

export type ErrorResponse = {
  status: number;
  message: string;
};

function client<ResponseType>(endpoint: string): Promise<ResponseType> {
  if (!API_URL) {
    throw new Error("No API url specified in config!");
  }

  const fullUrl = `${API_URL}/${endpoint}`;

  return window.fetch(fullUrl).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data as ResponseType;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client };
