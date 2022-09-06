import { getByRole, render, screen } from '@testing-library/react';
import Login from './login';
import userEvent from '@testing-library/user-event';

// できた
test('ログインボタンの取得', () => {
  const { debug } = render(<Login />);
  // const pass = screen.getByText(/パスワード/);
  // expect(pass).toBeInTheDocument();

  const button = screen.getByRole('button');
  debug(button);
  expect(button).toHaveBeenCalled();
});


// できない
describe('onClick', () => {
  it('should calls', () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(
      <Login type="button" onClick={mockOnClick} />
    );
    wrapper.simulate('click');
    expect(mockOnClick).toHaveBeenCalled();
  });
});

// あとページ遷移部分だけ
test('ログインボタンが正常に動く', () => {
  render(<Login />);
  const loginButton = screen.getByTestId('loginButton');
  const email = screen.getByPlaceholderText(
    'メールアドレスを入力してください'
  );
  const password =
    screen.getByPlaceholderText('パスワードを入力してください');

  userEvent.type(email, 'carry@gmail.com');
  userEvent.type(password, '123456789');

  userEvent.click(loginButton);
  // ページ遷移されるか
  expect();
});

// 参考にする
// https://qiita.com/suzu1997/items/e4ee2fc1f52fbf505481

// 解読不可
expect.extend({
  async toBeDivisibleByExternalValue(received) {
    const externalValue = await getExternalValueFromRemoteSource();
    const pass = received % externalValue == 0;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be divisible by ${externalValue}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be divisible by ${externalValue}`,
        pass: false,
      };
    }
  },
});

test('is divisible by external value', async () => {
  await expect(100).toBeDivisibleByExternalValue();
  await expect(101).not.toBeDivisibleByExternalValue();
});
