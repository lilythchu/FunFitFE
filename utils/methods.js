import {ListItem, Text} from '@rneui/themed';

export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const onTermsOfUsePressed = () => {
  console.log('onTermsOfUsePressed');
};

export const onPrivacyPressed = () => {
  console.log('onPrivacyPressed');
};

export function arrayToString(a) {
  let res = a[0];
  for (let i = 1; i < a.length; i++) {
    res = res + ", " + a[i];
  }
  return res;
};

export function arrayToTime(arr) {
  let res = arr[0];
  for (let i = 1; i < arr.length; i++) {
    res = res + " : " + arr[i];
  }
  return res;
};

export function arrayToSteps(step, timing) {
  var res = [];
  for (let i = 0; i < step.length; i++) {
    res.push(
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{step[i]}</ListItem.Title>
        </ListItem.Content>
        <Text>{arrayToTime(timing[i])}</Text>
      </ListItem>
    )
  }
  return res;
};

export function arrayToSum(time) {
  return parseInt(time[0]) * 3600 + parseInt(time[1]) * 60 + parseInt(time[2]);
}


