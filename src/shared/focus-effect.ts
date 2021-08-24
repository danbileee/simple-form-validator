import { RefObject, useEffect } from 'react';

import isNull from 'lodash/isNull';

function useFocusEffect(
  shouldFocus: boolean, 
  ref: RefObject<HTMLElement>
) {
  useEffect(() => {
    if (shouldFocus && !isNull(ref.current)) {
      ref.current.focus();
    }
  }, [shouldFocus, ref]);
}

export default useFocusEffect;
