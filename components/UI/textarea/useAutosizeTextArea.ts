import { useEffect } from "react";

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {

      let height = "0px";
      // textAreaRef.style.height = "0px";
      if (textAreaRef && textAreaRef.scrollHeight) {
        height = textAreaRef.scrollHeight + "px";;
      }
      // const scrollHeight = textAreaRef.scrollHeight;
      // textAreaRef.style.height = scrollHeight + "px";

      textAreaRef.style.height = height
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
