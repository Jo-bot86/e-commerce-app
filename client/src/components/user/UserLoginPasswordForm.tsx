import React, { Dispatch, FormEvent, SetStateAction } from 'react'
import { dataApi } from '../../shared/DataApi';

interface Props {
  password: string | undefined;
  setPassword: Dispatch<SetStateAction<string | undefined>>;
  email: string;
  setEncryptPassword: Dispatch<SetStateAction<string | undefined>>;
}

export default function UserLoginPasswordForm(props: Props) {
  const {password, setPassword, email, setEncryptPassword} = props;
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dataApi<string>('POST',`login/${email}`, setEncryptPassword, { email, password });
  }

  return (
    <div className='d-flex justify-content-center'>
      <div className='card mt-4' style={{ width: '20rem' }}>
        <div className='card-body'>
          <h5 className='card-title'>Passwort</h5>
          <form className='form' onSubmit={handleSubmit}>
            <label className='form-label'> {email}</label>
            <input
              type='password'
              name='password'
              id='password'
              className='form-control'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='d-grid gap-2 mt-3'>
              <button className='btn btn-warning btn-block'>Weiter</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
