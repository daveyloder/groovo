import React from "react";
import styles from "./Login.module.css";
import { Form, Label, Input, FormGroup, Button, ModalBody } from "reactstrap";

import { FaUser, FaLock } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const LoginComponent = ({ toggle }) => {
  return (
    <Form className={styles.formContainer}>
      <h1 className={styles.formHeading}>LOGIN</h1>
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
      <Button className={styles.formButton} color="success">
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

export default LoginComponent;
