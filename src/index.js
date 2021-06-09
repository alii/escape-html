const matchHtmlRegExp = /["'&<>]/;

/**
 * Escape special characters in the given string of text, such that it can be interpolated in HTML content.
 * This function will escape the following characters: `"`, `'`, `&`, `<`, and `>`.
 *
 * *Note* that the escaped value is only suitable for being interpolated into HTML as the text content of
 * elements in which the tag does not have different escaping mechanisms (it cannot be placed inside
 * `<style>` or `<script>`, for example, as those content bodies are not HTML, but CSS and JavaScript,
 * respectively; these are known as "raw text elements" in the HTML standard).
 *
 * *Note* when using the escaped value within a tag, it is only suitable as the value of an attribute,
 * where the value is quoted with either a double quote character (`"`) or a single quote character (`'`).
 *
 * @param {string} str The string to escape for inserting into HTML
 * @return {string}
 * @public
 */
export function escapeHTML(str) {
  const match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  let escape;
  let html = "";
  let index = 0;
  let lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = "&quot;";
        break;
      case 38: // &
        escape = "&amp;";
        break;
      case 39: // '
        escape = "&#39;";
        break;
      case 60: // <
        escape = "&lt;";
        break;
      case 62: // >
        escape = "&gt;";
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}
