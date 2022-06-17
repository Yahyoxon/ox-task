import * as React from "react";
import { Controller } from "react-hook-form";
import { Input } from "antd";
import Password from "antd/lib/input/Password";
import styled from "styled-components";

export default ({ control }) => (
  <div>
    <Section>
      <label>Username</label>
      <Controller
        placeholder="Username"
        control={control}
        name="username"
        render={({ field }) => <Input required size="large" {...field} />}
      />
    </Section>
    <Section>
      <label>Password</label>
      <Controller
        placeholder="Password"
        control={control}
        name="password"
        render={({ field }) => <Password required size="large" {...field} />}
      />
    </Section>
  </div>
);
const Section = styled.section`
  margin: 20px auto;
`;
