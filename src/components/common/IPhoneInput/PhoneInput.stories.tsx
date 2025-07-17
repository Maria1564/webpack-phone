import { Meta, StoryObj } from '@storybook/react-webpack5';
import PhoneInput from 'components/common/IPhoneInput/PhoneInput';

const meta = {
  title: 'Phone-input',
  component: PhoneInput,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    mask: { control: 'object' },
  },
} satisfies Meta<typeof PhoneInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '+4325(3)254312',
    mask: [
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
    ],
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    value: ""
  }
}
