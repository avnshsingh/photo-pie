import { useSessionContext } from "supertokens-auth-react/recipe/session";

const useUserId = () => {
  const sessionContext = useSessionContext();

  if (sessionContext.loading === true) {
    return null;
  }

  return sessionContext.userId;
};

export default useUserId;
