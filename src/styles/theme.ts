const size = {
  mobile: '768px',
  desktop: '1368px',
  tablet: '1367px',
};

const theme = {
  mobile: `(max-width: ${size.mobile})`,
  desktop: `(min-width: ${size.desktop})`,
  tablet: `(max-width: ${size.tablet})`,
};

export default theme;
