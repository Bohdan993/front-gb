import { FC, useEffect, useState } from "react";
import Select, { components } from "react-select";
import type { SingleValue } from "react-select";
import Image from "next/image";

interface IProps {
  title: string;
  placeholder: string;
  options: IOptions[];
  name: string;
  onChange: (currentValue: number, name: string) => void;
  valueId: number | "UAH";
}

export interface IOptions {
  id: number;
  title: string;
  shortName?: string;
}

const SelectR: FC<IProps> = ({
  title,
  placeholder,
  options,
  name,
  onChange,
  valueId,
}) => {
  const [currentValue, setCurrentValue] = useState<number | undefined | "UAH">(
    valueId
  );

  const onChangeSelect = (newValue: SingleValue<number | IOptions>) => {
    const newVal: IOptions = newValue as IOptions;
    if (newVal) {
      setCurrentValue(newVal.id);
      onChange(newVal.id, name);
    }
  };

  useEffect(() => {
    setCurrentValue(valueId);
  }, [valueId]);
  const paddingCurrency = name === "currency" ? "8px 14px" : "8px 16px";
  const fontSizeCurrency = name === "currency" ? "20px" : "24px";

  const colourStyles = {
    control: (styles: any) => {
      return {
        ...styles,

        backgroundColor: "white",
        border: styles.isFocused ? ` 1px solid #ECF0F4` : ` 1px solid #ECF0F4`,
        "&:hover": {
          border: styles.isFocused
            ? ` 1px solid #ECF0F4`
            : ` 1px solid #ECF0F4`,
        },
        borderRadius: "8px",
        fontSize: fontSizeCurrency,
        fontWeight: "400",
        // lineHeight: "20px",
        textAlign: "left",
        padding: paddingCurrency,
        boxShadow: "none",
        minWidth: "94px",
        height: "65px",
      };
    },
    option: (styles: any, { isDisabled, isFocused }: any) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#FFF500" : null,
        color: isFocused ? "#282828" : "#9C9EA4",
        cursor: isDisabled ? "not-allowed" : "default",
        fontSize: "24px",
        fontWeight: "400",
        padding: "8px 24px",
        "&:hover": {
          fontWeight: "600",
        },
        ":active": {
          ...styles[":active"],
          backgroundColor: null,
        },
      };
    },
  };

  const CaretDownIcon = () => {
    return (
      <Image
        src="/images/icons/drop_down_indicator.svg"
        width={12}
        height={6}
        alt={"^"}
      />
    );
  };

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
    );
  };

  return (
    <>
      <div className="select">
        <div className="select__title">{title}</div>
        <Select
          isDisabled={currentValue === "UAH"}
          instanceId="select_configurator"
          styles={colourStyles}
          options={options}
          placeholder={placeholder}
          onChange={(e: SingleValue<number | IOptions>) => onChangeSelect(e)}
          getOptionLabel={(option: any) =>
            option.symbol ? option.symbol : option.title
          }
          getOptionValue={(option) => String(option.id)}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator,
          }}
          value={
            currentValue
              ? options &&
                options.find((o) =>
                  currentValue === "UAH"
                    ? o.shortName === currentValue
                    : o.id === currentValue
                )
              : null
          }
        />
      </div>
    </>
  );
};
export default SelectR;
