export default function copyToClipBoard(text: string) {
  navigator.clipboard.writeText(text).then(
    () => {
      console.log("Copied to clipboard successfully!");
    },
    (error) => {
      console.error(error);
      alert(`ERROR - Something went wrong, here is the error: ${error}`);
    }
  );
}
