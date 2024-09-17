import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profileImg from "../../../../assets/man/profile.png";
const ProfileAvatar = () => {
  return (
    <div>
      <Avatar className="w-7 h-7 cursor-pointer">
        <AvatarImage src={profileImg} alt="profile" />
        <AvatarFallback>Profile</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ProfileAvatar;
