import Tab, { CustomTabProps } from "../CustomTab"

interface CustomTabsProps {
  tabsDetails: Omit<CustomTabProps, 'isActive'>[];
  activeTab: string;
}

const CustomTabs = ({ tabsDetails, activeTab }: CustomTabsProps) => {

  return (
    <div className="flex">
      {
        tabsDetails.map(({title, tabIcon, link}) => (
          <Tab title={title} link={link} tabIcon={tabIcon} key={title} isActive={activeTab === (link && `/${link}`)} />
        ))
      }
    </div>
  )
}

export default CustomTabs;
