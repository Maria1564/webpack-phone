import Dropdown from 'components/common/IPhoneInput/Dropdown/Dropdown';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { MaskPhone } from 'components/common/IPhoneInput/type';
import { useArgs } from 'storybook/internal/preview-api';

const mockMask: MaskPhone[] = [
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
];

const meta = {
  title: 'Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    currentMask: { control: 'object' },
    maskInfo: { control: 'object' },
    disabled: { control: 'boolean' },
    isValid: {
      control: 'radio',
      options: [true, false, null],
    },
  },
  decorators: [
    (Story) => {
      const [args, updateArgs] = useArgs();

      const handleSetCurrentMask = (mask: MaskPhone) => {
        console.log('mask storybook >>', mask);
        updateArgs({ currentMask: mask });
      };

      return (
        <Story
          args={{
            ...args,
            setCurrentMask: handleSetCurrentMask,
          }}
        />
      );
    },
  ],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentMask: mockMask[0],
    maskInfo: mockMask,
    disabled: false,
    isValid: null,
    setCurrentMask: (_mask: MaskPhone) => {},
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Validated: Story = {
  args: {
    ...Default.args,
    isValid: true,
  },
};

export const Invalid: Story = {
  args: {
    ...Default.args,
    isValid: false,
  },
};
