import { AssetList } from "@chain-registry/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { IDatasource } from "@src/app/models/IDatasourceModal";
import { datasources } from "@src/app/datasource";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

interface IResponse {
  response: any;
}

interface IAssetListState {
  chainList: AssetList[];
  selectedDatasource?: string;
  datasources: IDatasource[];
  // getDSList: () => IDatasource[];
  isLoading?: boolean;
  getChainList: (datasourceIDArg?: string) => Promise<IResponse>;
  setDefaultDatasource: (data: string) => Promise<IResponse>;
}

export const useChainRegistryStore = create<IAssetListState>()((set, get) => ({
  user: { data: undefined },
  chainList: [],
  selectedDatasource: datasources[0].DSID,
  getChainList: async (datasourceIDArg: string) => {
    try {
      set(() => ({ isLoading: true }));
      const datasourceID = datasourceIDArg || get().selectedDatasource;

      const datasource = datasources.find((item) => item.DSID === datasourceID);
      const fetchData = await datasource.getChainList();

      set(() => ({
        isLoading: false,
        chainList: fetchData,
      }));
      return { response: fetchData };
    } catch (err) {
      set(() => ({ isLoading: false }));
    }
  },
  datasources: datasources,

  setDefaultDatasource: async function (id: string) {
    try {
      set(() => ({ isLoading: true }));

      const responseData: string = null;
      // no backend server yet
      // responseData = await apiFetch.post<object, object>(setDefaultDatasource_API_URL, {
      //   id,
      // });

      set(() => ({
        isLoading: false,
        selectedDatasource: id,
      }));

      get().getChainList(id);

      return { response: responseData };
    } catch (err) {
      set(() => ({ isLoading: false }));
    }
  },
}));
