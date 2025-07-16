import { circleAccess, warning } from 'assets';
import classNames from 'classnames';
import React from 'react';
import s from './ValidationMessage.module.scss';

type ValidationMessageProps = {
  isValid: boolean;
  messageWrong: string;
  messageAccess: string;
};

const ValidationMessage: React.FC<ValidationMessageProps> = ({
  isValid,
  messageWrong,
  messageAccess,
}) => {
  return (
    <>
      {isValid ? (
        <div className={classNames(s['validation-message'], s['validation-message_access'])}>
          <img src={circleAccess} alt="access" /> {messageAccess}
        </div>
      ) : (
        <div className={classNames(s['validation-message'], s['validation-message_warning'])}>
          <img src={warning} alt="warning" />
          {messageWrong}
        </div>
      )}
    </>
  );
};

export default ValidationMessage;
