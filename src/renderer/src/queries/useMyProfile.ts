// queries/useMyProfile.ts
import { useQuery } from '@tanstack/react-query';

import { getMyProfile } from '@/api/profiles';

export function useMyProfile() {
  return useQuery({
    queryKey: ['my-profile'],
    queryFn: getMyProfile,
    staleTime: 5 * 60 * 1000,
    retry: false
  });
}
