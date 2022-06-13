import { successNotification } from "@/components/common/Notification";
import moment from "moment";

export const blankCheck = (value: string): boolean => {
  const blankPattern: RegExp = /^\s+|\s+$/g;
  return value.trim().replace(blankPattern, '') === '';
}

export const unixTimeToTimeStamp = (unixTime: number) => {
  return moment.unix(unixTime / 1000).format('YYYY-MM-DD HH:mm');
}
export const copyTextToClipboard = (url: string) => {
  try {
    var textField = document.createElement('textarea');
    textField.innerText = url;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();

    successNotification('클립보드에 복사 완료');
  } catch (e) {
    console.log(e)
  }
}