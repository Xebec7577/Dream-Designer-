import type { Metadata } from "next";
import { ShowroomConfigurator } from "@/components/ShowroomConfigurator";

export const metadata: Metadata = {
  title: "3D Digital Showroom",
  description: "Explore Exterior, Interior, and interactive Architectural Floor Plan views with high-resolution 3D room walkthroughs.",
};

export default function ShowroomPage() {
  return <ShowroomConfigurator />;
}
