export function formatTimeDifference(timestamp) {
  const currentDate = new Date();
  const postDate = new Date(timestamp);

  const timeDifference = currentDate.getTime() - postDate.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);

  if (daysDifference >= 1) {
    return `${daysDifference} day${daysDifference > 1 ? "s" : ""} ago`;
  } else if (hoursDifference >= 1) {
    return `${hoursDifference} hour${hoursDifference > 1 ? "s" : ""} ago`;
  } else {
    return `${minutesDifference} minute${minutesDifference > 1 ? "s" : ""} ago`;
  }
}
