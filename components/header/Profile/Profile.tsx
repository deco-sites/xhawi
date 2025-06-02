import { useId } from "../../../sdk/useId.ts";
import ProfileButton from "./Button.tsx";
import ProfilePopup from "./Popup.tsx";

interface Props {
  labels: {
    hi: string;
    guest: string;
    account: string;
    signIn: string;
    newUser: string;
    signUp: string;
  };
}

export default function Profile({ labels }: Props) {
  const id = useId();

  return (
    <div class="user-profile-login relative flex items-center" id="profile">
      <ProfileButton id={id} labels={labels} />
      <ProfilePopup parentId={id} labels={labels} />
    </div>
  );
}
