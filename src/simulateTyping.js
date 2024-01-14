export const simulateTyping = (ref, text) => {
    let i = 0;
    ref.current.value = ""; // Clear the input field before starting simulation

    const intervalId = setInterval(() => {
      if (i < text.length) {
        ref.current.value += text[i];
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);
};
