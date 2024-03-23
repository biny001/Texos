import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CgLogOut, CgOptions } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";

export default function Options() {
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

        <DropdownMenuItem className=" cursor-pointer">
          Log out
          <DropdownMenuShortcut>
            <FiLogOut />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
