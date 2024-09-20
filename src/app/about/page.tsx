import Loading from "@/app/loadging";
import HomeBanner from "@/components/home/HomeBanner";

export default function Home() {
  return (
    <>
      <HomeBanner render3D={true} loading={<Loading />} />
    </>
  );
}
