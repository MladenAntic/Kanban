// import BoardSpace from "@/components/BoardSpace";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { SidebarProvider } from "@/context/SidebarProvider";
import { getBoards } from "@/lib/actions/board.action";
import { getUserById } from "@/lib/actions/user.action";
// import { auth } from "@clerk/nextjs/server";

const Page = async () => {
  // const {userId} = auth()
  const userId = "clerk123";
  const mongoUser = await getUserById({ userId });

  const result = await getBoards({});

  console.log(result);

  return (
    <SidebarProvider>
      <div className={`relative flex w-screen`}>
        <Sidebar
          mongoUserId={JSON.stringify(mongoUser._id)}
          boards={result?.boards}
        />
        <div className="w-full">
          <TopBar
            boards={result?.boards}
            mongoUserId={JSON.stringify(mongoUser._id)}
          />
          {/* <BoardSpace mongoUserId={JSON.stringify(mongoUser._id)} boards={result.boards} /> */}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Page;
