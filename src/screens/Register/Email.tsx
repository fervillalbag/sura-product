import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  Footer as FooterAuth,
  Header as HeaderAuth,
} from "../../components/Auth";
import { Button, Input } from "../../ui";
import { WindowSizeContext } from "../../components/context";

const Email: React.FC = () => {
  const navigate = useNavigate();
  const { windowSize } = useContext(WindowSizeContext);

  return (
    <div className={`h-[${windowSize}]px`}>
      <HeaderAuth
        image="/images/bg-register-email.jpg"
        title="Bienvenido!"
        subtitle={`Si aun no tienes<br/>una cuenta debes registrarte`}
      />

      <div className="p-5">
        <Input label="email" />

        <FooterAuth
          footerText="Ya tienes una cuenta?"
          routeText="Inicia sesion"
          routeLink="/login"
        >
          <Button onClick={() => navigate(-1)} variant="outline">
            Volver
          </Button>
          <Button onClick={() => navigate("/register-gender")}>
            Siguiente
          </Button>
        </FooterAuth>
      </div>
    </div>
  );
};

export default Email;