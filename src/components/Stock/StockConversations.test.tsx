import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

import StockConversations from "./StockConversations";

import useHttp from "../../hooks/use-http";

jest.mock("../../hooks/use-http");

const authSlice = createSlice({
  name: "authentification",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
});

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

describe("StockConversation component", () => {
  test("it should render without errors", async () => {
    (useHttp as jest.Mock).mockReturnValue({
      sendRequest: jest.fn().mockResolvedValue({}),
      data: [
        {
          id: "1",
          email: "email1@email.com",
          comment: "comment1",
        },
        {
          id: "2",
          email: "email2@email.com",
          comment: "comment2",
        },
      ],
      status: "resolved",
      error: null,
    });
    render(
      <Provider store={store}>
        <StockConversations ticker="AAPL" />
      </Provider>
    );

    expect(screen.getByText("2 Comments")).toBeInTheDocument();
    expect(screen.getByText("email1@email.com :")).toBeInTheDocument();
    expect(screen.getByText("comment1")).toBeInTheDocument();
    expect(screen.getByText("email2@email.com :")).toBeInTheDocument();
    expect(screen.getByText("comment2")).toBeInTheDocument();
  });
});
