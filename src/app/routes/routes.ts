// Layouts
import PublicLayout from "../layout/PublicLayout";

// Pages

import AssetList from "@src/pages/chain/AssetList";

export const routes = [
  {
    layout: PublicLayout,
    routes: [
      {
        name: "chain",
        title: "Chain Management",
        component: AssetList,
        path: "/",
        isPublic: true,
        hasSiderLink: false,
      },
    ],
  },
];
