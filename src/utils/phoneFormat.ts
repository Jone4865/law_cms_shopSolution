export const phoneFormat = (str: string) => {
  if (str.replaceAll('-', '').length <= 8) {
    return str.replace(/^(\d{3,4})(\d{4})$/, '$1-$2');
  } else {
    return str.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');
  }
};
