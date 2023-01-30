import { useReducer, useCallback } from "react";

type HttpState = {
  data: any;
  error: string | null;
  status: "pending" | "completed" | null;
};

type HttpAction = {
  type: "SEND" | "SUCCESS" | "ERROR";
  responseData?: any;
  errorMessage?: string;
};

const httpReducer: React.Reducer<HttpState, HttpAction> = (
  state: HttpState,
  action: HttpAction
) => {
  switch (action.type) {
    case "SEND":
      return {
        data: null,
        error: null,
        status: "pending",
      };
    case "SUCCESS":
      return {
        data: action.responseData,
        error: null,
        status: "completed",
      };
    case "ERROR":
      return {
        data: null,
        error: action.errorMessage || null,
        status: "completed",
      };
    default:
      return state;
  }
};

const useHttp = (
  requestFunction: (data?: any) => any,
  startWithPending = false
) => {
  const initialState: HttpState = {
    data: null,
    error: null,
    status: startWithPending ? "pending" : null,
  };
  const [httpState, dispatch] = useReducer(httpReducer, initialState);

  const sendRequest = useCallback(
    async (requestData?: any) => {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", responseData });
      } catch (error: any) {
        dispatch({
          type: "ERROR",
          errorMessage: error.message || "Something went wrong!",
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
};

export default useHttp;
