import { appTitle } from "../../utils/helper";
import Filter from "./Filter";
import LineChart from "./LineCharts";
import PieChart from "./PieChart";
import Statistics from "./Statistics";

const Dashboards: React.FC = () => {
  document.title = `Dashboard${appTitle}`;

  return (
    <div>
      <Filter />
      <Statistics />
      <LineChart />
      <PieChart />
    </div>
  );
};
export default Dashboards;
