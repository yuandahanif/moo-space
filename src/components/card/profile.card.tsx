import React from "react";

interface Props {
  profile: User;
  onLogout: () => void;
}

const ProfileCard: React.FC<Props> = ({ profile, onLogout }) => {
  return (
    <>
      <div className="h-16 w-16 rounded-full bg-red-300 overflow-hidden flex justify-center items-center">
        <img src={profile.avatar} alt={profile.name} className="object-cover" />
      </div>
      <span>{profile?.name}</span>
      <span>{profile?.email}</span>

      <div className="mt-4 text-sm">
        <button className="hover:underline" type="button" onClick={onLogout}>
          Keluar
        </button>
      </div>
    </>
  );
};

export default ProfileCard;
