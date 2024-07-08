/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  assets,
  // , chains, ibc
} from "chain-registry";
import { IDatasource } from "../models/IDatasourceModal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export class ChainRegistryDS implements IDatasource {
  constructor() {}

  async getChainList() {
    return assets;
  }

  DSID = "chain-registry";

  DSDescription = "chain-registry";
}
