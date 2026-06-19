import UjianPlayerClient from "./UjianPlayerClient";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "demo" }];
}

export default function Page() {
  return <UjianPlayerClient />;
}
