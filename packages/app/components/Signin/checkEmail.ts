const checkEmail = async (
  email: string | undefined
): Promise<{
  data: {
    hasEmail: boolean;
  };
}> => {
  return (await fetch("/user")).json();
};

export default checkEmail;
