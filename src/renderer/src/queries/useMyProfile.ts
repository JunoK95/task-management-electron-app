// queries/useMyProfile.ts
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getMyProfile } from '@/api/profiles';
import { Profile } from '@/types';

export function useMyProfile(): UseQueryResult<Profile> {
  return useQuery({
    queryKey: ['my-profile'],
    queryFn: getMyProfile,
    staleTime: 5 * 60 * 1000,
    retry: false
  });
}
