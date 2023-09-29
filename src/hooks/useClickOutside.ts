import { useEffect, MutableRefObject } from 'react';

type Props = {
  onClick?: () => void;
  ref: MutableRefObject<HTMLElement | null>;
  stopExec?: boolean;
};

/**
 * React hook that handles clicking outside of a ref
 *
 * @param props              Props passed to the hook
 * @param props.onClick      onClick outside handler
 * @param props.ref          ref that we listen to for outside clicks
 * @param props.stopExec     boolean that determines if the execution should be stopped
 * @returns                    void
 */
const useClickOutside = ({ onClick, ref, stopExec = false }: Props): void => {
  useEffect(() => {
    if (stopExec) {
      return;
    }

    /**
     * Handle click anywhere
     *
     * @param event The event that took place
     * @returns       Void
     */
    const onClickOutside = (event: MouseEvent) => {
      if (event.button !== 0) {
        return;
      }

      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        onClick
      ) {
        onClick();
      }
    };

    window.addEventListener('mousedown', onClickOutside, false);

    return () => {
      window.removeEventListener('mousedown', onClickOutside);
    };
  }, [onClick, ref, stopExec]);
};

export default useClickOutside;
