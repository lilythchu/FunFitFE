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


