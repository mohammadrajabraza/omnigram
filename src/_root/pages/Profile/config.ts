import { CustomTabProps } from "@/components/shared/CustomTab";

export const tabsDetails: Omit<CustomTabProps, 'isActive'>[] = [
    {
        link: '',
        title: 'Posts',
        tabIcon: '/assets/icons/gallery.svg',
    },
    {
        link: 'liked-posts',
        title: 'Liked',
        tabIcon: '/assets/icons/like.svg',
    },
];
