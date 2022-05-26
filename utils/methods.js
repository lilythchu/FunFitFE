import { SignInURL, SignUpURL } from "../api/client";
//import { useLogin } from "../context/AuthProvider";
//const {setIsLoggedIn} = useLogin();

export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const onTermsOfUsePressed = () => {
  console.log('onTermsOfUsePressed');
};

export const onPrivacyPressed = () => {
  console.log('onPrivacyPressed');
};

// export const onSignInPressed = data => {
//   const {setIsLoggedIn} = useLogin();
  // setLoading(true);
  // fetch(SignInURL, {
  //   method: "GET",
  //   headers: {
  //     "cache-control": "no-cache",
  //     Connection: "keep-alive",
  //     "Accept-Encoding": "gzip, deflate",
  //     "Cache-Control": "no-cache",
  //     Accept: "*/*",
  //     Authorization: `Basic ${base64.encode(
  //       `${data.username}:${data.password}`
  //     )}`,
  //   },
  // })
  // .then((response) => {
  //   setLoading(false);
  //   return response.json();
  // })
  // .then((response) => {
  //   if (response.token) {
  //     setIsLoggedIn(true);
  //     // navigation.navigate("AppStack", {
  //     //   username: data.username,
  //     //   token: response.token,
  //     // });
  //   } else alert("Username or Password is Incorrect!");
  // });
//   setIsLoggedIn(true);
// };

