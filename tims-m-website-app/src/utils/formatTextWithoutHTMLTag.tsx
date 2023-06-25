import moment from "moment";

export function removeUnnecessaryHTMLStuff(text: string): string {
    let parser = new DOMParser();
    let doc = parser.parseFromString(text, "text/html");
    return doc.body.textContent || "";
}


export const toHHMMSS = (duration: string) => {
  var sec_num = parseInt(duration, 10);
  var hours = Math.floor(sec_num / 3600).toString();
  var minutes = Math.floor((sec_num - (parseFloat(hours) * 3600)) / 60).toString();
  var seconds = (sec_num - (parseFloat(hours) * 3600) - (parseFloat(minutes) * 60)).toString();

  if (parseFloat(hours) < 10) { hours = "0" + hours; }
  if (parseFloat(minutes) < 10) { minutes = "0" + minutes; }
  if (parseFloat(seconds) < 10) { seconds = "0" + seconds; }
  return hours + ':' + minutes + ':' + seconds;
}
export const formatDuration = (duration: number) => {
  let d = ""
  duration >= 3600
    ? d = `${moment.utc(duration * 1000).format('H:mm:ss')}`
    : d = `${moment.utc(duration * 1000).format('mm:ss')}`
  return d
}