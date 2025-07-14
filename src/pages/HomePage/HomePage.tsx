import { PhoneInput } from '@/components/common/IPhoneInput';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <PhoneInput
        mask={[
          // {
          //   key: "",
          //   name: "",
          //   emoji: "",
          //   prefix: "",
          //   mask: "****",
          // },

          {
            key: 'ru',
            name: 'Россия',
            emoji: '🇷🇺',
            prefix: '+7',
            mask: '(***) ***-**-**',
          },
          {
            key: 'us',
            name: 'США',
            emoji: '🇺🇸',
            prefix: '+1',
            mask: '(***) ***-****',
          },
          {
            key: 'gb',
            name: 'Великобритания',
            emoji: '🇬🇧',
            prefix: '+44',
            mask: '**** ******',
          },
          {
            key: 'fr',
            name: 'Франция',
            emoji: '🇫🇷',
            prefix: '+33',
            mask: '** ** ** ** **',
          },
          {
            key: 'de',
            name: 'Германия',
            emoji: '🇩🇪',
            prefix: '+49',
            mask: '**** ******',
          },
          {
            key: 'it',
            name: 'Италия',
            emoji: '🇮🇹',
            prefix: '+39',
            mask: '*** *** ****',
          },
          {
            key: 'br',
            name: 'Бразилия',
            emoji: '🇧🇷',
            prefix: '+55',
            mask: '(**) *****-****',
          },
          {
            key: 'cn',
            name: 'Китай',
            emoji: '🇨🇳',
            prefix: '+86',
            mask: '*** **** ****',
          },
          {
            key: 'jp',
            name: 'Япония',
            emoji: '🇯🇵',
            prefix: '+81',
            mask: '***-****-****',
          },
          {
            key: 'in',
            name: 'Индия',
            emoji: '🇮🇳',
            prefix: '+91',
            mask: '*****-*****',
          },
          {
            key: 'ua',
            name: 'Украина',
            emoji: '🇺🇦',
            prefix: '+380',
            mask: '** *** ** **',
          },
          {
            key: 'kz',
            name: 'Казахстан',
            emoji: '🇰🇿',
            prefix: '+7',
            mask: '(***) ***-**-**',
          },
        ]}
        value="+7123456 789_0"
        onChange={console.log}
        // disabled
      />
    </div>
  );
};

export default HomePage;
