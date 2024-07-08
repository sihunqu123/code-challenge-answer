import { IDatasource } from "../models/IDatasourceModal";
import { ChainRegistryClientDS } from "./ChainRegistryClientDS";
import { ChainRegistryDS } from "./ChainRegistryDS";

export const datasources: IDatasource[] = [
  new ChainRegistryDS(),
  new ChainRegistryClientDS(),
];
