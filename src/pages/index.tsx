import { Session } from "@supabase/supabase-js";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Auth from "../components/Auth/Auth";
import { supabase } from "../utils/supabase-client";

const Home: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="py-10">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-8 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              {!session ? <Auth /> : <h1>YOU SIGNED IN BRO</h1>}
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
};

export default Home;
