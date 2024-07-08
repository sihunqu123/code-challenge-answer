/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  assets,
  // , chains, ibc
} from "chain-registry";
import { IDatasource } from "../models/IDatasourceModal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export class ChainRegistryClientDS implements IDatasource {
  constructor() {}

  async getChainList() {
    // TODO: fetch the chain list according to the official guide:
    // https://github.com/cosmology-tech/chain-registry/tree/9475b46a670e622875d5e5532beee2a61ff4ff7a/legacy/client

    // since this demo won't have any API call, we'll just use the mock data from chain-registry
    // but we changed it's order to show the difference
    return (assets as Array<any>).concat().reverse();
  }
  DSID = "chain-registry-client";
  DSDescription = "@chain-registry Client";
}
