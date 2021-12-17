import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import UserRegistrationForm from './UserRegistrationForm';

export default function UserRegistration() {
  const [isSamePassword, setIsSamePassword] = useState<number | undefined>();
  return (
    <>
      {!isSamePassword ? (
        <UserRegistrationForm setIsSamePassword={setIsSamePassword} />
      ) : isSamePassword === 1 ? (
        <Redirect to='/home' />
      ) : (
        <>
          <UserRegistrationForm setIsSamePassword={setIsSamePassword} />
          <div className='d-flex justify-content-center'>
            <div style={{ width: '20rem' }}>
              Passwörter stimmen nicht überein. <br /> Bitte überprüfen Sie Ihre
              Eingabe noch einmal.
            </div>
          </div>
        </>
      )}
    </>
  );
}
