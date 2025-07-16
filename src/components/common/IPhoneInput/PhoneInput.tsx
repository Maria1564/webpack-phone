import React, { useEffect, useRef } from 'react';
import s from './PhoneInput.module.scss';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { MaskPhone } from 'components/common/IPhoneInput/type';
import { useLocalStore } from 'store/hooks/useLocalStore';
import { PhoneStore } from 'store/locals/PhoneStore';
import { Dropdown } from 'components/common/IPhoneInput/Dropdown';
import { ValidationMessage } from 'components/common/IPhoneInput/ValidationMessage';

type PhoneInputProps = {
  mask: MaskPhone[];
  value: string;
  onChange: (text: string) => void;
  disabled?: boolean;
};

const PhoneInput: React.FC<PhoneInputProps> = ({ onChange, mask, value, disabled = false }) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>(Array(10).fill(null));
  const phoneStore = useLocalStore(() => new PhoneStore(value, mask));
  const {
    validatePhoneNumber,
    setDigitPhone,
    formatPhoneNumber,
    setCurrentMask,
    digitPhone,
    phoneOutput,
    currentMask,
    currentMaskSplit,
    isValid,
    maskInfo,
    maskIndexMap,
  } = phoneStore;

  useEffect(() => {
    const handleGlobalKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !disabled) {
        validatePhoneNumber();
      }
    };
    document.addEventListener('keyup', handleGlobalKeyUp);

    return () => document.removeEventListener('keyup', handleGlobalKeyUp);
  }, [disabled, validatePhoneNumber]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const indexInp = Number(e.target.dataset.index);
    const currentInp = inputsRef.current[indexInp];
    const nextInp = inputsRef.current[indexInp + 1];

    if (currentInp && currentInp.value) {
      if (currentInp.value.length > 1) {
        currentInp.value = currentInp.value[currentInp.value.length - 1];
      }

      if (setDigitPhone(indexInp, currentInp.value)) {
        nextInp?.focus();

        if (!nextInp) {
          formatPhoneNumber();
        }
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const indexInp = Number(target.dataset.index);
    const currentInp = inputsRef.current[indexInp];

    if (!currentInp) return;

    if (e.key === 'ArrowLeft' && indexInp - 1 > -1) {
      inputsRef.current[indexInp - 1]?.focus();
    }

    if (e.key === 'ArrowRight' && indexInp + 1 < digitPhone.length) {
      inputsRef.current[indexInp + 1]?.focus();
      inputsRef.current[indexInp + 1]?.setSelectionRange(1, 1);
    }

    if (e.key === 'Backspace') {
      if (currentInp.value.length > 0) {
        currentInp.value = '';
        setDigitPhone(indexInp, '');
      } else if (indexInp - 1 > -1) {
        inputsRef.current[indexInp - 1]?.focus();
      }
    }
  };

  useEffect(() => {
    if (phoneOutput) {
      onChange(phoneOutput);
    }
  }, [onChange, phoneOutput]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, [currentMask]);

  return (
    <div className={s.phone}>
      <h1 className={s.phone__title}>Введите номер телефона</h1>
      <div className={s.phone__container}>
        {currentMask.name && (
          <Dropdown
            currentMask={currentMask}
            isValid={isValid}
            maskInfo={maskInfo}
            setCurrentMask={setCurrentMask}
            disabled={disabled}
          />
        )}
        <div className={s.phone__mask}>
          {currentMaskSplit.map((symb, index) => {
            if (symb === '*') {
              return (
                <input
                  disabled={disabled}
                  className={classNames(s.phone__input, {
                    [s.phone__input_warning]: isValid === false,
                    [s.phone__input_access]: isValid,
                  })}
                  key={index}
                  type="text"
                  name={`input${maskIndexMap[index].index}`}
                  placeholder={String(maskIndexMap[index].index)}
                  ref={(el) => {
                    inputsRef.current[maskIndexMap[index].index] = el;
                  }}
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
                  data-index={maskIndexMap[index].index}
                  value={digitPhone[maskIndexMap[index].index] || ''}
                />
              );
            } else {
              return <span key={index}>{symb}</span>;
            }
          })}
        </div>
      </div>
      {isValid !== null && (
        <ValidationMessage
          messageAccess="Номер телефона введен верно"
          messageWrong="Неправильный номер телефона"
          isValid={isValid}
        />
      )}
    </div>
  );
};

export default observer(PhoneInput);
