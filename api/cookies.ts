export const getCookie = (name: string) => {
  let cookieValue = "";
  if (document && document.cookie && document.cookie !== "") {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

export const setCookie = (name: string, value: string, days?: number) => {
  const date = new Date();
  date.setDate(date.getDate() + (days ? days : 365));
  document.cookie = name + "=" + value + "; path=/; max-age=31536000; expires=" + date.toUTCString();
  return value;
};
