export function getTextFromXML(xml) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "text/xml");
  const textElements = xmlDoc.getElementsByTagName("text");
  const textContents = Array.from(textElements)
    .map((el) => el.textContent)
    .join(" ");
  return textContents;
}
