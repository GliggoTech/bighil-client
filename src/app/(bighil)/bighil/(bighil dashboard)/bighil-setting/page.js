import MyAccountComponent from "@/components/UI_Components/Standard_Components/MyAccountComponent";
import { fetchServerSideData } from "@/utils/fetchServerSideData";
// import { fetchServerSideData } from "@/utils/fetchServerSideData";
import { Suspense } from "react";

export default async function Bighil_Setting_Page() {
  const endPoint = "/api/account/my-account";
  const data = await fetchServerSideData(`${endPoint}`, {
    method: "GET",
    cache: "no-cache",
  });

  return (
    <div>
      <Suspense>
        <MyAccountComponent data={data} />
      </Suspense>
    </div>
  );
}
