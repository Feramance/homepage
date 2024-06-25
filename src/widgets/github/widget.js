import { asJson } from "utils/proxy/api-helpers";
import genericProxyHandler from "utils/proxy/handlers/generic";

const widget = {
  api: "https://api.github.com/repos/{repo}{endpoint}",
  proxyHandler: genericProxyHandler,

  mappings: {
    issues: {
      endpoint: "/issues"
    },
    pulls: {
      endpoint: "/pulls"
    },
    stars: {
      endpoint: "",
      map: (data) => ({
        stars: asJson(data),
      }),
    },
  },
};

export default widget;
