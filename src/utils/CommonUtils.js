export function getTitle(routeName) {
  switch (routeName.toLocaleLowerCase()) {
    case "/dashboard":
      return "Dashboard";
    case "/category":
      return "Category";
    case "/calendar":
      return "Calender";
    case "/add":
      return "Add Task";
  }
}

export function getProfileName(name) {
  let profileName = name.split(" ");
  return `${profileName[0][0]}${profileName[1][0]}`;
}

export function getPriorityTagBG(type) {
  switch (type) {
    case "High":
      return "red";
    case "Medium":
      return "yellow";
    case "Low":
      return "green";
  }
}

export function convertDateTime(date) {
  const dateStr = new Date(date);

  const options = { month: "short", day: "2-digit", year: "numeric" };
  const formatted = new Intl.DateTimeFormat("en-US", options).format(dateStr);
  return formatted;
}
