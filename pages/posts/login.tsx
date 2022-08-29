import { useState } from "react"


export default function Login() {
    const initialValue = {mail:"", pass:""};
    const [formValue,setFormValue] = useState(initialValue);

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormValue({...formValue, [name]: value});
        console.log(formValue);
    }
    


    return(
        <form className="formContainer">
            <h1>ログイン</h1>
            <hr />
            <div>
                <div>
                    <label>メールアドレス：</label>
                    <input type="email" placeholder="Email" name="mail" onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>パスワード：</label>
                    <input type="password" placeholder="Password" name="pass" onChange={(e) => handleChange(e)}/>
                </div>
                <button>ログイン</button>
            </div>
        </form>
    )
}
