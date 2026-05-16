export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    const res = await fetch("https://dummyjson.com/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
        expiresInMins: 30,
      }),
    });

    const data = await res.json();

    // save new access token
    localStorage.setItem("accessToken", data.accessToken);

    return data.accessToken;
  } catch (err) {
    console.log(err);
    return null;
  }
};
