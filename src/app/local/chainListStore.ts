import { AssetList } from "@chain-registry/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IResponse {
  response: any;
}

interface IAssetListState {
  assets?: AssetList[];
  selectedChain?: any;
  isLoading?: boolean;
  getList: () => Promise<IResponse>;
  addAssetList: (data: AssetList) => Promise<IResponse>;
  setDefaultChain: (data: string) => Promise<IResponse>;
}

export const useChainListStore = create<IAssetListState>()((set) => ({
  user: { data: undefined },
  getList: async () => {
    try {
      set(() => ({ isLoading: true }));

      const fetchData: AssetList[] = null;
      // no backend server yet
      // fetchData = await apiFetch.get(getList_API_URL);

      set((state) => {
        const retVal: any = {
          isLoading: false,
        };

        if (!state.assets) {
          retVal.assets = [];
        }
        return retVal;
      });

      return { response: fetchData };
    } catch (err) {
      set(() => ({ isLoading: false }));
    }
  },
  addAssetList: async (data: AssetList) => {
    try {
      set(() => ({ isLoading: true }));

      // let responseData = null;
      // no backend server yet
      // responseData = await apiFetch.post(addAssetList_API_URL, {
      //   data,
      // });

      set(({ assets }) => {
        return {
          isLoading: false,
          assets: [...assets, data],
        };
      });

      return { response: data };
    } catch (err) {
      set(() => ({ isLoading: false }));
    }
  },
  setDefaultChain: async (data: string) => {
    try {
      set(() => ({ isLoading: true }));
      const fetchData: string = null;
      // no backend server yet
      // fetchData = await apiFetch.post<object, object>(setDefaultChain_API_URL, {
      //   data,
      // });

      set(() => ({
        isLoading: false,
        selectedChain: data,
      }));

      return { response: fetchData };
    } catch (err) {
      set(() => ({ isLoading: false }));
    }
  },
}));
