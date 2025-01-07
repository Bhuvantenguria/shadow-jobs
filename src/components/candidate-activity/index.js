"use client";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

function CandidateActivity({ jobList, jobApplicants }) {
  console.log(jobList, jobApplicants);

  const uniqueStatusArray = [
    ...new Set(
      jobApplicants.map((jobApplicantItem) => jobApplicantItem.status).flat(1)
    ),
  ];

  console.log(uniqueStatusArray);

  return (
    <div className="mx-auto max-w-7xl px-6">
      {/* Tabs Component */}
      <Tabs defaultValue="Applied" className="w-full">
        {/* Page Header */}
        <div className="flex items-center justify-between py-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white">
            Your Activity
          </h1>
          <TabsList className="flex gap-4">
            {uniqueStatusArray.map((status) => (
              <TabsTrigger
                key={status}
                value={status}
                className="px-4 py-2 rounded-md font-medium text-sm dark:bg-gray-800 dark:text-white bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                {status}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tabs Content */}
        <div className="grid gap-6">
          {uniqueStatusArray.map((status) => (
            <TabsContent key={status} value={status} className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {status} Jobs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobList
                  .filter(
                    (jobItem) =>
                      jobApplicants
                        .filter(
                          (jobApplication) =>
                            jobApplication.status.indexOf(status) > -1
                        )
                        .findIndex(
                          (filteredItemByStatus) =>
                            jobItem._id === filteredItemByStatus.jobID
                        ) > -1
                  )
                  .map((finalFilteredItem) => (
                    <a
                      key={finalFilteredItem._id}
                      href={finalFilteredItem?.location}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <CommonCard
                        icon={<JobIcon />}
                        title={finalFilteredItem?.title}
                        description={finalFilteredItem?.companyName}
                        footerContent={
                          <div className="flex items-center justify-between gap-4 p-3 rounded-md bg-gray-50 dark:bg-yellow-300 shadow-md">
  <div className="flex items-center gap-2">
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
      🛠️
    </span>
    <p className="text-sm font-medium text-gray-700 dark:text-gray-800">
      {finalFilteredItem?.skills || "No skills specified"}
    </p>
  </div>
  <div className="flex items-center gap-2">
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-800">
      ⏳
    </span>
    <p className="text-sm font-semibold text-gray-900 dark:text-black">
      {finalFilteredItem?.type || "Unknown"}
    </p>
  </div>
</div>

                        }
                      />
                    </a>
                  ))}
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

export default CandidateActivity;
