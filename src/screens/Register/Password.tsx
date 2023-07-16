import React, { useContext } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";

import {
  Header as HeaderAuth,
  Footer as FooterAuth,
} from "../../components/Auth";
import { WindowSizeContext } from "../../context";
import { Button, Input, Text, inputVariants } from "../../ui";
import { useLocalStorageState } from "../../hooks";
import { NURA_AUTH_REGISTER_INFO } from "../../utils/constants";
import { getAllTypesOfUsers, registerUser } from "../../services";

const registerValidationSchema = yup.object().shape({
  password: yup.string().required("La contrasena es obligatorio"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "No coinciden las contrasenas")
    .required("Confirme la contrasena"),
});

const Password: React.FC = () => {
  const navigate = useNavigate();
  const { windowSize } = useContext(WindowSizeContext);

  const [initialValues] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
  });

  const { data: typeOfUser } = useQuery(
    ["getAllTypeOfUsers"],
    getAllTypesOfUsers
  );

  const basicUserRole = typeOfUser?.data.find(
    (item: any) => item.name === "basic"
  );

  const handleNext = async (values: any) => {
    const shortIdCustom = nanoid(5);

    const dataToRegisterUser = {
      ...initialValues,
      password: values.password,
      typeUserId: basicUserRole.id,
      username: `${
        initialValues.email.split("@")[0]
      }${shortIdCustom}`,
    };

    try {
      const response = await registerUser(dataToRegisterUser);
      console.log({ response });

      if (response?.status === 201) {
        console.log("Cuenta creada exitosamente");
        navigate("/register-username", {
          state: {
            username: dataToRegisterUser.username,
          },
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`h-[${windowSize.innerHeight}]px`}>
      <HeaderAuth
        image="/images/bg-register-password.jpg"
        title=""
        subtitle={``}
      />

      <Formik
        validationSchema={registerValidationSchema}
        validator={() => ({})}
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values: any) => handleNext(values)}
      >
        {({
          handleBlur,
          handleChange,
          values,
          handleSubmit,
          errors,
        }) => (
          <form className="p-5" onSubmit={handleSubmit}>
            <Input
              data-test="register-input-password"
              type="password"
              value={values.password}
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              placeholder="nueva contrasena"
            />
            {errors.password && (
              <Text
                data-test="register-feedback-error"
                className="text-red-500 my-2"
              >
                {errors.password as string}
              </Text>
            )}

            <Input
              data-test="register-input-confirm-password"
              type="password"
              className={inputVariants({
                className: "mt-4",
              })}
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              placeholder="confirme su contrasena"
            />
            {errors.confirmPassword && (
              <Text
                data-test="register-feedback-error-confirmPassword"
                className="text-red-500 my-2"
              >
                {errors.confirmPassword as string}
              </Text>
            )}

            <FooterAuth
              footerText="Ya tienes una cuenta?"
              routeText="Inicia sesion"
              routeLink="/login-email"
              currentStep={4}
            >
              <Button
                type="button"
                onClick={() => navigate(-1)}
                variant="outline"
              >
                Volver
              </Button>
              <Button
                type="submit"
                data-test="register-button-submit"
                onClick={() => navigate("/register-password")}
              >
                Siguiente
              </Button>
            </FooterAuth>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Password;
