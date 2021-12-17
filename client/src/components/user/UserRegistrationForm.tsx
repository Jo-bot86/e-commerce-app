import React, { Dispatch, SetStateAction, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { dataApi } from '../../shared/DataApi';
import { User } from '../../shared/User';
import { useLoginContext } from '../../Store';

interface Props {
  setIsSamePassword: Dispatch<SetStateAction<number | undefined>>;
}

export default function UserRegistrationForm(props: Props) {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const { setIsSamePassword } = props;
  const history = useHistory();
  const { dispatch } = useLoginContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password1 == password2) {
      setIsSamePassword(1);
      const user = createUser();
      dataApi('POST', 'registration', () => history.push('/home'), user);
      dispatch({ type: 'ADD_USER', user: user });
    } else {
      setIsSamePassword(2);
    }
  };

  const createUser = (): User => {
    return {
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
      password: password1,
    };
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className='card mt-4' style={{ width: '20rem' }}>
        <div className='card-body'>
          <h5 className='card-title'>Registrierung</h5>
          <form className='form' onSubmit={handleSubmit}>
            <label htmlFor='firstName' className='form-label'>
              Vorname
            </label>
            <input
              type='text'
              name='firstName'
              id='firstName'
              className='form-control'
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <label htmlFor='lastName' className='form-label'>
              Nachname
            </label>
            <input
              type='text'
              name='lastName'
              id='lastName'
              className='form-control'
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            <label htmlFor='email' className='form-label'>
              {' '}
              E-Mail-Addresse
            </label>
            <input
              type='email'
              name='email'
              id='email'
              className='form-control'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label htmlFor='password1' className='form-label'>
              {' '}
              Passwort
            </label>
            <input
              type='password'
              name='password1'
              id='password1'
              minLength={8}
              className='form-control'
              onChange={(e) => setPassword1(e.target.value)}
              value={password1}
            />
            <label htmlFor='password2' className='form-label'>
              {' '}
              Passwort bestätigen
            </label>
            <input
              type='password'
              name='password2'
              id='password2'
              className='form-control'
              onChange={(e) => setPassword2(e.target.value)}
              value={password2}
            />
            <div className='d-grid gap-2 mt-3'>
              <button className='btn btn-warning btn-block'>
                Registrieren
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
