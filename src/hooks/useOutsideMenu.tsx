import { Dispatch, MutableRefObject, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';

const useOutsideMenu = (
  initialVisible: boolean = false,
): {
  ref: MutableRefObject<any>;
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
} => {
  const [isShow, setIsShow] = useState<boolean>(initialVisible);
  const ref = useRef<any>(null);

  const lockWidth = useMemo(() => window.innerWidth - document.body.offsetWidth, []);

  useEffect(() => {
    const bodyEl = document.body;

    bodyEl.style.paddingRight = isShow ? `${lockWidth}px` : '0px';
    isShow ? bodyEl.classList.add('hiddenBody') : bodyEl.classList.remove('hiddenBody');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);

  const handleClickOutside = ({ target }: Event) => {
    if (ref.current && !ref.current.contains(target)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => document.removeEventListener('click', handleClickOutside, true);
  }, []);

  return { ref, isShow, setIsShow };
};
export default useOutsideMenu;
