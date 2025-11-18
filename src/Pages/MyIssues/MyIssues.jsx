import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { Typewriter } from "react-simple-typewriter";

const MyIssues = () => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  //   Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  //   Fetch logged-in user's issues
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/my-issues?email=${user.email}`).then((res) => {
        setIssues(res.data);
      });
    }
  }, [user, axiosSecure]);

  const handleDelete = async (issue) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/my-issues/${issue._id}`);
          setIssues((prev) => prev.filter((i) => i._id !== issue._id));

          Swal.fire({
            title: "Deleted!",
            text: "Your issue has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (err) {
          console.log(err);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong while deleting.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedIssue = {
      title: form.title.value,
      category: form.category.value,
      amount: form.amount.value,
      description: form.description.value,
      status: form.status.value,
    };

    await axiosSecure.put(`/my-issues/${selectedIssue._id}`, updatedIssue);

    setIssues((prev) =>
      prev.map((i) =>
        i._id === selectedIssue._id ? { ...i, ...updatedIssue } : i
      )
    );

    setIsUpdateModalOpen(false);

    Swal.fire({
      title: "Updated!",
      text: "Your issue has been updated successfully.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <title>My Issues - CleanTogether</title>
      {/* Typewriter Heading */}
      <div data-aos="zoom-in-up" className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-3">
          My{" "}
          <span className="text-primary">
            <Typewriter
              words={["Reported Issues", "Problems", "Submissions"]}
              cursor
              loop
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h2>

        {/* 🔹 Short Description */}
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-center text-base-content/70 max-w-2xl mx-auto pt-3 pb-8 text-sm sm:text-base"
        >
          Explore all your submitted issues and reports in one place. Track
          progress, view contributions, and stay updated on community clean-up
          efforts.
        </p>
      </div>

      {/* No issues found */}
      {issues.length === 0 ? (
        <div
          data-aos="fade-up"
          className="bg-base-200 p-12 rounded-xl text-center text-base-content/70 shadow-lg"
        >
          ❌ No Issues Found <br />
          <span className="text-sm text-base-content/50 mt-2 inline-block">
            You haven’t reported any issue yet.
          </span>
        </div>
      ) : (
        <div
          data-aos="fade-up"
          className="overflow-x-auto bg-base-100 rounded-xl shadow-md"
        >
          <table className="table w-full">
            {/*   Table Header */}
            <thead className="bg-primary text-white">
              <tr>
                <th className="hidden sm:table-cell">#</th>
                <th>Title</th>
                <th className="hidden sm:table-cell">Category</th>
                <th className="hidden sm:table-cell">Amount (৳)</th>
                <th className="hidden sm:table-cell">Status</th>
                <th>Action</th>
              </tr>
            </thead>

            {/*   Table Body */}
            <tbody>
              {issues.map((issue, index) => (
                <tr
                  key={issue._id}
                  data-aos="fade-up"
                  className="hover:bg-base-200 transition-all duration-300"
                >
                  <td className="hidden sm:table-cell">{index + 1}</td>
                  <td className="font-semibold">{issue.title}</td>

                  {/* Hide in mobile */}
                  <td className="capitalize hidden sm:table-cell">
                    {issue.category}
                  </td>
                  <td className="text-primary font-semibold hidden sm:table-cell">
                    ৳{issue.amount}
                  </td>
                  <td className="hidden sm:table-cell">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        issue.status === "ongoing"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>

                  {/*   Action Column - always visible */}
                  <td className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedIssue(issue);
                        setIsUpdateModalOpen(true);
                      }}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(issue)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/*   Update Modal */}
      {isUpdateModalOpen && (
        <div
          onClick={() => setIsUpdateModalOpen(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-base-100 p-6 rounded-xl w-full max-w-md shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 text-center">
              Update Issue
            </h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="update-title"
                  className="block text-sm font-medium mb-1"
                >
                  Issue Title
                </label>
                <input
                  id="update-title"
                  type="text"
                  name="title"
                  defaultValue={selectedIssue?.title}
                  placeholder="Title"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="update-category"
                  className="block text-sm font-medium mb-1"
                >
                  Category
                </label>
                <input
                  id="update-category"
                  type="text"
                  name="category"
                  defaultValue={selectedIssue?.category}
                  placeholder="Category"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="update-amount"
                  className="block text-sm font-medium mb-1"
                >
                  Suggested Budget (৳)
                </label>
                <input
                  id="update-amount"
                  type="number"
                  name="amount"
                  defaultValue={selectedIssue?.amount}
                  placeholder="Amount"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="update-description"
                  className="block text-sm font-medium mb-1"
                >
                  Description
                </label>
                <textarea
                  id="update-description"
                  name="description"
                  defaultValue={selectedIssue?.description}
                  placeholder="Description"
                  className="textarea textarea-bordered w-full"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="update-status"
                  className="block text-sm font-medium mb-1"
                >
                  Status
                </label>
                <select
                  id="update-status"
                  name="status"
                  defaultValue={selectedIssue?.status}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="ended">Ended</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-full mt-2">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyIssues;
