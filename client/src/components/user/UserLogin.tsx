import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { User } from '../../shared/User';
import { useLoginContext } from '../../Store';
import UserLoginEmailForm from './UserLoginEmailForm';
import UserLoginPasswordForm from './UserLoginPasswordForm';
import UserWarning from './UserWarning';

export default function UserLogin() {
  const [user, setUser] = useState<User | undefined | ''>();
  const [password, setPassword] = useState<string | undefined>('');
  const [encryptPassword, setEncryptPassword] = useState<string | undefined>();
  const { dispatch } = useLoginContext();

  useEffect(() => {
    if (
      encryptPassword &&
      encryptPassword != 'undefined' &&
      user != undefined &&
      user != ''
    ) {
      dispatch({ type: 'ADD_USER', user: user });
    }
  }, [user, dispatch, encryptPassword]);

  return (
    <>
      {user ? (
        <>
          {encryptPassword ? (
            encryptPassword == 'undefined' ? (
              <>
                <UserWarning isPassword={true} />
                <UserLoginPasswordForm
                  setPassword={setPassword}
                  password={password}
                  email={user.emailAddress}
                  setEncryptPassword={setEncryptPassword}
                />
              </>
            ) : (
              <Redirect to='/home' />
            )
          ) : (
            <UserLoginPasswordForm
              setPassword={setPassword}
              password={password}
              email={user.emailAddress}
              setEncryptPassword={setEncryptPassword}
            />
          )}
        </>
      ) : user == '' ? (
        <>
          <UserWarning isPassword={false} />
          <UserLoginEmailForm setUser={setUser} />
        </>
      ) : (
        <UserLoginEmailForm setUser={setUser} />
      )}
    </>
  );
}
