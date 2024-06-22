import { fetchProfileAction } from "@/actions";
import JObListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";

async function Jobpage(){
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id);
    return(
        <JObListing user = {JSON.parse(JSON.stringify(user))}
        profileInfo = {profileInfo} />
    )
}

export default Jobpage;