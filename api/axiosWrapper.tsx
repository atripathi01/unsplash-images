import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_APP_BASE_URL;

export type ResponseType<T = any> = {
  status: string;
  data: T;
};

export type RequestType<T> = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  url?: string;
  headers?: Record<string, string>;
  body?: T;
  defaultHeaders?: boolean;
};

export const AxiosWrapper = async <T extends {}, K = Record<string, any>>(
  req: RequestType<K>
): Promise<ResponseType<T>> => {
  const { body, defaultHeaders, headers, method, url } = req;

  return new Promise<ResponseType<T>>((resolve, reject) => {
    let finalHeaders = headers;

    if (defaultHeaders)
      finalHeaders = {
        ...headers,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

    axios({
      //@ts-ignore
      method: method.toLowerCase(),
      url,
      headers: finalHeaders,
      data: body,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
