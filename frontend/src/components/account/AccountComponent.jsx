import React, { use, useState } from "react";
import styles from "./Account.module.css";
import { Form, Label, Input, FormGroup, Button, ModalBody } from "reactstrap";

import { FaUser, FaLock } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const AccountComponent = ({ toggle }) => {
  const [message, setMessage] = useState("");

  function handleCreateAccount() {
    //Creates an account object using the form inputs
    const account = {};
    const formInput = document.getElementById("account-form").elements;
    let username = (account.username = formInput["username"].value);
    let password = (account.password = formInput["password"].value);
    let confirmPassword = (account.confirmPassword =
      formInput["confirmPassword"].value);

    if (password == confirmPassword) {
      //If passwords are correct then save them to storage
      localStorage.setItem("Username", username);
      localStorage.setItem("Password", password);

      setMessage("Account succesfully created!");
      console.log(`Username: ${localStorage.getItem("Username")}`);
      console.log(`Password: ${localStorage.getItem("Password")}`);
    } else {
      setMessage("Password do not match!");
    }
  }

  return (
    <Form id="account-form" className={styles.formContainer}>
      <h1 className={styles.formHeading}>Create Account</h1>
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
      <FormGroup floating>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          placeholder="confirmPassword"
          type="password"
        />
        <Label for="password">Confirm Password</Label>
      </FormGroup>{" "}
      <Button
        className={styles.formButton}
        color="success"
        onClick={handleCreateAccount}
      >
        Submit
      </Button>
      <div className={styles.closeButton}>
        <Button onClick={toggle} size="sm">
          &times;
        </Button>
      </div>
    </Form>
  );
};

export default AccountComponent;
