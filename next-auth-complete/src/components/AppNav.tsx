import React from 'react'
import {Button, Link, Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";
import SigninButton from './SigninButton';

const AppNav = () => {
  return (
    <Navbar isBordered>
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
        <Link color="foreground" href="/">
            Home
        </Link>
      </NavbarItem>
    </NavbarContent>
    <NavbarContent justify="end">
      <NavbarItem>
        {/* <Button as={Link} color="primary" href="/auth/signup" variant="flat">
          Sign Up
        </Button> */}
        <SigninButton />
      </NavbarItem>
    </NavbarContent>
  </Navbar>
  )
}

export default AppNav