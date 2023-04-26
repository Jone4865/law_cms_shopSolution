import { useMediaQuery } from 'react-responsive';

function useResponsive() {
  const isLessThanEitherTablet = useMediaQuery({
    query: '(max-width: 1367px)',
  });
  const isLessThanEitherMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  return {
    isLessThanEitherTablet,
    isLessThanEitherMobile,
  } as const;
}

export default useResponsive;
