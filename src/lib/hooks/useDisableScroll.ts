import { useEffect } from "react";

/**
 * Custom hook to disable/enable background scroll when a modal or overlay is open.
 * This prevents the background content from scrolling when the user interacts with the modal.
 *
 * @param isDisabled - Boolean value to determine if scrolling should be disabled
 */
export const useDisableScroll = (isDisabled: boolean): void => {
  useEffect(() => {
    if (isDisabled) {
      // Get the current scroll position
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

      // Store original styles
      const originalBodyStyle = {
        overflow: document.body.style.overflow,
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        width: document.body.style.width,
        height: document.body.style.height,
      };

      // Store original html styles
      const originalHtmlStyle = {
        overflow: document.documentElement.style.overflow,
      };

      // Disable scrolling by setting overflow hidden and fixing position
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollTop}px`;
      document.body.style.left = `-${scrollLeft}px`;
      document.body.style.width = "100%";
      document.body.style.height = "100%";

      // Also disable scrolling on html element for better browser compatibility
      document.documentElement.style.overflow = "hidden";

      // Cleanup function to restore original scroll behavior
      return () => {
        // Restore original body styles
        document.body.style.overflow = originalBodyStyle.overflow;
        document.body.style.position = originalBodyStyle.position;
        document.body.style.top = originalBodyStyle.top;
        document.body.style.left = originalBodyStyle.left;
        document.body.style.width = originalBodyStyle.width;
        document.body.style.height = originalBodyStyle.height;

        // Restore original html styles
        document.documentElement.style.overflow = originalHtmlStyle.overflow;

        // Restore scroll position
        window.scrollTo(scrollLeft, scrollTop);
      };
    }
  }, [isDisabled]);
};

export default useDisableScroll;
