import Home from "../../pages/index";
import { PageWrapper } from "./PageWrapper";

export default {
  title: "Pages/Home",
  component: Home,
};

export const HomePage = ({ component }) => <PageWrapper component={<Home />} />;
