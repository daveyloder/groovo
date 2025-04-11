import React, { useState } from "react";
import styles from "./Account.module.css";
import { Form, Label, Input, FormGroup, Button } from "reactstrap";

import { FaUser, FaLock } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const AccountComponent = ({ toggle, onLogin }) => {
  const [message, setMessage] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(true);

  function handleCreateAccount() {
    const formInput = document.getElementById("account-form").elements;
    const username = formInput["username"].value;
    const password = formInput["password"].value;
    const confirmPassword = formInput["confirmPassword"]?.value; // Optional for login

    if (isCreatingAccount) {
      if (password === confirmPassword) {
        localStorage.setItem("Username", username);
        localStorage.setItem("Password", password);
        setMessage("Account successfully created! You can now log in.");
        setIsCreatingAccount(false); // Switch to login form
      } else {
        setMessage("Passwords do not match!");
      }
    }
  }

  function handleLogin() {
    const formInput = document.getElementById("account-form").elements;
    const username = formInput["username"].value;
    const password = formInput["password"].value;

    const storedUsername = localStorage.getItem("Username");
    const storedPassword = localStorage.getItem("Password");

    if (username === storedUsername && password === storedPassword) {
      setMessage("Login successful!");
      onLogin(username); // Notify the parent component about the login
    } else {
      setMessage("Invalid username or password.");
    }
  }

  const toggleForm = () => {
    setMessage("");
    setIsCreatingAccount(!isCreatingAccount);
  };

  return (
    <Form id="account-form" className={styles.formContainer}>
      <h1 className={styles.formHeading}>
        {isCreatingAccount ? "Create Account" : "Login"}
      </h1>
      <p id="display-message">{message}</p>
      <FormGroup floating>
        <Input
          id="username"
          name="username"
          placeholder="username"
          type="text"
        />
        <Label for="username">Username</Label>
      </FormGroup>{" "}
      <FormGroup floating>
        <Input
          id="password"
          name="password"
          placeholder="Password"
          type="password"
        />
        <Label for="password">Password</Label>
      </FormGroup>{" "}
      {isCreatingAccount && (
        <FormGroup floating>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            placeholder="confirmPassword"
            type="password"
          />
          <Label for="confirmPassword">Confirm Password</Label>
        </FormGroup>
      )}
      <Button
        className={styles.formButton}
        color="success"
        onClick={isCreatingAccount ? handleCreateAccount : handleLogin}
      >
        {isCreatingAccount ? "Create Account" : "Login"}
      </Button>
      <p className={styles.toggleText} onClick={toggleForm}>
        {isCreatingAccount
          ? "Already have an account? Login here."
          : "Don't have an account? Create one here."}
      </p>
      <div className={styles.closeButton}>
        <Button onClick={toggle} size="sm">
          &times;
        </Button>
      </div>
    </Form>
  );
};

export default AccountComponent;
