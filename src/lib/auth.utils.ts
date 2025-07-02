export const getFormPlaceholderAndLabel = (key: string) => {
  switch (key) {
    case "email":
      return {
        placeholder: "Enter your email",
        label: "Email",
      };
    case "password":
      return {
        placeholder: "Enter your password",
        label: "Password",
      };
    case "fullName":
      return {
        placeholder: "Enter your full name",
        label: "Full Name",
      };
    default:
      return {
        placeholder: "",
        label: "",
      };
  }
};

export const handleServerActionsError = (error: unknown, message?: string) => {
  console.error(error);
  throw new Error(message ?? "Something went wrong");
};
