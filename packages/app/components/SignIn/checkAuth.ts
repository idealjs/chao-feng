const checkEmail = async (
  email: string | undefined
): Promise<{
  allow: boolean;
}> => {
  return (
    await fetch("/api/v1/checkAuth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
  ).json();
};

export default checkEmail;
