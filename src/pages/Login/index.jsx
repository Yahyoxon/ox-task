import { Alert, Button, Spin } from "antd";
import axios from "axios";
import { get } from "lodash";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Auth from "../../components/Auth";
import { Context } from "../../components/context/Context";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const defaultValues = {
  username: "",
  password: "",
};

function Login() {
  const { dispatch } = useContext(Context);
  const value = useContext(Context);
  const [errorMessage, setErrorMessage] = useState("");
  const { handleSubmit, control } = useForm({ defaultValues });

  const onSubmit = handleSubmit(async (values) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const params = new URLSearchParams(
        `_username=${get(values, "username")}&_password=${get(
          values,
          "password"
        )}&_subdomain=toko`
      );
      const user = await axios.post(`${BASE_URL}/security/auth_check`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      setErrorMessage("success");
      dispatch({ type: "LOGIN_SUCCESS", payload: user.data.token });
    } catch (error) {
      setErrorMessage("faileur");
      dispatch({ type: "LOGIN_FAILURE" });
    }
  });

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 1400);
  }, [errorMessage]);

  return (
    <Container>
      {errorMessage.length > 0 && <AlertMessage {...{ errorMessage }} />}
      <Form onSubmit={onSubmit}>
        <Title>Login</Title>
        <Auth control={control} />
        {value.isFetching ? (
          <Spin style={{ marginTop: 10 }} />
        ) : (
          <Button htmlType="submit" type="primary" size="large">
            Login
          </Button>
        )}
      </Form>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9);
  background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9);
`;
const Title = styled.h1`
  font-size: 36px;
`;
const AlertBox = styled(Alert)`
  position: absolute;
  top: 30px;
  right: 30px;
`;
const Form = styled.form`
  width: 450px;
  height: 400px;
  padding: 30px 25px;
  border-radius: 10px;
  background-color: #ffffff;
`;

function AlertMessage({ errorMessage }) {
  return (
    <AlertBox
      message={
        errorMessage === "success"
          ? "Login Success"
          : "Username or password is wrong! Please, re-enter."
      }
      type={errorMessage === "success" ? "success" : "error"}
      banner
    />
  );
}
