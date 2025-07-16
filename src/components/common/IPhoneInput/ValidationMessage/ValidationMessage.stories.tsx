import { Meta, StoryObj } from '@storybook/react-webpack5';
import ValidationMessage from 'components/common/IPhoneInput/ValidationMessage/ValidationMessage';

const meta = {
  title: 'Validation message',
  component: ValidationMessage,
  tags: ['autodocs'],
  argTypes: {
    isValid: { control: 'boolean' },
    messageAccess: { control: 'text' },
    messageWrong: { control: 'text' },
  },
  args: {
    messageAccess: 'Номер телефона введен верно',
    messageWrong: 'Неправильный номер телефона',
  },
} satisfies Meta<typeof ValidationMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Access: Story = {
  args: {
    isValid: true,
  },
};

export const Warning: Story = {
  args: {
    isValid: false,
  },
};
