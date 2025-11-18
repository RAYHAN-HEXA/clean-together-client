import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import { FaDownload, FaRegCalendarAlt } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AOS from "aos";
import "aos/dist/aos.css";
import { Typewriter } from "react-simple-typewriter";

const MyContribution = () => {
  const [contributions, setContributions] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch logged-in user's contributions
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/all-contributions?email=${user.email}`).then((res) => {
        setContributions(res.data);
      });
    }
  }, [user, axiosSecure]);

  // Download PDF report
  const handleDownload = (item) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Cleanup Contribution Report", 14, 20);

    // Build key/value rows for a clean layout
    const rows = [
      ["Issue Title", item.issueTitle || "N/A"],
      ["Category", item.category || "N/A"],
      ["Amount Paid", `৳${item.amount ?? "0"}`],
      ["Date", item.date ? new Date(item.date).toLocaleString() : "N/A"],
      ["Status", item.status || "N/A"],
      ["Reporter Email", item.reporterEmail || user?.email || "N/A"],
      ["Description", item.additional || "N/A"],
    ];

    // Use autotable for neat formatting
    autoTable(doc, {
      startY: 32,
      head: [["Field", "Value"]],
      body: rows,
      styles: { fontSize: 11 },
      headStyles: { fillColor: [34, 197, 94], textColor: 255 },
      columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 330 } },
    });

    const safeTitle = (item.issueTitle || "contribution").replace(
      /[^a-z0-9_-]/gi,
      "_"
    );
    doc.save(`${safeTitle}-report.pdf`);
  };

  // (Download All removed) no handler present

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <title>My Contribution - CleanTogether</title>
      {/* Typewriter Heading */}
      {/* Typewriter Heading */}
<div data-aos="zoom-in-up" className="text-center mb-6">
  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-3">
    My{" "}
    <span className="text-primary">
      <Typewriter
        words={["Contributions", "Cleanup Support", "Payments"]}
        cursor
        loop={true}
        cursorStyle="_"
        typeSpeed={80}
        deleteSpeed={50}
        delaySpeed={1500}
      />
    </span>
  </h2>

  {/* 🔹 Short Description Below Heading */}
  <p
    data-aos="fade-up"
    data-aos-delay="200"
    className="text-center text-base-content/70 max-w-2xl mx-auto pt-3 pb-8 text-sm sm:text-base"
  >
    Here you can track all your cleanup contributions, payments, and support
    history. Stay updated with your environmental impact and community support
    progress.
  </p>
</div>


      {contributions.length === 0 ? (
        <div
          data-aos="fade-up"
          className="bg-base-200 p-12 rounded-xl text-center text-base-content/70 shadow-lg"
        >
          ❌ No Contributions Yet <br />
          <span className="text-sm text-base-content/50 mt-2 inline-block">
            You haven’t supported any issue so far.
          </span>
        </div>
      ) : (
        <div
          data-aos="fade-up"
          className="overflow-x-auto shadow-lg rounded-xl"
        >
          {/* Download All removed per user request */}
          <table className="table w-full text-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th>Issue Title & Description</th>
                <th className="hidden sm:table-cell">Category</th>
                <th className="hidden sm:table-cell">Paid Amount</th>
                <th className="hidden sm:table-cell">Date</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {contributions.map((item) => (
                <tr
                  key={item._id}
                  data-aos="fade-up"
                  className="hover:bg-base-200 transition-all duration-300"
                >
                  <td>
                    <p className="font-semibold text-base">{item.issueTitle}</p>
                  </td>

                  {/* Hide in mobile */}
                  <td className="capitalize hidden sm:table-cell">
                    {item.category}
                  </td>
                  <td className="text-primary font-semibold hidden sm:table-cell">
                    ৳{item.amount}
                  </td>
                  <td className="hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <FaRegCalendarAlt className="text-primary" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                  </td>

                  {/* Always visible */}
                  <td>
                    <button
                      onClick={() => handleDownload(item)}
                      className="bg-primary text-white px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-primary/90 text-sm"
                    >
                      <FaDownload /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyContribution;
