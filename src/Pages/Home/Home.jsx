import React from "react";
import Slider from "../../Component/Slider/Slider";
import Review from "../Review/Review";
import Faq from "../Faq/Faq";
import RecentComplaints from "../../Component/RecentComplain/RecentComplaints";
import CommunityStats from "../CommunityStats/CommunityStats";
import JoinCleanDrive from "../JoinCleanDrive/JoinCleanDrive";
import ValueImpact from "../ValueImpact/ValueImpact";

const Home = () => {
  return (
    <div>
      <Slider />
      <RecentComplaints />
      <CommunityStats />
      <JoinCleanDrive />
      <ValueImpact></ValueImpact>
      <Review />
    </div>
  );
};

export default Home;
