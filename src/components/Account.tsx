import { Session } from "@supabase/supabase-js";
import { userAgent } from "next/server";
import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase-client";
import Avatar from "./Avatar";

const Account = ({ session }: any) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatarUrl`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatarUrl);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  interface ProfileProps {
    username: string | null;
    website: string | null;
    avatarUrl: string | null;
  }

  async function updateProfile({ username, website, avatarUrl }: ProfileProps) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user?.id,
        username,
        website,
        avatarUrl,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal",
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-10">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Profile
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-8 sm:px-0">
            <form className="space-y-8 divide-y divide-gray-200">
              <div className="space-y-8 divide-y divide-gray-200">
                <div>
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Profile
                    </h3>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <Avatar
                      url={avatarUrl}
                      size={150}
                      onUpload={(url: string) => {
                        setAvatarUrl(url);
                        updateProfile({ username, website, avatarUrl: url });
                      }}
                    />
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          id="email"
                          value={session?.user.email || ""}
                          disabled
                          className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Username
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="username"
                          value={username || ""}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                          className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Website
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="website"
                          id="website"
                          value={website || ""}
                          onChange={(e) => {
                            setWebsite(e.target.value);
                          }}
                          className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-start">
                  <button
                    type="submit"
                    onClick={() => {
                      updateProfile({ username, website, avatarUrl });
                    }}
                    disabled={loading}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {loading ? "Loading ..." : "Update"}
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => supabase.auth.signOut()}
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;
