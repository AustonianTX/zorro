import { Session } from "@supabase/supabase-js";
import React, { useState, useEffect } from "react";
import Account from "../components/Account";
import { supabase } from "../utils/supabase-client";

const Profile = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      <Account session={session} />
    </div>
  );
};

export default Profile;
