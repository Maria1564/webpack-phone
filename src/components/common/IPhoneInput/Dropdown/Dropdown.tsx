import React, { useRef } from 'react';
import s from './Dropdown.module.scss';
import classNames from 'classnames';
import { arrowDown } from 'assets';
import { MaskPhone } from 'components/common/IPhoneInput/type';
import { useDropdownToggle } from 'hooks/useDropdownToggle';

type DropdownProps = {
  setCurrentMask: (mask: MaskPhone) => void;
  isValid: boolean | null;
  currentMask: MaskPhone;
  maskInfo: MaskPhone[];
  disabled: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
  setCurrentMask,
  maskInfo,
  isValid,
  currentMask,
  disabled,
}) => {
  const refDropdown = useRef<HTMLDivElement | null>(null);
  const { isOpen, openModal, closeModal } = useDropdownToggle(refDropdown);

  const handleOpen = () => {
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  };

  const changeMask = (mask: MaskPhone) => {
    closeModal();
    setCurrentMask(mask);
  };

  return (
    <div className={s.dropdown} ref={refDropdown}>
      <div
        className={classNames(s.dropdown__select, {
          [s.dropdown__select_open]: isOpen,
          [s.dropdown__select_warning]: isValid === false,
          [s.dropdown__select_access]: isValid,
          [s.dropdown__select_disabled]: disabled,
        })}
        onClick={disabled ? () => {} : handleOpen}
      >
        {currentMask.prefix}
        <img src={arrowDown} width={20} height={20} className={s['dropdown__arrow-icon']} />
      </div>
      <ul className={s.dropdown__options}>
        {maskInfo.map((mask) => (
          <li className={s.dropdown__option} key={mask.key} onClick={() => changeMask(mask)}>
            <span className={s['dropdown__phone-prefix']}>{mask.prefix}</span>
            <span className={s['dropdown__country-name']}>{mask.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
