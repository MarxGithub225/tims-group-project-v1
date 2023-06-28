import React, { useEffect } from "react";
import HomeProductBanner from "../../screens/Banners/HomeProductBanner";
import MainBanner from "../../screens/Banners/MainBanner";
import BestProduct from "../../screens/BestProducts";
import BlogLists from "../../screens/BlogLists";
import HomeCategories from "../../screens/Categories/HomeCategories";
import Features from "../../screens/Features";
import PartnerLists from "../../screens/PartnerLists";
import AllCategories from "../../screens/AllCategories";

function Home() {
  useEffect(() => {
    // window.scroll({ behavior: "smooth" }, 0, 0)
  }, [])
  return <>
  <AllCategories/>
  <MainBanner/>
  <Features/>
  <BestProduct/>
  <HomeProductBanner/>
  <HomeCategories/>
  <BlogLists/>
  <PartnerLists/>
  </>;
}

export default Home;
