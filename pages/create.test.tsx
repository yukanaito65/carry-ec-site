// import User from './create';
// import { fireEvent, render, screen } from '@testing-library/react';

// describe('test', () => {
//   test('練習1', async () => {
//     render(<User />);
//     const buttonList = await screen.findAllByRole('button');
//     expect(buttonList).toHaveLength(2);
//   });

  // test('should be failed on email validation ',()=>{
  //     const testEmail = "aaa@gmail.com";
  //     expect(validateEmail(testEmail)).not.toBe(true);
  // })
//   test('練習2', () => {
//     render(<User/>)
//     const password = screen.getByPlaceholderText("PassWord");
//     expect(password).toHaveAttribute('type', 'password');
//   });

// const onClickRegister = jest.fn()
// render(<User/>)
// render( <button
//     type="button"
//     // className={styles.button_style}
//     onClick={()=>onClickRegister()}
//   />);
//   fireEvent.click(screen.getByText("姓"),{
//     target:{value:`{lastName}`}
//   })

// expect(onClickRegister).toBe(true);
// });
import React from "react";
import { render,screen } from "@testing-library/react";
import  User  from "./create";
import onClickRegister from "./create"
import userEvent from "@testing-library/user-event";

describe('Test User commponent',()=>{
    render(<User/>)
    test(' ',()=>{
        const button = screen.findAllByRole("button");

    })
})
