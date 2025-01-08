"use client";

import { Fragment, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { createJobApplicationAction } from "@/actions";
import { useToast } from "../ui/use-toast";

function CandidateJobCard({ jobs, profileInfo, jobApplications }) {
  const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const { toast } = useToast();

  // Reverse and filter jobs
  const filteredJobs = jobs
    .filter((jobItem) => 
      !jobApplications.find((application) => application.jobID === jobItem?._id)
    )
    .reverse(); // Reverse the order of jobs

  async function handleJobApply(jobItem) {
    if (!profileInfo?.isPremiumUser && jobApplications.length >= 2) {
      setShowJobDetailsDrawer(false);
      toast({
        variant: "destructive",
        title: "You can apply to a maximum of 2 jobs.",
        description: "Please opt for membership to apply for more jobs.",
      });

      return;
    }

    await createJobApplicationAction(
      {
        recruiterUserID: jobItem?.recruiterId,
        name: profileInfo?.candidateInfo?.name,
        email: profileInfo?.email,
        candidateUserID: profileInfo?.userId,
        status: ["Applied"],
        jobID: jobItem?._id,
        jobAppliedDate: new Date().toLocaleDateString(),
      },
      "/jobs"
    );
    setShowJobDetailsDrawer(false);
    window.location.href = jobItem?.location;
  }

  return (
    <Fragment>
      {filteredJobs.map((jobItem) => (
        <Fragment key={jobItem?._id}>
          <CommonCard
            icon={<JobIcon />}
            title={jobItem?.companyName}
            description={jobItem?.title}
            footerContent={
              <Button
                onClick={() => {
                  setSelectedJob(jobItem);
                  setShowJobDetailsDrawer(true);
                }}
                className="dark:bg-[#fffa27] flex h-11 items-center justify-center px-5"
              >
                View Details
              </Button>
            }
          />
        </Fragment>
      ))}

      {selectedJob && (
        <Drawer
          open={showJobDetailsDrawer}
          onOpenChange={setShowJobDetailsDrawer}
        >
          <DrawerContent className="p-6">
            <DrawerHeader className="px-0">
              <div className="flex justify-between">
                <DrawerTitle className="text-4xl dark:text-white font-extrabold text-gray-800">
                  {selectedJob?.title}
                </DrawerTitle>
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleJobApply(selectedJob)}
                    className="flex h-11 items-center justify-center px-5"
                  >
                    Apply
                  </Button>
                  <Button
                    className="flex h-11 items-center justify-center px-5"
                    onClick={() => setShowJobDetailsDrawer(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DrawerHeader>
            <DrawerDescription className="text-2xl dark:text-white font-medium text-gray-600">
              {selectedJob?.description}
            </DrawerDescription>
            <div className="w-[150px] mt-6 flex justify-center dark:bg-white items-center h-[40px] bg-black rounded-[4px]">
              <h2 className="text-xl font-bold dark:text-black text-white">
                {selectedJob?.type}
              </h2>
            </div>
            <h3 className="text-2xl font-medium text-black mt-3">
              Experience: {selectedJob?.experience} year
            </h3>
            <div className="flex gap-4 mt-6">
              {selectedJob?.skills.split(",").map((skillItem, index) => (
                <div
                  key={index}
                  className="w-[100px] flex justify-center items-center h-[35px] dark:bg-white bg-black rounded-[4px]"
                >
                  <h2 className="text-[13px] font-medium text-white dark:text-black">
                    {skillItem}
                  </h2>
                </div>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </Fragment>
  );
}

export default CandidateJobCard;
