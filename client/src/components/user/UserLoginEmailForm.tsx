import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { dataApi } from '../../shared/DataApi';
import { User } from '../../shared/User';

interface Props {
  setUser: Dispatch<SetStateAction<User | undefined | ''>>;
}

export default function UserLoginEmailForm(props: Props) {
  const { setUser } = props;
  const [email, setEmail] = useState<string>('');
  const history = useHistory();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dataApi<User>('POST', 'login', setUser, { email });
  };

  return (
    <>
      <div className='d-flex justify-content-center'>
        <div className='card mt-4' style={{ width: '20rem' }}>
          <div className='card-body'>
            <h5 className='card-title'>Anmeldung</h5>
            <form className='form' onSubmit={handleSubmit}>
              <label htmlFor='email' className='form-label'>
                {' '}
                E-Mail-Addresse
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className='d-grid gap-2 mt-3'>
                <button className='btn btn-warning btn-block'>Weiter</button>
              </div>
            </form>
            <p className='mt-3'>
              Mit Ihrer Anmeldung erklären Sie sich mit unseren Allgemeinen
              Geschäftsbedingungen einverstanden.
            </p>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-center mt-3'>
        <hr />
        <div className='d-grid gap-2 '>
          <button
            className='btn btn-primary'
            id='registerBtn'
            onClick={() => history.push('/register')}
          >
            Erstellen Sie Ihr HandShake-Konto
          </button>
        </div>
      </div>
    </>
  );
}
