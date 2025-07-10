import { MaskPhone } from "@/components/common/IPhoneInput/type";
import React, { useEffect, useRef } from "react";
import s from "./PhoneInput.module.scss";
import { useLocalStore } from "@/store/hooks";
import { PhoneStore } from "@/store/locals/PhoneStore";
import { observer } from "mobx-react-lite";
import { circleAccess, warning } from "@/assets";
import classNames from "classnames";
import { Dropdown } from "@/components/common/IPhoneInput/Dropdown";

type PhoneInputProps = {
  mask: MaskPhone[];
  value: string;
  onChange: (text: string) => void;
};

const PhoneInput: React.FC<PhoneInputProps> = ({ onChange, mask, value }) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const phoneStore = useLocalStore(() => new PhoneStore(value, mask));

  useEffect(() => {
    inputsRef.current = Array(10).fill(null);
  }, []);
  useEffect(() => {
    phoneStore.extractDigitsToArray();
  }, [phoneStore]);

  useEffect(() => {
    phoneStore.formatPhoneNumber();
  }, [phoneStore, phoneStore.digitPhone]);

  useEffect(() => {
    if (phoneStore.digitPhone.length === 0) return;
  }, [phoneStore.digitPhone.length]);

  useEffect(() => {
    const handleGlobalKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        phoneStore.validatePhoneNumber();
      }
    };
    document.addEventListener("keyup", handleGlobalKeyUp);

    return () => document.removeEventListener("keyup", handleGlobalKeyUp);
  }, [phoneStore]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const indexInp = Number(e.target.dataset.index);
    const currentInp = inputsRef.current[indexInp];
    const nextInp = inputsRef.current[indexInp + 1];

    if (currentInp && currentInp.value) {
      if (currentInp.value.length > 1) {
        currentInp.value = currentInp.value[currentInp.value.length - 1];
      }

      phoneStore.setDigitPhone(indexInp, currentInp.value);

      nextInp?.focus();

      if (!nextInp) {
        console.log(phoneStore.digitPhone);
        phoneStore.formatPhoneNumber();
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const indexInp = Number(target.dataset.index);
    const currentInp = inputsRef.current[indexInp];

    if (!currentInp) return;

    if (e.key === "ArrowLeft" && indexInp - 1 > -1) {
      inputsRef.current[indexInp - 1]?.focus();
    }

    if (e.key === "ArrowRight" && indexInp + 1 < phoneStore.digitPhone.length) {
      inputsRef.current[indexInp + 1]?.focus();
      inputsRef.current[indexInp + 1]?.setSelectionRange(1, 1);
    }

    if (e.key === "Backspace") {
      if (currentInp.value.length > 0) {
        currentInp.value = "";
        phoneStore.setDigitPhone(indexInp, "");
      } else if (indexInp - 1 > -1) {
        inputsRef.current[indexInp - 1]?.focus();
      }
    }
  };

  useEffect(() => {
    if (phoneStore.phoneOutput) {
      onChange(phoneStore.phoneOutput);
    }
  }, [onChange, phoneStore.phoneOutput]);

  return (
    <div className={s.phone}>
      <h1 className={s.phone__title}>Введите номер телефона</h1>
      <div className={s.phone__container}>
        {phoneStore.currentMask.name && <Dropdown phoneStore={phoneStore} />}
        <div className={s.phone__mask}>
          {(() => {
            let indexInp = 0;
            return phoneStore.currentMaskSplit.map((symb, index) => {
              if (symb === "*") {
                const currentInputIndex = indexInp;
                indexInp++;
                return (
                  <input
                    className={classNames(s.phone__input, {
                      [s.phone__input_warning]: phoneStore.isValidate === false,
                      [s.phone__input_access]: phoneStore.isValidate,
                    })}
                    key={index}
                    type="text"
                    name={`input${indexInp}`}
                    placeholder={String(indexInp)}
                    ref={(el) => {
                      inputsRef.current[currentInputIndex] = el;
                    }}
                    onChange={(e) => handleChange(e)}
                    onKeyUp={(e) => handleKeyUp(e)}
                    data-index={indexInp - 1}
                    value={phoneStore.digitPhone[currentInputIndex] || ""}
                  />
                );
              } else {
                return <span key={index}>{symb}</span>;
              }
            });
          })()}
        </div>
      </div>
      {phoneStore.isValidate !== null &&
        (phoneStore.isValidate ? (
          <div
            className={classNames(s.phone__message, s.phone__message_access)}
          >
            <img src={circleAccess} alt="access" /> Номер телефона введен верно
          </div>
        ) : (
          <div
            className={classNames(s.phone__message, s.phone__message_warning)}
          >
            <img src={warning} alt="warning" />
            Неправильный номер телефона
          </div>
        ))}
    </div>
  );
};

export default observer(PhoneInput);
