// NavigationService.ts

import { createNavigationContainerRef, NavigationContainerRef, ParamListBase } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<ParamListBase>();

type NavigationParams = {
  [key: string]: undefined | object;
};

export function navigate<RouteName extends keyof NavigationParams>(
  screen: RouteName,
  params?: NavigationParams[RouteName]
) {
  if (navigationRef.isReady()) {
    // @ts-ignore to bypass the strict type checking issue
    navigationRef.navigate(screen, params as any);
  }
}
  