import { CountryData } from "@/types/Country";
import AppTable from "./features/AppTable/AppTable";
import { fetchApi } from "@/apis/fetchApi";
import { countriesUrl } from "@/constants/urls";
import { columns } from "./CountriesTableColumn";

async function CountriesTable() {
  const data = await fetchApi<CountryData[]>(countriesUrl, {
    method: "GET",
    cache: "force-cache",
    next: { revalidate: 300 }, // cache result for 5 minutes
  });

  return <AppTable<CountryData> data={data} columns={columns} />;
}

export default CountriesTable;
