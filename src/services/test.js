export const testApi = async () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('successful');
    }, 1000);
  });
