import { Map3DView } from "@/components/map/Map3DView";
import { MapView } from "@/components/map/map-2d/MapView";
import { api } from "@/lib/trpc/server";

export default async function MapPage() {
  const locations = await api.locations.getAll();
  return <Map3DView locations={locations} />;

  // return <MapView locations={locations} />;
}