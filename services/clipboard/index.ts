export default function copyToClipBoard(text: string) {
  navigator.clipboard.writeText(text).then(
    () => {
      alert(`copied markdown to the clipboard`);
    },
    (error) => {
      console.error(error);
      alert(`ERROR - Something went wrong, here is the error: ${error}`);
    }
  );
}
