import React, { useState } from "react";
import { Button, buttonVariants, textVariants } from "../ui";

interface SelectProps {
  options: any[];
  value: string | null;
  setValue: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  setValue,
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const itemSelected = options.find(
    (item) => item.id === value
  )?.text;

  return (
    <div className="relative">
      {showOptions && (
        <div
          className="fixed w-screen h-screen top-0 left-0"
          onClick={() => setShowOptions(false)}
        />
      )}

      <label
        htmlFor="Genero"
        className={textVariants({
          className: "text-sm block mb-2",
        })}
      >
        <span className="underline underline-offset-2">g</span>
        enero
      </label>

      <Button
        className={buttonVariants({
          variant: "outline",
          className: `flex justify-between px-5 ${
            value ? "text@sura-primary" : "text-@sura-text"
          }`,
        })}
        onClick={() => setShowOptions(!showOptions)}
      >
        {value ? itemSelected : "Selecciona una opcion"}
        <img
          src="/icons/arrow-down.svg"
          alt=""
          className={`${
            showOptions ? "rotate-180" : ""
          } transition-all duration-300`}
        />
      </Button>

      <div
        className={`border-2 border-b-4 border-@sura-border ${
          !showOptions
            ? "h-0 overflow-hidden opacity-0"
            : "h-max overflow-visible opacity-100"
        } rounded-md absolute top-full mt-4 w-full`}
      >
        {options.map((option) => (
          <Button
            key={option.id}
            className={buttonVariants({
              className:
                "border-0 bg-white text-@sura-primary justify-start px-5",
            })}
            onClick={() => {
              setValue(option.id);
              setShowOptions(false);
            }}
          >
            {option.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Select;
