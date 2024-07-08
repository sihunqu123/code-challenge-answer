import { AssetList } from "@chain-registry/types";

export interface IDatasource {
  /**
   * the id for current datasource
   */
  DSID: string;
  /**
   * A brif description about current Datasource
   */
  DSDescription: string;
  /**
   * return a list of chains
   */
  getChainList: () => Promise<AssetList[]>;
}
