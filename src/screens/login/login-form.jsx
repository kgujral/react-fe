import React, { Component } from "react";
import { t } from "../../utils/i18n";
import { Form } from "informed";
import FormHeading from "../../components/form/form-heading";
import FormRow from "./form-row";
import { isEmail, isRequired } from "../../utils/validations";
import TextInput from "../../components/form/text-input";
import Auth from "../../utils/auth";
import { DEFAULT_ERROR_CALLBACK } from "../../utils/app-util";
import { Routes } from "../../routes/routes";

class LoginForm extends Component {
  state = {};

  handleSubmit = val => {
    const { history } = this.props;
    Auth.login(
      val,
      () => {
        history.replace(Routes.HOME);
      },
      DEFAULT_ERROR_CALLBACK
    );
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {() => (
          <React.Fragment>
            <FormHeading textKey="login.key" />
            <FormRow>
              <TextInput
                field="email"
                placeholder={t("form.email.placeholder")}
                validateOnBlur
                validateOnChange
                validate={isEmail}
              />
            </FormRow>
            <FormRow>
              <TextInput
                type="password"
                field="password"
                placeholder={t("form.password.placeholder")}
                validateOnBlur
                validateOnChange
                validate={isRequired}
              />
            </FormRow>
            <div className="row" style={{ marginTop: 4 }}>
              <div
                className="offset-1 col-6"
                style={{ textAlign: "end", minWidth: 294 }}
              >
                <a className="a-link-right" href="/login" tabIndex="-1">
                  {t("login.forgotpassword")}
                </a>
              </div>
            </div>
            <FormRow>
              <button>{t("form.login.submit")}</button>
            </FormRow>
          </React.Fragment>
        )}
      </Form>
    );
  }
}

export default LoginForm;
