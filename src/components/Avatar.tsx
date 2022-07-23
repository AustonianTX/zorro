/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase-client";

interface AvatarProps {
  url: string | null;
  size: any;
  onUpload: any;
}

const Avatar = ({ url, size, onUpload }: AvatarProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error: any) {
      console.log("Error downloading image: ", error.message);
    }
  }

  async function uploadAvatar(event: any) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Your must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="sm:col-span-6">
      <label
        htmlFor="photo"
        className="block text-sm font-medium text-gray-700"
      >
        Photo
      </label>
      <div className="mt-1 flex items-center">
        <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="h-full w-full text-gray-300"
            />
          ) : (
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </span>
        <label
          htmlFor="profilePhoto"
          className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {uploading ? "Uploading ..." : "Upload"}
        </label>

        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="profilePhoto"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
};

export default Avatar;
