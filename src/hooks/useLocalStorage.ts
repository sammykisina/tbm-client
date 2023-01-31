const useLocalStorage = () => {
  const storeItem = (key: string, value: string | object) =>
    localStorage.setItem(key, JSON.stringify(value));

  const getItem = (key: string) => localStorage.getItem(JSON.parse(key));

  const removeItem = (key: string) => localStorage.removeItem(key);

  return {
    storeItem,
    getItem,
    removeItem,
  };
};

export default useLocalStorage;
