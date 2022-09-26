import { useReducer } from "react";

type Option = {
  method?: "GET" | "POST";
  headers: {};
  body?: {};
};

type IResult = {
  [key: string]: string;
};

type IState = {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  result: IResult;
};

const initialState: IState = {
  isLoading: false,
  isError: false,
  errorMessage: null,
  result: {},
};

type IActions = {
  type: "Loading" | "Error" | "Result" | "default";
  errorMessage?: string;
  result?: {};
};

function requestReducer(_: IState, action: IActions): IState {
  switch (action.type) {
    case "Loading":
      return { ...initialState, isLoading: true };
    case "Error":
      return {
        ...initialState,
        isLoading: false,
        isError: true,
        errorMessage: action.errorMessage || "Error completing request",
      };
    case "Result":
      return {
        ...initialState,
        result: action.result || {},
      };
    default:
      return initialState;
  }
}

function useRequest() {
  const [state, dispatch] = useReducer(requestReducer, initialState);

  function reset() {
    dispatch({ type: "default" });
  }

  async function request(url: string, options: Option) {
    dispatch({ type: "Loading" });

    try {
      const resultJSON = await fetch(url, {
        method: options.method || "GET",
        headers: {
          "Content-Type": "Application/json",
          ...options.headers,
        },
        body: JSON.stringify(options.body),
      });

      const result = await resultJSON.json();

      dispatch({ type: "Result", result });
    } catch (err: any) {
      if (typeof err === "object" && "message" in err!) {
        dispatch({ type: "Error", errorMessage: err.message });
        return;
      }
      dispatch({ type: "Error" });
    }
  }

  const some: [
    (url: string, options: Option) => void | never,
    () => void,
    boolean,
    boolean,
    string | null,
    IResult
  ] = [
    request,
    reset,
    state.isLoading,
    state.isError,
    state.errorMessage,
    { ...state.result },
  ];

  return some;
}

export default useRequest;
