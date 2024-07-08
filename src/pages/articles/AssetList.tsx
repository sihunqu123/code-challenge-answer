// (c) Copyright
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useChainListStore } from "@src/app/local/chainListStore";
import { useChainRegistryStore } from "@src/app/local/chainRegistryStore";
import { AssetList } from "@chain-registry/types";

const heads = [
  {
    key: "chain_name",
    title: "Chain name",
    sort: false,
  },
  {
    key: "$schema",
    title: "Schema",
    sort: true,
  },
  {
    key: "assetsCnt",
    title: "Assets Count",
    sort: true,
  },
  {
    key: "actions",
    title: "Actions",
    sort: true,
  },
];

const headsColumns = heads.map(({ key, title }) => {
  return (
    <div className='table-head-column' key={key}>
      {title}
    </div>
  );
});

const tableHead = (
  <div className='table-head' key='tableHead'>
    {headsColumns}
  </div>
);

const headKeys = heads.map((item) => item.key);

const AssetList = () => {
  const getAssets = useChainListStore((state) => state.getList);
  const assets = useChainListStore((state) => state.assets);
  const selectedChain = useChainListStore((state) => state.selectedChain);

  const setDefaultChain = useChainListStore((state) => state.setDefaultChain);
  const addAssetList = useChainListStore((state) => state.addAssetList);

  const assetsRegistry = useChainRegistryStore((state) => state.chainList);
  const getChainList = useChainRegistryStore((state) => state.getChainList);
  const datasources = useChainRegistryStore((state) => state.datasources);
  const selectedDatasource = useChainRegistryStore(
    (state) => state.selectedDatasource,
  );
  const setDefaultDatasource = useChainRegistryStore(
    (state) => state.setDefaultDatasource,
  );

  const [selectedRegistryAsset, setSelectedRegistryAsset] = useState(null);
  const addAssetPrompt = useRef(null);

  useEffect(() => {
    getAssets();
    getChainList();
  }, []);

  const closeAddPrompt = useCallback(() => {
    addAssetPrompt.current.close();
  }, [addAssetPrompt]);

  const addSelectedAssets = useCallback(() => {
    addAssetList(selectedRegistryAsset);
    // clear it
    setSelectedRegistryAsset(null);
  }, [selectedRegistryAsset, setSelectedRegistryAsset]);

  const assetsList = useMemo(() => {
    const data = assetsRegistry || [];

    const retVal: any[] = data
      // TODO: remove this unnecessary filter when we have a Virtual List Component that don't have a performance issue
      // .filter((element: any, index: number) => index < 6)
      // TODO: if what we need to add is assets, instead of chain, then we need to  do flatMap there.
      // .flatMap((item: any) => {
      .map((item: AssetList) => {
        const { assets } = item;

        return {
          ...item,
          assetsCnt: assets.length,
        };
      });
    return retVal;
  }, [assetsRegistry]);

  const openAddPrompt = useCallback(() => {
    addAssetPrompt.current.showModal();

    // auto select the first item in the option list.
    if (assetsList.length > 0) {
      setSelectedRegistryAsset(assetsList[0]);
    }
  }, [addAssetPrompt, setSelectedRegistryAsset, assetsList]);

  const assetsOnChangeHandler = useCallback(
    (event: any) => {
      const selectedValue = event.currentTarget.selectedOptions[0]
        .value as string;
      const assetData = assetsList.find((item) => {
        return item.chain_name === selectedValue;
      });
      setSelectedRegistryAsset(assetData);
    },
    [setSelectedRegistryAsset, assetsList],
  );

  const chainOnChangeHandler = useCallback(
    (event: any) => {
      const selectedValue = event.currentTarget.selectedOptions[0]
        .value as string;
      setDefaultDatasource(selectedValue);
    },
    [setDefaultDatasource],
  );

  const datasourceOptions = useMemo(() => {
    const retVal = datasources.map((item) => {
      const { DSID, DSDescription } = item;
      const isSelected = selectedDatasource === DSID;
      return (
        <>
          <option value={DSID} key={DSID} selected={isSelected}>
            {DSDescription}
          </option>
        </>
      );
    });
    return retVal;
  }, [datasources, selectedDatasource]);

  const assetsOptions = useMemo(() => {
    const retVal = assetsList.map((item) => {
      const { chain_name, assetsCnt } = item;
      // const value = `${chain_name}-${name}`;
      // TODO: disable/hide those assets that has already been added.
      return (
        <>
          <option value={chain_name} key={chain_name}>
            {chain_name} - {assetsCnt}
          </option>
        </>
      );
    });
    return retVal;
  }, [assetsList]);

  const assetsListUI = useMemo(() => {
    const tableBody = (assets || []).map((item: any) => {
      const { chain_name } = item;
      let isDefaultChain = false;
      if (chain_name === selectedChain) {
        isDefaultChain = true;
      }
      const columns = headKeys.reduce((accu, headKey) => {
        let cell = null;
        if (headKey === "actions") {
          const label = isDefaultChain ? "Default Chain" : "SetDefaultChain";
          cell = (
            <>
              <button
                className='chain-list-row-action'
                onClick={() => setDefaultChain(chain_name)}
                disabled={isDefaultChain}
              >
                {label}
              </button>
            </>
          );
        } else {
          const columnVal = item[headKey];
          cell = (
            <>
              <div className='table-body-column' key={headKey}>
                {columnVal}
              </div>
            </>
          );
        }
        return [...accu, cell];
      }, []);

      let className = "table-body-row";
      if (isDefaultChain) {
        className += " table-active-row";
      }

      const row = <div className={className}>{columns}</div>;
      return row;
    });

    const retVal = (
      <div className='asset-list-ui'>
        {tableHead}
        {tableBody}
      </div>
    );

    return retVal;
  }, [assets, selectedChain]);

  return (
    <div className='chain-page'>
      <dialog id='addAssetPrompt' ref={addAssetPrompt}>
        <div className='dialog-banner'>
          <p className='dialog-icon'>①</p>
          <p className='dialog-title'>Please Choose the Asset to add</p>
          <button className='dialog-x' onClick={() => closeAddPrompt()}>
            X
          </button>
        </div>
        <div className='dialog-body'>
          <select name='newItem' id='newItem' onChange={assetsOnChangeHandler}>
            {assetsOptions}
          </select>
        </div>
        <div className='dialog-footer'>
          <button
            className='dialog-confirm'
            onClick={() => addSelectedAssets()}
            disabled={!selectedRegistryAsset}
          >
            Confirm
          </button>
          <button className='dialog-cancel' onClick={() => closeAddPrompt()}>
            Cancel
          </button>
        </div>
      </dialog>

      <div className='datasource-select'>
        <p>Config data source:</p>
        <select
          name='selectedDatasource'
          id='selectedDatasource'
          onChange={chainOnChangeHandler}
        >
          {datasourceOptions}
        </select>
      </div>

      <div className='exist-chain'>
        <div className='chain-action'>
          <p>Add From Registry:</p>
          <button className='chain-action-add' onClick={() => openAddPrompt()}>
            Add
          </button>
        </div>
        <div className='chain-list'>{assetsListUI}</div>
      </div>
    </div>
  );
};

export default AssetList;
