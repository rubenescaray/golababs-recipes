import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import store from "./redux/store";
import { Provider } from "react-redux"
import App from "./App";
import { act } from "react-dom/test-utils";

const Wrapper = ({ children }) => (
	<Provider store={store}>{children}</Provider>
);

test('trying to login with empty fields', async () => {
  await act(async () => {
    await render(<App />, { wrapper: Wrapper })
  })
  expect(screen.getByPlaceholderText(/username/i)).toBeTruthy()
  expect(screen.getByPlaceholderText(/password/i)).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: "Login" }))
  expect(await (await screen.findByTestId("message")).innerHTML).toEqual('Please enter all fields')
});


test('trying to register with empty fields', async () => {
    await act(async () => {
      await render(<App />, { wrapper: Wrapper })
    })
    fireEvent.click(screen.getByText(/register/i))
    expect(screen.getByPlaceholderText(/username/i)).toBeTruthy()
    expect(screen.getByPlaceholderText(/email/i)).toBeTruthy()
    expect(screen.getByPlaceholderText(/password/i)).toBeTruthy()
    fireEvent.click(screen.getByTestId(/register-submit/i))
    expect(await (await screen.findByTestId("message")).innerHTML).toEqual('Please enter all fields')
});