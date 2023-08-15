import { useContext, useEffect, useState } from "react";
import { m } from "framer-motion";

import { Navbar } from "./";
import {
  NURA_AUTH_REGISTER_INFO,
  authInitialValue,
} from "../utils/constants/auth";
import { useLocalStorageState } from "../hooks";
import { transitionLayoutPage } from "../utils/animation";
import { AuthenticatedContext } from "../context";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useContext(AuthenticatedContext);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const [_, handleUpdateForm] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const scrollingDown = currentScrollPos > prevScrollPos;

      setIsVisible(scrollingDown);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    handleUpdateForm(authInitialValue);
  }, []);

  return (
    <div>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transitionLayoutPage}
      >
        {children}
      </m.div>

      {isAuthenticated ? <Navbar isVisible={isVisible} /> : null}
    </div>
  );
}
