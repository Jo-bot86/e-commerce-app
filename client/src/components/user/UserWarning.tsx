import React from 'react';

interface Props {
  isPassword: boolean;
}
export default function UserWarning(props: Props) {
  return (
    <div className='d-flex justify-content-center mt-3'>
      <div className='d-grid gap-2 '>
        <div className='card' style={{ width: '20rem' }}>
          <div className='card-body no-account'>
            <div className='row'>
              <div className='col-1 mx-1'>
                <span className='text-danger'>
                  <i className='fas fa-exclamation-triangle fs-3'></i>
                </span>
              </div>
              <div className='col mx-2'>
                <div className='fw-bold text-danger'>
                  Ein Problem ist aufgetreten:
                </div>
                {props.isPassword ? (
                  <p className='mt-2'>
                    Das eingegebne Passwort ist nicht korrekt. Bitte versuchen
                    Sie es nochmal.
                  </p>
                ) : (
                  <p className='mt-2'>
                    Es konnte kein Konto mit dieser E-Mail-Adresse gefunden
                    werden.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
