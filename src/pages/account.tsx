import Link from "next/link";
import React, { useState, ReactNode } from "react";
import { supabase } from "../utils/supabase-client";

import { withPageAuth, User } from "@supabase/supabase-auth-helpers/nextjs";

import { useUser } from "../utils/useUser";
import Account from "../components/Account";

export const getServerSideProps = withPageAuth({ redirectTo: "/signin" });

const Profile = () => {
  const { user, userDetails } = useUser();

  return <h1>{user?.email}</h1>;
};

export default Profile;
