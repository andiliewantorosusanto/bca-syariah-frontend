import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    title: true,
    name: 'User Management'
  },
  {
    name: 'User',
    url: '/user/',
    icon: 'icon-drop'
  },
  {
    title: true,
    name: 'Text Files'
  },
  {
    name: 'Create Textfile',
    url: '/textfile/create',
    icon: 'icon-drop'
  },
  {
    name: 'Upload Textfile',
    url: '/textfile/upload',
    icon: 'icon-drop'
  },
];
