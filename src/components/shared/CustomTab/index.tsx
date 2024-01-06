import { Link } from "react-router-dom";

export interface CustomTabProps {
  title: string;
  link: string;
  isActive: boolean;
  tabIcon?: string;
}

const CustomTab = ({ title, link, isActive, tabIcon } : CustomTabProps) => {

  return (
    <Link  to={link} className={`profile-tab ${isActive ? "bg-dark-3" : "bg-dark-2"}`}>
      {
        tabIcon &&
        <img src={tabIcon} alt={title} width={20} height={20} />
      }
      {title}
    </Link>
  )
}

export default CustomTab;
