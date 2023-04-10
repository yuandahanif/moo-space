import React from "react";

interface Props {
  profile: User;
  onLogout: () => Promise<void>;
}

const ProfileCard: React.FC<Props> = ({ profile, onLogout }) => {
  return (
    <>
      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-red-300">
        <img src={profile.avatar} alt={profile.name} className="object-cover" />
      </div>
      <span>{profile?.name}</span>
      <span>{profile?.email}</span>

      <div className="mt-4 text-sm">
        <button
          className="hover:underline"
          type="button"
          onClick={() => {
            void onLogout();
          }}
        >
          Keluar
        </button>
      </div>
    </>
  );
};

export default ProfileCard;
