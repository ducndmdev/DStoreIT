import { signOut } from "@/lib/actions/auth.actions";
import Image from "next/image";
import { Button } from "../ui/button";
import FileUploader from "./FileUploader";
import Search from "./Search";

const Header = ({
  $id: owner,
  accountId,
}: {
  $id: string;
  accountId: string;
}) => {
  return (
    <header className="header!">
      <Search />
      <div className="header-wrapper!">
        <FileUploader owner={owner} accountId={accountId} />
        <Button className="sign-out-button!" onClick={signOut}>
          <Image
            src="/assets/icons/logout.svg"
            alt="sign-out"
            width={24}
            height={24}
          />
        </Button>
      </div>
    </header>
  );
};

export default Header;
