import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/Context/AuthProvider";
import { useUserSignOut } from "@/lib/react-query/queryAndMutations";
import { useContext } from "react";
import { CgLogOut, CgOptions } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Options() {
  const { setInfo, initialUser } = useContext(AuthContext);
  const { mutateAsync: signOutUser, isSuccess, isError } = useUserSignOut();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOutUser();

    setInfo(initialUser);
    if (isSuccess) {
      navigate("/sign-up");
    } else if (isError) {
      console.log("error signing out");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="">
          <CgOptions />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-40 bg-black  ">
        <DropdownMenuGroup className=" ">
          <DropdownMenuItem
            // onClick={console.log("hllo")}
            className=" cursor-pointer "
          >
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuItem
          onClick={handleSignOut}
          className=" cursor-pointer"
        >
          Log out
          <DropdownMenuShortcut>
            <FiLogOut />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
