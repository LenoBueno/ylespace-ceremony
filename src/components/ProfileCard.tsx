
import React from 'react';
import Image from 'next/image';
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <div className="relative w-[350px] h-[190px] bg-white rounded-[20px] shadow-lg transition-all duration-500 hover:h-[450px] group">
      <div className="absolute left-1/2 -top-[50px] -translate-x-1/2 w-[150px] h-[150px] bg-white rounded-[20px] shadow-lg overflow-hidden transition-all duration-500 group-hover:w-[200px] group-hover:h-[200px]">
        <img
          src="/placeholder.svg"
          alt={profile.full_name || "Profile"}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute w-full h-full flex justify-center items-end overflow-hidden">
        <div className="p-10 text-center w-full transition-transform duration-500 translate-y-[150px] group-hover:translate-y-0">
          <h2 className="text-[1.25em] font-semibold text-[#212121] leading-[1.2em]">
            {profile.full_name || "Nome não informado"}
          </h2>
          <p className="text-[0.75em] font-medium opacity-50">
            {profile.orixa || "Orixá não informado"}
          </p>
          
          <div className="flex justify-between my-5">
            <div className="text-center">
              <h3 className="text-base text-[#212121] leading-[1.2em] font-semibold">
                {profile.birthday ? (
                  new Date(profile.birthday).toLocaleDateString("pt-BR")
                ) : (
                  "Não informada"
                )}
                <br />
                <span className="text-[0.85em] font-normal opacity-50">
                  Data de Nascimento
                </span>
              </h3>
            </div>
            
            <div className="text-center">
              <h3 className="text-base text-[#212121] leading-[1.2em] font-semibold">
                {profile.role}
                <br />
                <span className="text-[0.85em] font-normal opacity-50">
                  Cargo
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
