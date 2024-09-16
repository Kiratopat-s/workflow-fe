import HomeBanner from "@/components/home/HomeBanner";
import Loading from "./loadging";

export default function Home() {
  return (
    <>
      <HomeBanner render3D={false} loading={<Loading />} />
    </>
  );
}
