import BoardSpace from "@/components/BoardSpace";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { SidebarProvider } from "@/context/SidebarProvider";
import { getBoards } from "@/lib/actions/board.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const mongoUser = await getUserById({ userId });

  const resultBoards = await getBoards({author: mongoUser});

  return (
    <SidebarProvider>
      <div className={`relative flex w-screen`}>
        <Sidebar
          mongoUserId={mongoUser._id}
          boards={resultBoards?.boards}
        />
        <div className="w-full">
          <TopBar
            mongoUserName={mongoUser.username}
            boards={resultBoards?.boards}
            mongoUserId={mongoUser._id}
          />
          <BoardSpace
            mongoUserId={mongoUser._id}
            boards={resultBoards?.boards}
          />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Page;
