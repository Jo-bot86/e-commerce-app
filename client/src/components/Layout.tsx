import React, { ReactElement } from 'react';
import Footer from './Footer';
import NavBar from './NavBar';

interface Props {
  children: ReactElement;
}

export default function Layout(props: Props) {
  return (
    <div>
      <NavBar />
      {props.children}
      {/* <Footer /> */}
    </div>
  );
}
