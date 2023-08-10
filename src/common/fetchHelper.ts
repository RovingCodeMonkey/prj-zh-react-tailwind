const defaultSettings: RequestInit = {
  method: "POST", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
};

const safeFetch = async function <T>(
  url: string,
  settings: RequestInit,
): Promise<T> {
  return new Promise((resolve, reject) => {
    fetch(url, settings)
      .then((response) => {
        if (!response.ok) {
          return reject({
            status: response.status,
            message: response.statusText,
          });
        }
        resolve(response.json());
      })
      .catch((e: Error) => {
        reject({ status: -1, message: e.message });
      });
  });
};

const postFetch = async function <T>(url = "", data = {}): Promise<T> {
  return safeFetch<T>(url, {
    ...defaultSettings,
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
};

const deleteFetch = async function <T>(url = ""): Promise<T> {
  return safeFetch<T>(url, {
    ...defaultSettings,
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
  });
};

export { postFetch, deleteFetch };
