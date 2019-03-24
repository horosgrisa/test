export const sendData = async (url, method, data) => {
  const rawResponse = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: !['GET', 'HEAD'].includes(method) ? JSON.stringify(
      data,
    ) : null,
  });

  return rawResponse.json();
};
