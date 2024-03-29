import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const now = Date.now();
const nonce = Math.floor(10000 * Math.random());

const TEST_USERNAME = `test-user-${now}-${nonce}@gmail.com`;
const TEST_PASSWORD = "Password12349383838";

function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

test("initially renders the login/signup page", () => {
  setup(<App />);
  expect(screen.queryByText(/Welcome!/i)).toBeInTheDocument();
});

test("allows you to sign up for a new account", async () => {
  const { user } = setup(<App />);
  await user.click(screen.queryByText(/Sign up for an account/i));
  await user.type(screen.queryByLabelText("Email Address"), TEST_USERNAME);
  await user.type(screen.queryByLabelText("Password"), "aa");
  await user.click(screen.queryByTestId("submit-button"));
  await waitFor(
    () => {
      expect(
        screen.queryByText(/Password must be between 6 and 128 characters./i)
      ).toBeInTheDocument();
    },
    { timeout: 5000 }
  );
  await user.clear(screen.queryByLabelText("Password"));
  await user.type(screen.queryByLabelText("Password"), TEST_PASSWORD);
  await user.click(screen.queryByTestId("submit-button"));
  await wait(10);
  await waitFor(
    () => {
      expect(screen.queryByText(/You have 0 CV Items/i)).toBeInTheDocument();
    },
    { timeout: 7000 }
  );
  await user.click(screen.queryByText(/Log out/i));
  await waitFor(
    () => {
      expect(screen.queryByText(/Welcome!/i)).toBeInTheDocument();
    },
    { timeout: 4000 }
  );
}, 12000);

test("allows you to log in with an existing account", async () => {
  const { user } = setup(<App />);
  const logOutButton = screen.queryByText(/Log out/i);
  if (logOutButton) {
    await user.click(logOutButton);
  }
  expect(screen.queryByText(/Welcome!/i)).toBeInTheDocument();
  await user.type(screen.queryByLabelText("Email Address"), TEST_USERNAME);
  await user.type(screen.queryByLabelText("Password"), TEST_PASSWORD);
  await user.click(screen.queryByTestId("submit-button"));
  await waitFor(
    () => {
      expect(
        screen.queryByText(/You have (.+) CV Item(s?)/i)
      ).toBeInTheDocument();
    },
    { timeout: 5000 }
  );
}, 7000);

test("allows you to CRUD CV items", async () => {
  const { user } = setup(<App />);
  await waitFor(
    () => {
      expect(screen.queryByText(/You have 0 CV Items/i)).toBeInTheDocument();
    },
    { timeout: 4000 }
  );
  // Add the first CV Item 
  await user.click(screen.queryByText(/Add CV Item/i));
  await user.type(
    screen.queryByPlaceholderText("name"),
    "John"
  );
  await user.click(screen.queryByText(/Save/i));
  await wait(10);
  await waitFor(
    () => {
      expect(
        screen.queryByPlaceholderText("name")
      ).not.toBeInTheDocument();
      expect(screen.queryByText(/You have 1 CV Item/i)).toBeInTheDocument();
      expect(screen.queryByText(/John/i)).toBeInTheDocument();
    },
    { timeout: 10000 }
  );
  // Add a second CV element
  await user.click(screen.queryByText(/Add CV Item/i));
  await user.type(
    screen.queryByPlaceholderText("name"),
    "Pork"
  );
  await user.click(screen.queryByText(/Save/i));
  await wait(10);
  await waitFor(
    () => {
      expect(
        screen.queryByPlaceholderText("name")
      ).not.toBeInTheDocument();
      expect(screen.queryByText(/You have 2 CV Items/i)).toBeInTheDocument();
    },
    { timeout: 8000 }
  );
  // Mark the second CV element as Selectedd
  const checkboxes = screen
    .getAllByTestId("CV-checkbox")
    .map((el) => el.childNodes[0]);
  expect(checkboxes[0].parentElement).not.toHaveClass("Mui-checked");
  expect(checkboxes[1].parentElement).not.toHaveClass("Mui-checked");
  await user.click(checkboxes[0]);
  await waitFor(
    () => {
      expect(checkboxes[0].parentElement).toHaveClass("Mui-checked");
      expect(checkboxes[1].parentElement).not.toHaveClass("Mui-checked");
    },
    { timeout: 4000 }
  );
  // Delete the first CV Item
  const deleteButtons = screen.getAllByTestId("CV-delete-button");
  expect(deleteButtons.length).toBe(2);
  await user.click(deleteButtons[0]);
  await wait(10);
  await waitFor(
    () => {
      expect(screen.queryByText(/You have 1 CV Item/i)).toBeInTheDocument();
      expect(screen.queryByText(/Pork/i)).toBeInTheDocument();
    },
    { timeout: 10000 }
  );
}, 33000);

test("allows you to log out", async () => {
  const { user } = setup(<App />);
  const logoutButton = screen.queryByText(/Log out/i);
  expect(logoutButton).toBeInTheDocument();
  await user.click(logoutButton);
  await waitFor(
    () => {
      expect(screen.queryByText(/Welcome!/i)).toBeInTheDocument();
    },
    { timeout: 4000 }
  );
});
