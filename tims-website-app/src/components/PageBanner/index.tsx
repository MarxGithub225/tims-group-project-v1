import OnlineLoader from "../Loaders/OnlineLoader";
interface PageBannerProp {
  label: string
  loading: boolean
}
function PageBanner({label, loading}: PageBannerProp) {

  return <div className="page-banner flex justify-between items-center">
    <div className="page-banner-label">
      
      {loading ? <p className="my-6"><OnlineLoader width="400px" height="22px" /></p>: <p>{label}</p>}
    </div>

  </div>;
}

export default PageBanner;
