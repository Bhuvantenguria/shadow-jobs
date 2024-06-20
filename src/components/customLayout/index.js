import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";

async function CustomLayout({children}){
    const user = await currentUser();
    console.log(user);

    return (
        <div className="mx-auto max-w-7xl p-6 lg:px-8">
            {/* Header Component */}
            <Header user = {JSON.parse(JSON.stringify(user))} />
            {/* Header Component */}

            {/* Main Component */}
            <main> {children}</main>
            {/* Main Component */}
        </div>
    )
}
export default CustomLayout;