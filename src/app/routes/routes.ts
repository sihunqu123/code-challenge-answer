// Layouts
import PublicLayout from "../layout/PublicLayout";

// Pages

import AssetList from "@src/pages/articles/AssetList";

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
